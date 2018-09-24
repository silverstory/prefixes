export interface Profile {
  _id: string;
  profileid: String;
  mobile: String;
  email: String;
  name: {
    first: String;
    middle: String;
    last: String;
  };
  distinction: String;
  personaccesslevel: String;
  recordstatus: String;
  prefixescode: String;
  prefixesinqtext: String;
  prefixestoken: String;
  photothumbnailurl: String;
  employee: {
    position: String;
    office: String;
  };
  resident: {
    city: String;
    district: String;
    barangay: String;
  };
  visitor: {
    visitorid: String;
    visitorcompany: String;
    persontovisit: String;
    visitorpurpose: String;
    visitordestination: String;
    timeofappointment: Date;
    visitstatus: String;
  };
  datecreated: Date;
  two_factor_temp_secret: String;
  two_factor_secret: String;
  two_factor_enabled: Boolean;
  score: number;
}
