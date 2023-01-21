const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  login: { type: String, require: true },
  password: { type: String, require: true },
  avatar: { type: String, require: true },
  phone: { type: Number, require: true }
});

module.exports = mongoose.model('Users', usersSchema);