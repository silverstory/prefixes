const util = require('util');
const Prefix = require('../models/prefix.model');

const postPrefix = async (req, res, next) => {
  const _prefix = req.body;
  try {
  // find if record ip exist
  let find_prefix = null;
  const cursor = await Prefix.find({prefix: _prefix.prefix}, { _id: 1 }).limit(1).cursor();
  find_prefix = await cursor.next();
  if ( find_prefix != null ) {
    // record exists
    return await res.json( { message: 'record exists', record: find_prefix } );
  } else {
    // create the profile record
    const prefix = await Prefix.create(_prefix);
    return await res.json( prefix );
  }
  }
  // don't forget to include error handling and
  // if error, send an error response as well
  catch (error) {
    console.log("Error: " + error);
    return await res.send( "Error: " + error );
  }
}

const putPrefix = async (req, res, next) => {
  const _prefix = req.body;
  try {
  // simply update the record
  const updated_prefix = await Prefix.findByIdAndUpdate({_id: req.params.id}, _prefix, { new: true });
  const prefix = await Prefix.findById({_id: updated_prefix._id});
  return await res.json( prefix );
  }
  // don't forget to include error handling and
  // if error, send an error response as well
  catch (error) {
    console.log("Error: " + error);
    return await res.send( "Error: " + error );
  }
}

const getPrefix = async (req, res, next) => {
  try {

    const prefix = await
    Prefix
    .findById({_id: req.params.id});
    return await res.json( prefix );

  } catch (error) {
    console.log("Error: " + error);
    return await res.send( "Error: " + error );
  }
}

const findPrefix = async (req, res, next) => {
  try {
    const cursor = await
    Prefix
    .find( { $text: { $search : req.params.text } },
      { score : { $meta: "textScore" } } )
    .sort( {
      score: { $meta : 'textScore' }
    } )
    .limit(1)
    .cursor();
    let prefix = null;
    prefix = await cursor.next();
    return await res.json( prefix );
  } catch (error) {
    console.log("Error: " + error);
    return await res.send( "Error: " + error );
  }
}

const deletePrefixById = async (req, res, next) => {
  try {
      const deleted = await Prefix.findByIdAndRemove({_id: req.params.id});
      return await res.json( { success: true } );
  } catch (error) {
    console.log("Error: " + error);
    return await res.send( "Error: " + error );
  }
}

const deletePrefixByPrefix = async (req, res, next) => {
  try {
    //
    const _prefix_ip = req.params.prefix;
    let prefix = null;
    const cursor = await Prefix.find({prefix: _prefix_ip}, { _id: 0 }).limit(1).cursor();
    prefix = await cursor.next();
    if ( prefix != null ) {
      const deleted = await Prefix.findByIdAndRemove({_id: prefix._id});
      return await res.json( { success: true } );
    } else {
      return await res.send("Prefix not found!");
    }

  } catch (error) {
    console.log("Error: " + error);
    return await res.send( "Error: " + error );
  }
}

const findPrefixByPrefix = async (req, res, next) => {
  try {
    //
    let prefix = null;
    const cursor = await Prefix.find({prefix: req.params.prefix}, { _id: 0 }).limit(1).cursor();
    prefix = await cursor.next();
    if (prefix != null) {
      return await res.json( prefix );
    } else {
      return await res.send(null);
    }

  } catch (error) {
    console.log("Error: " + error);
    return await res.send( "Error: " + error );
  }
}

const getNetwork = async (number) => {
  try {
    // extract prefix from number calculate like 0956 not +63 even if source has +63
    const _prefix = number.slice(0, 4);
    // find in db
    prefix = null;
    const cursor = await Prefix.find({prefix: _prefix}, { _id: 0 }).limit(1).cursor();
    prefix = await cursor.next();
    if (prefix != null) {
      return prefix;
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error: " + error);
    return await null;
  }
}

module.exports = {
  postPrefix,
  putPrefix,
  findPrefix,
  getPrefix,
  deletePrefixById,
  deletePrefixByPrefix,
  findPrefixByPrefix,
  getNetwork
};
