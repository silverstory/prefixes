const util = require('util');
const SMSDeliveryLog = require('../models/smsdeliverylog.model');

const postSMSDeliveryLog = async (req, res, next) => {
  const _smsdeliverylog = req.body;
  try {
    // create the profile record
    const smsdeliverylog = await SMSDeliveryLog.create(_smsdeliverylog);
    return await res.json( smsdeliverylog );
  }
  // don't forget to include error handling and
  // if error, send an error response as well
  catch (error) {
    console.log("Error: " + error);
    return await res.send( "Error: " + error );
  }
}

const putSMSDeliveryLog = async (req, res, next) => {
  const _smsdeliverylog = req.body;
  try {
  // simply update the record
  const updated_smsdeliverylog = await SMSDeliveryLog.findByIdAndUpdate({_id: req.params.id}, _smsdeliverylog, { new: true });
  const smsdeliverylog = await SMSDeliveryLog.findById({_id: updated_smsdeliverylog._id});
  return await res.json( smsdeliverylog );
  }
  // don't forget to include error handling and
  // if error, send an error response as well
  catch (error) {
    console.log("Error: " + error);
    return await res.send( "Error: " + error );
  }
}

const getSMSDeliveryLog = async (req, res, next) => {
  try {

    const smsdeliverylog = await
    SMSDeliveryLog
    .findById({_id: req.params.id});
    return await res.json( smsdeliverylog );

  } catch (error) {
    console.log("Error: " + error);
    return await res.send( "Error: " + error );
  }
}

const findSMSDeliveryLog = async (req, res, next) => {
  try {
    const cursor = await
    SMSDeliveryLog
    .find( { $text: { $search : req.params.text } },
      { score : { $meta: "textScore" } } )
    .sort( {
      score: { $meta : 'textScore' }
    } )
    .limit(1)
    .cursor();
    let smsdeliverylog = null;
    smsdeliverylog = await cursor.next();
    return await res.json( smsdeliverylog );
  } catch (error) {
    console.log("Error: " + error);
    return await res.send( "Error: " + error );
  }
}

const deleteSMSDeliveryLogById = async (req, res, next) => {
  try {
      const deleted = await SMSDeliveryLog.findByIdAndRemove({_id: req.params.id});
      return await res.json( { success: true } );
  } catch (error) {
    console.log("Error: " + error);
    return await res.send( "Error: " + error );
  }
}

module.exports = {
  postSMSDeliveryLog,
  putSMSDeliveryLog,
  findSMSDeliveryLog,
  getSMSDeliveryLog,
  deleteSMSDeliveryLogById
};
