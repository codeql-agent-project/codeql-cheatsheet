{
"id": "jump-to-definition-links",
"name": "Jump to Definition Links",
"date": "2022-10-21T01:32:22+07:00",
"language": "java",
"description": "Generates use-definition pairs that provide the data for jump-to-definition in the code viewer.",
"author": "LGTM",
"tags": ["java", "pattern", "basic"],
"categories": [],
"code": "import definitions\nexternal string selectedSourceFile();\nfrom Element e, Element def, string kind\nwhere def = definitionOf(e, kind) and e.getFile() = getFileBySourceArchiveName(selectedSourceFile())\nselect e, def, kind",
"complexity": "basic"
}
