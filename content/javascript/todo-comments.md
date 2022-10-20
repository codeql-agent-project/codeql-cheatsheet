{
"id": "todo-comments",
"name": "Todo Comments",
"date": "2022-10-20T11:16:04+07:00",
"language": "javascript",
"description": "Finds comments containing the word TODO",
"author": "LGTM",
"tags": ["pattern", "javascript", "advanced"],
"categories": [],
"code": "import javascript\nfrom Comment c\nwhere c.getText().regexpMatch(\"(?si).*\\bTODO\\b.*\")\nselect c, \"TODO comments indicate that the code may not be complete.\"",
"complexity": "advanced"
}