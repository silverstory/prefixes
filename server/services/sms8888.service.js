const appService = require('./app.service');
// const Prefix = require('../models/prefix.model');
const prefixService = require('./prefix.service');
const fetch = require('node-fetch');

const createSMS = async (req, res, next) => {
  try {
    let token = await req.query.token;
    let number = await req.query.number;
    let message = await req.query.message;
    // check if app's auth token is valid
    // isAppAuthTokenValid
    const isTokenValid = await appService.isAppAuthTokenValid(token);
    if (isTokenValid == true) {
      // check prefix if globe or smart
      number = number.replace("+63", "0");
      const prefix = await prefixService.getNetwork(number);
      const network = await prefix.network;
      // create url
      // const url = `http://192.168.23.123/email_api/public/api/sms/send?recipients=${number}&message=${message}&network=${network}`;
      // call 8888 sms api to send sms
      // const response = await fetch(url);

      const response = await fetch('http://192.168.23.123/api/otp/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mobile_no: number,
          message: message,
          token: "00XXXXX",
          network: "smart"
        })
      });

      const json = await response.json();
      await res.json(json);
      // return json;
    }
  } catch (err) {
    console.log(err)
    await res.json(null);
  }
}

module.exports.sendSMS = async (req, res, next) => {
  try {
    const response = await createSMS(req, res, next);
    return response;
  } catch (error) {
    console.log(err)
    return null;
  }
}
