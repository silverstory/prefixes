const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create ninja schema & model
const PrefixesSchema = new Schema({
  prefix: {
    type: String,
    required: [true, 'Prefix is required']
  },
  network: {
    type: String,
    required: [true, 'Network is required']
  },
  datecreated: {
    type: Date,
    // `Date.now()` returns the current unix timestamp as a number
    default: Date.now
  }
},
{
    collection: 'prefixes',
    read: 'nearest'
});
PrefixesSchema.index( { prefix: 'text', network: 'text' }, { weights: { prefix: 2, network: 1 }} );

// ProfileSchema.index( { prefixesinqtext: 'text', prefixestoken: 'text' }, { weights: { prefixesinqtext: 3, prefixestoken: 2, 'name.first': 1 }} );

// To create an index to support text search on, say, prefixesinqtext and name.first:
// ProfileSchema.index( { prefixesinqtext: 'text', 'name.first': 'text' } );
// Or if you want to include all string fields in the index, use the '$**' wildcard:
// schema.index({'$**': 'text'});

const Prefixes = mongoose.model('Prefixes', PrefixesSchema);

module.exports = Prefixes;
