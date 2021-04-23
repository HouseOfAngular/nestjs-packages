const toTypeScript = require('json-schema-to-typescript');
const fs = require('fs');

toTypeScript
    .compileFromFile('src/domain/schema.json')
    .then(ts => fs.writeFileSync('src/domain/schema.ts', ts));
