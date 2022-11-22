# CodeQL Cheat Sheet

## Github Pages:
- [https://codeql-agent-project.github.io/codeql-cheatsheet/](https://codeql-agent-project.github.io/codeql-cheatsheet/)

## Contribute Queries Guide
- Fork project repository  
- Checkout `add-queries` branch
- Change into /queries directory
```
    cd ./queries
```
- Create a JSON file for every CodeQL queries in each language folder (Ex: /queries/cpp/hello-world.json)  
Please follow the [Query description](./queries/README.md) to create and send a PR to submit your cheats.  
`Note: Please only add, modify, delete files in /queries directory`  
For example:

```
    touch ./cpp/hello-world.json
```
- Open your favorite editor and add:
```json
{ 
    "id": "hello-world", 
    "name": "Hello World", 
    "date": "2022-10-21T01:12:34+07:00", 
    "language": "cpp", 
    "description": "Hello Everyone", 
    "author": "hdthinh1012", 
    "authorURL": "https://github.com/hdthinh1012",
    "tags": ["cpp", "basic", "pattern"], 
    "categories": [], 
    "code": "import cpp\nselect \"Hello world!\"", 
    "complexity": "basic" 
}
```
- Stage and commit new file, please just add 1 file only in each commit and each pull request just contains 1 commit.  
`Note: Commit message must comply with below format for easy read`
    - Adding a query: `Add: <language-folder>/file-name.json`
    - Delete a query: `Delete: <language-folder>/file-name.json`
    - Modify a query: `Modified: <language-folder>/file-name.json`

- Push the commit to your username remote codeql-cheatsheet repository, then create a pull request from \<your-username\>/codeql-cheatsheet's `add-queries` to codeql-agent-project/codeql-cheatsheet's `main`.

## Request Cheat
If you want to request a new cheat, please [create an Request Query issue](https://github.com/codeql-agent-project/codeql-cheatsheet/issues).

## Development Run
Start server in watch mode
```
hugo server -D -w
```
### Add new query into a language
- Create .json in one of /queries/\<language\> folder, for example /cpp/hello-world.json
- Open ./scripts/generate-content.js and change ${PROJECT_DIRECTORY_PATH} to your local directory path
```javascript
const PROJECT_DIRECTORY_PATH = path.resolve("./");
// const PROJECT_DIRECTORY_PATH = process.env.GITHUB_WORKSPACE;
```
- Run build script to generate /content's Markdown from /queries's JSON

```zsh
npm install
node ./scripts/generate-content.js
```

## Complement Links
### Code to string format
[Regex replacment](https://coding.tools/regex-replace)  
[Remove newline](https://www.gillmeister-software.com/online-tools/text/remove-line-breaks.aspx)

[Some update](#)

