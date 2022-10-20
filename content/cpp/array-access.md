{
"id": "array-access",
"name": "Array Access",
"date": "2022-10-20T12:03:45+07:00",
"language": "cpp",
"description": "Finds array access expressions with an index expression consisting of a postfix increment (`++`) expression.",
"author": "LGTM",
"tags": [],
"categories": [],
"code": "import cpp\n\nfrom ArrayExpr a\nwhere a.getArrayOffset() instanceof PostfixIncrExpr\nselect a",
"complexity": "basic"
}