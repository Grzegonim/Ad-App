const mongoose = require('mongoose');

const adsSchema = new mongoose.Schema({
  title: { type: String, require: true },
  content: { type: String, require: true}, 
  date: { type: Date, require: true },
  pic: { type: String, require: true },
  price: { type: Number, require: true }, 
  localization: { type: String, require: true }, 
  seller: { type: String, require: true, ref: 'Users' }
});

module.exports = mongoose.model('Adverts', adsSchema);