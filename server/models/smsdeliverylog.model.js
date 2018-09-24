const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create ninja schema & model
const SMSDeliveryLogSchema = new Schema({
  appname: {
    type: String,
    required: [true, 'App name is required']
  },
  number: {
    type: String,
    required: [true, 'Number is required']
  },
  message: {
    type: String,
    required: [true, 'Message is required']
  },
  datecreated: {
    type: Date,
    // `Date.now()` returns the current unix timestamp as a number
    default: Date.now
  }
},
{
    collection: 'smsdeliverylogs',
    read: 'nearest'
});
SMSDeliveryLogSchema.index( { appname: 'text', number: 'text', message: 'text' }, { weights: { appname: 3, number: 2, message: 1 }} );

// ProfileSchema.index( { prefixesinqtext: 'text', prefixestoken: 'text' }, { weights: { prefixesinqtext: 3, prefixestoken: 2, 'name.first': 1 }} );

// To create an index to support text search on, say, prefixesinqtext and name.first:
// ProfileSchema.index( { prefixesinqtext: 'text', 'name.first': 'text' } );
// Or if you want to include all string fields in the index, use the '$**' wildcard:
// schema.index({'$**': 'text'});

const SMSDeliveryLogs = mongoose.model('SMSDeliveryLogs', SMSDeliveryLogSchema);

module.exports = SMSDeliveryLogs;
