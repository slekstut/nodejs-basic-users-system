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
 name: {
  type: String,
  required: true
 },
 role: {
  type: String,
  default: 'Role: User'
 }
});

module.exports = mongoose.model('User', userSchema);