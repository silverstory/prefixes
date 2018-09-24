const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create ninja schema & model
const AppSchema = new Schema({
  appname: {
    type: String,
    required: [true, 'App name is required']
  },
  datecreated: {
    type: Date,
    // `Date.now()` returns the current unix timestamp as a number
    default: Date.now
  }
},
{
    collection: 'apps',
    read: 'nearest'
});
AppSchema.index( { appname: 'text' }, { weights: { appname: 1 }} );

// ProfileSchema.index( { prefixesinqtext: 'text', prefixestoken: 'text' }, { weights: { prefixesinqtext: 3, prefixestoken: 2, 'name.first': 1 }} );

// To create an index to support text search on, say, prefixesinqtext and name.first:
// ProfileSchema.index( { prefixesinqtext: 'text', 'name.first': 'text' } );
// Or if you want to include all string fields in the index, use the '$**' wildcard:
// schema.index({'$**': 'text'});

const Apps = mongoose.model('Apps', AppSchema);

module.exports = Apps;
