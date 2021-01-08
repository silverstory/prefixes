const config = require("../config/config");
const prefixService = require('./prefix.service');
const fetch = require('node-fetch');

const createSMS = async (number, sms) => {
  try {
    let mobile_no = number;
    let message = sms;

    // check prefix if globe or smart
    mobile_no = mobile_no.replace("+63", "0");
    const prefix = await prefixService.getNetwork(mobile_no);
    const network = await prefix.network;

    const response = await fetch('http://192.168.23.123/api/sms/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        mobile_no: mobile_no,
        message: message,
        network: "smart"
      })
    });

    const json = await response.json();
    await res.json(json);

  } catch (err) {
    console.log(err)
    await res.json(null);
  }
}

module.exports.sendSMS = async (number, sms) => {
  try {
    const response = await createSMS(number, sms);
    return response;
  } catch (error) {
    console.log(err)
    return null;
  }
}



// old using twilio

// // Twilio Credentials
// // You must implement this in a secret
// const accountSid = config.TWILIO_ACCOUNT_SID;
// const authToken = config.TWILIO_AUTH_TOKEN;

// // require the Twilio module and create a REST client
// const client = require('twilio')(accountSid, authToken);

// const createSMS = async (number, sms) => {
//   try {
//     const message = await client.messages
//     .create({
//       to: number,
//       from: config.TWILIO_FROM_NUMBER,
//       body: sms,
//     });
//     // console.log(message.sid);
//     return message.sid;

//   } catch (err) {
//     console.log(err)
//     return null;
//   }
// }

// module.exports.sendSMS = async (number, sms) => {
//   try {
//     const messageid = await createSMS(number, sms);
//     return messageid;
//   } catch (error) {
//     console.log(err)
//     return null;
//   }
// }
