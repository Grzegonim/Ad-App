const Advert = require('../models/Ads.model.js');
const getImageFileType = require('../utils/getImageFileType.js');
const fs = require('fs');

exports.getAllAds = async (req, res) => {
  try {
    res.json(await Advert.find().populate('seller'));
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getAdsById = async (req, res) => {
  try {
    const ad = await Advert.findById({ _id: req.params.id }).populate('seller');
    if(!ad) res.status(404).json({ message: 'Advert not found' });
    res.json(ad);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getAdsBySearchPhrase = async (req, res) => {
  try {
    const ad = await Advert.find({ title: { $regex : req.params.searchPhrase, $options: "i" }}).populate('seller');
    res.json(ad);  
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.addAds = async (req, res) => {
  try {
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
    const imageExtensions = ['image/png', 'image/jpeg', 'image/gif'];
    const { title, content, date, price, localization } = req.body;
    if (title.length > 10 && title.length < 50 && content.length > 20 && content.length < 1000 && imageExtensions.includes(fileType)) {
      const ad = new Advert({ title, content, date, pic: req.file.filename, price, localization, seller: req.session.userId });
      await ad.save();
      res.json( ad );  
    } else {
      fs.unlinkSync(req.file.path);
      res.status(500).json({ message: 'Title or content have wrong amount of characters' });
    }
  }
  catch(err) {
    fs.unlinkSync(req.file.path);
    res.status(500).json({ message: err });
  }
};

exports.changeAds = async (req, res) => {
  try {
    const { title, content, date, price, localization } = req.body;
    const ad = await Advert.findOne({ _id: req.params.id });
    if (ad.seller === req.session.userId) {
      if(ad) {
        if(req.file) {
          await Advert.updateOne({ _id: req.params.id }, {$set: { title, content, date, price, localization, pic: req.file.filename }});
          res.json({ message: 'Advert ' + title + ' is updated'});    
        } else {
        await Advert.updateOne({ _id: req.params.id }, {$set: { title, content, date, price, localization }});
        res.json({ message: 'Advert ' + title + ' is updated'});  
        }
      } else {
        res.status(404).json({ message: 'Advert not found' });
      }  
    } else {
      res.status(401).json({ message: 'You are not authorized' });
    }
  }
  catch(err) {
    res.status(500).json({ message: err + 'test'});
  }
};

exports.deleteAds = async (req, res) => {
  try {
    const ad = await Advert.findById({ _id: req.params.id });
      if(ad) {
        await Advert.deleteOne({ _id: req.params.id });
        res.json({ message: 'Advert is deleted' });
      } else {
        res.status(404).json({ message: 'Advert not found' });
      }  
    } 
  catch(err) {
      res.status(500).json({ message: err });
    }
};