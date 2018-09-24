const speakeasy = require('speakeasy');

const createSecret = async () => {
  try {
    // Generate a secret key.
    const secret = await speakeasy.generateSecret({length: 30});
    // Access using secret.ascii, secret.hex, or secret.base32.
    console.log(secret.base32);
    return secret.base32;
  } catch (err) {
    console.log(err)
    return null;
  }
}

const createToken = async secret => {
  try {
    // Generate a time-based token based on the base-32 key.
    const token = await speakeasy.totp({
      secret: secret,
      encoding: 'base32'
    });
    // Returns token for the secret at the current time
    // Compare this to user input
    console.log(token);
    return token;
  } catch (err) {
    console.log(err)
    return null;
  }
}

const proveToken = async (secret, token) => {
  try {
    // Verify a given token
    // A TOTP is incremented every step time-step seconds. By default, the time-step is 30 seconds. You may change the time-step using the step option, with units in seconds.
    const tokenValidates = await speakeasy.totp.verify({
      secret: secret,
      encoding: 'base32',
      token: token,
      window: 6
    });
    // Returns true if the token matches
    console.log(`${secret} ${token} ${tokenValidates}`);
    return tokenValidates;
  } catch (err) {
    console.log(err)
    return null;
  }
}

module.exports.generateSecret = async () => {
  try {
    const secret = await createSecret();
    return secret;
  } catch (error) {
    console.log(err)
    return null;
  }
}

module.exports.generateToken = async secret => {
  try {
    const token = await createToken(secret);
    return token;
  } catch (error) {
    console.log(err)
    return null;
  }
}

module.exports.verifyToken = async (secret, token) => {
  try {
    const verified = await proveToken(secret, token);
    return verified;
  } catch (error) {
    console.log(err)
    return null;
  }
}
