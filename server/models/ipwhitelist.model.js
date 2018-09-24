const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create ninja schema & model
const IpwhitelistSchema = new Schema({
  ip: {
    type: String,
    required: [true, 'IP is required']
  },
  org: {
    type: String,
    required: [true, 'Organization is required']
  },
  datecreated: {
    type: Date,
    // `Date.now()` returns the current unix timestamp as a number
    default: Date.now
  }
},
{
    collection: 'ipwhitelists',
    read: 'nearest'
});
IpwhitelistSchema.index( { ip: 'text', org: 'text' }, { weights: { ip: 2, org: 1 }} );

// ProfileSchema.index( { prefixesinqtext: 'text', prefixestoken: 'text' }, { weights: { prefixesinqtext: 3, prefixestoken: 2, 'name.first': 1 }} );

// To create an index to support text search on, say, prefixesinqtext and name.first:
// ProfileSchema.index( { prefixesinqtext: 'text', 'name.first': 'text' } );
// Or if you want to include all string fields in the index, use the '$**' wildcard:
// schema.index({'$**': 'text'});

const Ipwhitelist = mongoose.model('Ipwhitelist', IpwhitelistSchema);

module.exports = Ipwhitelist;
