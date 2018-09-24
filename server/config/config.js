const secrets = require("./secrets.js");
module.exports = {
    PREFIXES_DB_HOST: secrets.get("DB_HOST") || process.env.PREFIXES_DB_HOST,
    PREFIXES_DB_NAME: secrets.get("DB_NAME") || process.env.PREFIXES_DB_NAME,
    PREFIXES_DB_USER_NAME: secrets.get("DB_USER_NAME") || process.env.PREFIXES_DB_USER_NAME,
    PREFIXES_DB_PASSWORD: secrets.get("DB_PASSWORD") || process.env.PREFIXES_DB_PASSWORD,
    JWT_SECRET: secrets.get("JWT_SECRET") || process.env.JWT_SECRET,
    DB_MODE: secrets.get("DB_MODE") || process.env.DB_MODE,
    TWILIO_ACCOUNT_SID: secrets.get("TWILIO_ACCOUNT_SID") || process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: secrets.get("TWILIO_AUTH_TOKEN") || process.env.TWILIO_AUTH_TOKEN,
    TWILIO_FROM_NUMBER: secrets.get("TWILIO_FROM_NUMBER") || process.env.TWILIO_FROM_NUMBER
};
