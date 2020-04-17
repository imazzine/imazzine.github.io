const uuid = require('uuid');
console.log(uuid.v5(uuid.v1(), uuid.v1()));