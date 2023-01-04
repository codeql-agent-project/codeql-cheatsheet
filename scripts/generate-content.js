const fs = require("node:fs");
const path = require("path");

const PROJECT_DIRECTORY_PATH = path.resolve("..");
// const PROJECT_DIRECTORY_PATH = process.env.GITHUB_WORKSPACE;

// ubuntu github deploy machine
// const config = {
//     queriesDirectory: `${PROJECT_DIRECTORY_PATH}/queries`,
//     contentDirectory: `${PROJECT_DIRECTORY_PATH}/content`,
// }
// windows dev
const config = {
    queriesDirectory: `${PROJECT_DIRECTORY_PATH}\\queries`,
    contentDirectory: `${PROJECT_DIRECTORY_PATH}\\content`,
}


/**
 * 
 * @param {*} queriesDirPath 
 * @param {*} relPath
 * @returns 
 */

const fileTraverse = (queriesDirPath, relPath) => {
    const queriesJSON = [];
    try {
        const dirents = fs.readdirSync(`${queriesDirPath}${relPath}`, { withFileTypes: true });

        dirents.forEach(dirent => {
            if (dirent.isDirectory()) {
                const subDirFiles = fileTraverse(`${queriesDirPath}`, `${relPath}${dirent.name}/`);
                queriesJSON.push(...subDirFiles);
            } else if (dirent.name.split(".").pop() === "json") {
                queriesJSON.push({
                    relPath: `${relPath}${dirent.name}`,
                    absPath: path.resolve(`${queriesDirPath}${relPath}${dirent.name}`)
                })
            }
        })
        return queriesJSON;
    }
    catch (err) {
        console.error(err);
        return [];
    }
};


// ubuntu github deploy machine
// const queriesJsonList = fileTraverse(config.queriesDirectory, "/");

// window dev machine
const queriesJsonList = fileTraverse(config.queriesDirectory, "\\");

// console.log(queriesJsonList);

queriesJsonList.forEach((jsonFile) => {
    console.log(`${jsonFile.absPath}----------------------------------------`);
    const content = fs.readFileSync(jsonFile.absPath, { encoding: 'utf-8' });
    // console.log(content);
    console.log(jsonFile.relPath);
    jsonFile.relPath = jsonFile.relPath.replace(".json", '.md');
    console.log(jsonFile.relPath);
    fs.writeFileSync(`${config.contentDirectory}${jsonFile.relPath}`, content);
})