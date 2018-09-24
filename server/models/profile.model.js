const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create ninja schema & model
const ProfileSchema = new Schema({
  profileid: {
    type: String,
    required: [true, 'Profile ID is required']
  },
  mobile: {
    type: String,
    required: [true, 'Mobile No. is required']
  },
  email: {
    type: String
  },
  name: {
    first: {
      type: String,
      required: [true, 'Firstname is required']
    },
    middle: {
      type: String
    },
    last: {
      type: String,
      required: [true, 'Lastname is required']
    }
  },
  distinction: {
    type: String,
    required: [true, 'Distinction is required']
  },
  personaccesslevel: {
    type: String,
    required: [true, 'Person Access Level is required']
  },
  recordstatus: {
    type: String,
    required: [true, 'Record Status is required']
  },
  prefixescode: {
    type: String
  },
  prefixesinqtext: {
    type: String
  },
  prefixestoken: {
    type: String
  },
  photothumbnailurl: {
    type: String,
    default: 'https://images.pexels.com/photos/399772/pexels-photo-399772.jpeg'
  },
  employee: {
    position: {
      type: String
    },
    office: {
      type: String
    }
  },
  resident: {
    city: {
      type: String
    },
    district: {
      type: String
    },
    barangay: {
      type: String
    }
  },
  visitor: {
    visitorid: {
      type: String
    },
    visitorcompany: {
      type: String
    },
    persontovisit: {
      type: String
    },
    visitorpurpose: {
      type: String
    },
    visitordestination: {
      type: String
    },
    timeofappointment: {
      type: Date
    },
    visitstatus: {
      type: String
    }
  },
  datecreated: {
    type: Date,
    // `Date.now()` returns the current unix timestamp as a number
    default: Date.now
  },
  two_factor_temp_secret: {
    type: String
  },
  two_factor_secret: {
    type: String
  },
  two_factor_enabled: {
    type: Boolean,
    default: true
  }
},
{
    collection: 'profiles',
    read: 'nearest'
});
ProfileSchema.index( { prefixescode: 'text', prefixestoken: 'text', prefixesinqtext: 'text' }, { weights: { prefixescode: 3, prefixestoken: 2, prefixesinqtext: 1 }} );

// ProfileSchema.index( { prefixesinqtext: 'text', prefixestoken: 'text' }, { weights: { prefixesinqtext: 3, prefixestoken: 2, 'name.first': 1 }} );

// To create an index to support text search on, say, prefixesinqtext and name.first:
// ProfileSchema.index( { prefixesinqtext: 'text', 'name.first': 'text' } );
// Or if you want to include all string fields in the index, use the '$**' wildcard:
// schema.index({'$**': 'text'});

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;