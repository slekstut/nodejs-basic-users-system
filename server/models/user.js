const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
 email: {
  type: String,
  require: true
 },
 password: {
  type: String,
  required: true
 },
 username: {
  type: String,
  required: true
 },
 role: {
  type: String,
  default: 'Single User'
 }
});

module.exports = mongoose.model('User', userSchema);