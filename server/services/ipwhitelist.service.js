const util = require('util');
const Ipwhitelist = require('../models/ipwhitelist.model');

const postIpwhitelist = async (req, res, next) => {
  const _ipwhitelist = req.body;
  try {
  // find if record ip exist
  let find_ipwhitelist = null;
  const cursor = await Ipwhitelist.find({ip: _ipwhitelist.ip}, { _id: 1 }).limit(1).cursor();
  find_ipwhitelist = await cursor.next();
  if ( find_ipwhitelist != null ) {
    // record exists
    return await res.json( { message: 'record exists', record: find_ipwhitelist } );
  } else {
    // create the profile record
    const ipwhitelist = await Ipwhitelist.create(_ipwhitelist);
    return await res.json( ipwhitelist );
  }
  }
  // don't forget to include error handling and
  // if error, send an error response as well
  catch (error) {
    console.log("Error: " + error);
    return await res.send( "Error: " + error );
  }
}

const putIpwhitelist = async (req, res, next) => {
  const _ipwhitelist = req.body;
  try {
  // simply update the record
  const updated_ipwhitelist = await Ipwhitelist.findByIdAndUpdate({_id: req.params.id}, _ipwhitelist, { new: true });
  const ipwhitelist = await Ipwhitelist.findById({_id: updated_ipwhitelist._id});
  return await res.json( ipwhitelist );
  }
  // don't forget to include error handling and
  // if error, send an error response as well
  catch (error) {
    console.log("Error: " + error);
    return await res.send( "Error: " + error );
  }
}

const getIpwhitelist = async (req, res, next) => {
  try {

    const ipwhitelist = await
    Ipwhitelist
    .findById({_id: req.params.id});
    return await res.json( ipwhitelist );

  } catch (error) {
    console.log("Error: " + error);
    return await res.send( "Error: " + error );
  }
}

const findIpwhitelist = async (req, res, next) => {
  try {
    const cursor = await
    Ipwhitelist
    .find( { $text: { $search : req.params.text } },
      { score : { $meta: "textScore" } } )
    .sort( {
      score: { $meta : 'textScore' }
    } )
    .limit(1)
    .cursor();
    let ipwhitelist = null;
    ipwhitelist = await cursor.next();
    return await res.json( ipwhitelist );
  } catch (error) {
    console.log("Error: " + error);
    return await res.send( "Error: " + error );
  }
}

const deleteIpwhitelistById = async (req, res, next) => {
  try {
      const deleted = await Ipwhitelist.findByIdAndRemove({_id: req.params.id});
      return await res.json( { success: true } );
  } catch (error) {
    console.log("Error: " + error);
    return await res.send( "Error: " + error );
  }
}

const deleteIpwhitelistByIp = async (req, res, next) => {
  try {
    //
    const _ipwhitelist_ip = req.params.ip;
    let ipwhitelist = null;
    const cursor = await Ipwhitelist.find({ip: _ipwhitelist_ip}, { _id: 0 }).limit(1).cursor();
    ipwhitelist = await cursor.next();
    if ( ipwhitelist != null ) {
      const deleted = await Ipwhitelist.findByIdAndRemove({_id: ipwhitelist._id});
      return await res.json( { success: true } );
    } else {
      return await res.send("IP not found!");
    }

  } catch (error) {
    console.log("Error: " + error);
    return await res.send( "Error: " + error );
  }
}

const findIpwhitelistByIp = async (req, res, next) => {
  try {
    //
    let ipwhitelist = null;
    const cursor = await Ipwhitelist.find({ip: req.params.ip}, { _id: 0 }).limit(1).cursor();
    ipwhitelist = await cursor.next();
    if (ipwhitelist != null) {
      return await res.json( ipwhitelist );
    } else {
      return await res.send(null);
    }

  } catch (error) {
    console.log("Error: " + error);
    return await res.send( "Error: " + error );
  }
}

module.exports = {
  postIpwhitelist,
  putIpwhitelist,
  findIpwhitelist,
  getIpwhitelist,
  deleteIpwhitelistById,
  deleteIpwhitelistByIp,
  findIpwhitelistByIp
};
