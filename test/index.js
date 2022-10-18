const fs = require('fs');
const assert = require('assert');
const Ajv = require("ajv");
const ajv = new Ajv();

const querySchema = {
    type: "object",
    properties: {
        id: { type: "string", pattern: '^[a-zA-Z0-9\-]+$' },
        name: { type: "string" },
        description: { type: "string" },
        author: { type: "string", pattern: '[a-zA-Z0-9\-]+' },
        code: { type: "string" },
    },
    required: ["id", "name", "description", "author", "code"],
};

const validate = ajv.compile(querySchema);

const queriesDirectories = fs.readdirSync('./queries', { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

describe('Queries', () => {
    queriesDirectories.forEach(folder => {
        describe(folder, () => {
            fs.readdirSync(`./queries/${folder}`).forEach(file => {
                it(file.split('.json')[0], () => {
                    if (!file.endsWith('.json')) {return};
                    const query = require(`../queries/${folder}/${file}`);
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





