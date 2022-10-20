{
"id": "property-disclosure-through-postmessage",
"name": "Property Diclosure Through postMessage()",
"date": "2022-10-20T22:25:32+07:00",
"language": "javascript",
"description": "Tracks values from an 'authKey' property into a postMessage call with unrestricted origin, indicating a leak of sensitive information.",
"author": "LGTM",
"tags": ["expert", "taint-tracking", "javascript"],
"categories": [],
"code": "import javascript\nimport DataFlow\nimport DataFlow::PathGraph\n/**\n * A dataflow configuration that tracks authentication tokens (\"authKey\")\n * to a postMessage call with unrestricted target origin.\n *\n * For example:\n * ```\n * win.postMessage(JSON.stringify({\n *  action: 'pause',\n *  auth: {\n *    key: window.state.authKey\n *  }\n * }), '*');\n * ```\n */\nclass AuthKeyTracking extends DataFlow::Configuration {\n  AuthKeyTracking() { this = \"AuthKeyTracking\" }\n  override predicate isSource(Node node) { node.(PropRead).getPropertyName() = \"authKey\" }\n  override predicate isSink(Node node) {\n    exists(MethodCallNode call |\n      call.getMethodName() = \"postMessage\" and\n      call.getArgument(1).getStringValue() = \"*\" and // no restriction on target origin\n      call.getArgument(0) = node\n    )\n  }\n  override predicate isAdditionalFlowStep(Node pred, Node succ) {\n    // Step into objects: x -> { f: x }\n    succ.(SourceNode).getAPropertyWrite().getRhs() = pred\n    or\n    // Step through JSON serialization: x -> JSON.stringify(x)\n    // Note: TaintTracking::Configuration includes this step by default, but not DataFlow::Configuration\n    exists(CallNode call |\n      call = globalVarRef(\"JSON\").getAMethodCall(\"stringify\") and\n      pred = call.getArgument(0) and\n      succ = call\n    )\n  }\n}\nfrom AuthKeyTracking cfg, PathNode source, PathNode sink\nwhere cfg.hasFlowPath(source, sink)\nselect sink.getNode(), source, sink, \"Message leaks the authKey from $@.\", source.getNode(), \"here\"",
"complexity": "expert"
}
