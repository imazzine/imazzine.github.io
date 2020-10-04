const fs = require('fs');
const yaml = require('yaml');
const name = '/Users/artem.lit/imazzine/imazzine.github.io/_graph/types/ts/core/0.0.0/dependencies.yml';
const file = yaml.parse(fs.readFileSync(name, 'utf8'));
console.log(file);