const fs = require('fs');
const path = require('path');
const yaml = require('yaml');
console.log(
    yaml.parse(
        fs.readFileSync(
            path.resolve(__dirname, '../_yaml/vertices/network/Internet.yaml'),
            'utf8'
        )
    )
);