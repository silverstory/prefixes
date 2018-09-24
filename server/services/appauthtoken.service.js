const util = require('util');
const encrypt = require('../services/encrypt');

// expose to an API
const generateAppAuthToken = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const appauthtoken  = await encrypt.generateAppAuthToken( _id );
    return await res.json( { appAuthToken: appauthtoken } );
  }
  // don't forget to include error handling and
  // if error, send an error response as well
  catch (error) {
    console.log("Error: " + error);
    return await res.send( "Error: " + error );
  }
}

// not exposed to API. Internal use only of SMS Send API before sending
// which will verify existence of an id inside app collection in mongodb
const decodeAppAuthToken = async ( _authtoken ) => {
  try {
    const id  = await encrypt.decodeAppAuthToken( _authtoken );
    return await id;
  } catch (error) {
    console.log("Error: " + error);
    return await res.send( "Error: " + error );
  }
}

module.exports = {
  generateAppAuthToken,
  decodeAppAuthToken
};
