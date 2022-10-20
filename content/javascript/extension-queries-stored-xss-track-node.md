{
"id": "extension-queries-stored-xss-track-node",
"name": "Extension Queries Stored Xss Track Node",
"date": "2022-10-20T12:32:02+07:00",
"language": "javascript",
"description": "Extends the standard Stored XSS query with an additional source, using TrackedNode to track MySQL connections globally.",
"author": "LGTM",
"tags": ["javascript", "taint-tracking", "expert"],
"categories": [],
"code": "import javascript\nimport semmle.javascript.security.dataflow.StoredXssQuery\nimport DataFlow::PathGraph\n/**\n * Gets an instance of `mysql.createConnection()`, tracked globally.\n */\nDataFlow::SourceNode mysqlConnection(DataFlow::TypeTracker t) {\n  t.start() and\n  result = DataFlow::moduleImport(\"mysql\").getAMemberCall(\"createConnection\")\n  or\n  exists(DataFlow::TypeTracker t2 | result = mysqlConnection(t2).track(t2, t))\n}\n/**\n * Gets an instance of `mysql.createConnection()`, tracked globally.\n */\nDataFlow::SourceNode mysqlConnection() { result = mysqlConnection(DataFlow::TypeTracker::end()) }\n/**\n * The data returned from a MySQL query.\n *\n * For example:\n * ```\n * let mysql = require('mysql');\n *\n * getData(mysql.createConnection());\n *\n * function getData(c) {\n *   c.query(..., (e, data) => { ... });\n * }\n * ```\n */\nclass MysqlSource extends Source {\n  MysqlSource() { this = mysqlConnection().getAMethodCall(\"query\").getCallback(1).getParameter(1) }\n}\nfrom Configuration cfg, DataFlow::PathNode source, DataFlow::PathNode sink\nwhere cfg.hasFlowPath(source, sink)\nselect sink.getNode(), source, sink, \"Stored XSS from $@.\", source.getNode(), \"database value.\"",
"complexity": "expert"
}