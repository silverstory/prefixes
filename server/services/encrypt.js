const config = require('../config/config');

// Specify a string key: I might need to use a different secret key
const mykey = config.JWT_SECRET;

// Initialize encryption engine
const encryptor = require('simple-encryptor')({
    key: mykey,
    hmac: true,
    debug: true
});

const encHMAC = async text => {
    try {
        const hmac = await encryptor.hmac(text);
        return hmac;
    } catch (error) {
        console.log(error);
        // return null;
        return error;
    }
}

module.exports.generateHMAC = async text => await encHMAC(text)

// encrypt
const textEnc = async text => {
  try {
    const enctext = await encryptor.encrypt(text);
    return enctext;
  } catch (err) {
    console.log(err)
    // return null;
    return error;
  }
}

module.exports.generateAppAuthToken = async text => await textEnc(text)

// decrypt
const textDec = async text => {
    try {
      const dectext = await encryptor.decrypt(text);
      return dectext;
    } catch (err) {
      console.log(err)
      // return null;
      return error;
    }
}

module.exports.decodeAppAuthToken = async text => await textDec(text)
