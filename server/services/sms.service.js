const config = require("../config/config");
// Twilio Credentials
// You must implement this in a secret
const accountSid = config.TWILIO_ACCOUNT_SID;
const authToken = config.TWILIO_AUTH_TOKEN;

// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);

const createSMS = async (number, sms) => {
  try {
    const message = await client.messages
    .create({
      to: number,
      from: config.TWILIO_FROM_NUMBER,
      body: sms,
    });
    // console.log(message.sid);
    return message.sid;

  } catch (err) {
    console.log(err)
    return null;
  }
}

module.exports.sendSMS = async (number, sms) => {
  try {
    const messageid = await createSMS(number, sms);
    return messageid;
  } catch (error) {
    console.log(err)
    return null;
  }
}
