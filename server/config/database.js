const config = require("./config.js");
module.exports = {
    database: `mongodb://${config.PREFIXES_DB_HOST}/${config.PREFIXES_DB_NAME}`
};
