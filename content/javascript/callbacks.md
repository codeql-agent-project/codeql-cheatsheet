{
"id": "callbacks",
"name": "Callbacks",
"date": "2022-10-20T22:19:49+07:00",
"language": "javascript",
"description": "Finds functions that are passed as arguments to other functions",
"author": "LGTM",
"tags": ["basic", "javascript", "pattern"],
"categories": [],
"code": "import javascript\nfrom InvokeExpr invk, DataFlow::FunctionNode f\nwhere f.flowsToExpr(invk.getAnArgument())\nselect invk, f",
"complexity": "basic"
}

