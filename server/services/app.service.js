const util = require('util');
const App = require('../models/app.model');
const AppAuthTokenService = require('../services/appauthtoken.service');

const postApp = async (req, res, next) => {
  const _app = req.body;
  try {
  // find if record ip exist
  let find_app = null;
  const cursor = await App.find({appname: _app.appname}, { _id: 1 }).limit(1).cursor();
  find_app = await cursor.next();
  if ( find_app != null ) {
    // record exists
    return await res.json( { message: 'record exists', record: find_app } );
  } else {
    // create the profile record
    const app = await App.create(_app);
    return await res.json( app );
  }
  }
  // don't forget to include error handling and
  // if error, send an error response as well
  catch (error) {
    console.log("Error: " + error);
    return await res.send( "Error: " + error );
  }
}

const putApp = async (req, res, next) => {
  const _app = req.body;
  try {
  // simply update the record
  const updated_app = await App.findByIdAndUpdate({_id: req.params.id}, _app, { new: true });
  const app = await App.findById({_id: updated_app._id});
  return await res.json( app );
  }
  // don't forget to include error handling and
  // if error, send an error response as well
  catch (error) {
    console.log("Error: " + error);
    return await res.send( "Error: " + error );
  }
}

const getApp = async (req, res, next) => {
  try {

    const app = await
    App
    .findById({_id: req.params.id});
    return await res.json( app );

  } catch (error) {
    console.log("Error: " + error);
    return await res.send( "Error: " + error );
  }
}

const findApp = async (req, res, next) => {
  try {
    const cursor = await
    App
    .find( { $text: { $search : req.params.text } },
      { score : { $meta: "textScore" } } )
    .sort( {
      score: { $meta : 'textScore' }
    } )
    .limit(1)
    .cursor();
    let app = null;
    app = await cursor.next();
    return await res.json( app );
  } catch (error) {
    console.log("Error: " + error);
    return await res.send( "Error: " + error );
  }
}

const deleteAppById = async (req, res, next) => {
  try {
      const deleted = await App.findByIdAndRemove({_id: req.params.id});
      return await res.json( { success: true } );
  } catch (error) {
    console.log("Error: " + error);
    return await res.send( "Error: " + error );
  }
}

const deleteAppByAppName = async (req, res, next) => {
  try {
    //
    const _app_name = req.params.appname;
    let app = null;
    const cursor = await App.find({appname: _app_name}, { _id: 0 }).limit(1).cursor();
    app = await cursor.next();
    if ( app != null ) {
      const deleted = await App.findByIdAndRemove({_id: app._id});
      return await res.json( { success: true } );
    } else {
      return await res.send("App not found!");
    }

  } catch (error) {
    console.log("Error: " + error);
    return await res.send( "Error: " + error );
  }
}

const findAppByAppName = async (req, res, next) => {
  try {
    //
    let app = null;
    const cursor = await App.find({appname: req.params.appname}, { _id: 0 }).limit(1).cursor();
    app = await cursor.next();
    if (app != null) {
      return await res.json( app );
    } else {
      return await res.send(null);
    }

  } catch (error) {
    console.log("Error: " + error);
    return await res.send( "Error: " + error );
  }
}

// SMS Sending
const generateAppAuthToken = async (req, res, next) => {
    AppAuthTokenService.generateAppAuthToken(req, res, next);
}

const isAppAuthTokenValid = async ( appauthtoken ) => {
  try {
    const id = await AppAuthTokenService.decodeAppAuthToken( appauthtoken );
    const app = await
    App
    .findById({_id: id});
    if ( app != null ) {
      return await true;
    } else {
      return await false;
    }
    return await app;
  } catch (error) {
    console.log("Error: " + error);
    return await res.send( "Error: " + error );
  }
}

module.exports = {
  postApp,
  putApp,
  findApp,
  getApp,
  deleteAppById,
  deleteAppByAppName,
  findAppByAppName,
  generateAppAuthToken,
  isAppAuthTokenValid
};
