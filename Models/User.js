const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  password: String,
  email: String,
  accounts: Array,
  cards: Array

});

module.exports = mongoose.model('User', userSchema);
