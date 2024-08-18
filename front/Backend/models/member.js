// models/member.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const familyMemberSchema = new Schema({
  name: String,
  gender: String,
  relationship: String
});

const memberSchema = new Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  serialNo: String,
  gender: String,
  maritalStatus: String,
  dateOfBirth: String,
  residence: String,
  telephoneNo: String,
  city: String,
  emailAddress: String,
  occupation: String,
  employer: String,
  spouse: {
    firstName: String,
    middleName: String,
    lastName: String,
    gender: String,
    relationship: String,
    dateOfBirth: String,
  },
  familyMembers: [familyMemberSchema]
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
