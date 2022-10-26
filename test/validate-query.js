const fs = require('fs');
const assert = require('assert');
const Ajv = require("ajv");
const ajv = new Ajv();
const path = require("path");

const PROJECT_DIRECTORY_PATH = path.resolve("../");
const config = {
    queriesDirectory: `${PROJECT_DIRECTORY_PATH}/queries`,
}

const querySchema = {
    type: "object",
    properties: {
        id: { type: "string", pattern: '^[a-zA-Z0-9\-]+$' },
        name: { type: "string" },
        date: {type: "string"},
        language: {
            enum: ["cpp", "csharp", "java", "javascript", "go", "python", "ruby"]
        },
        author: {type: "string"},
        authorURL: {type: "string"},
        tags: {
            type: "array",
            items: {
                type: "integer"
            }
        },
        description: { type: "string" },
        author: { type: "string", pattern: '[a-zA-Z0-9\-]+' },
        code: { type: "string" },
        complexity: {
            enum: ["basic", "advanced", "expert"]
        }
        
    },
    required: ["id", "name", "description", "author", "code", "complexity", "language"],
};

const validate = ajv.compile(querySchema);

const queriesDirectories = fs.readdirSync(config.queriesDirectory, { withFileTypes: true })
                            .filter(dirent => dirent.isDirectory())
                            .map(dirent => dirent.name)

describe('Queries JSON Properties Checking', () => {
    queriesDirectories.forEach(folder => {
        describe(folder, () => {
            fs.readdirSync(`./queries/${folder}`).forEach(file => {
                it(file.split('.json')[0], () => {
                    if (!file.endsWith('.json')) return;
                    const query = require(`${config.queriesDirectory}/${folder}/${file}`);
                    const valid = validate(query);
                    if (!valid) {
                        console.log(ajv.errors);
                        assert(false);
                    }
                });
            });
        });
    });
});





