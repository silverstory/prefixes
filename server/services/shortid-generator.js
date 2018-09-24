const shortid = require('shortid');
const Profile = require('../models/profile.model');

module.exports.CreateShortId = async () => {
  try {
    let ShortId = '';
    let newShortId;
    let existing = true;
    let tries = 0;

    shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

    //test if generated id is existing
    //will end if no entry found or if 10 tries is consumed and still random short id exists
    while(existing && tries <= 10) {

      //generate a random short id
      newShortId = await shortid.generate();
      tries++;

      const profile = await Profile.findOne({
        prefixestoken: newShortId
      });

      if( profile == null ) {
        existing = false;
      }
    }

    //fail if 10 tries consumed
    if(tries == 10) {
      reject('Short Id generation failed')
    }
    else { //succeed otherwise and return new random short id
      ShortId = newShortId;
    }

    return ShortId;

  } catch (error) {
    console.log(error);
  }
}
