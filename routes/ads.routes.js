const express = require('express');
const router = express.Router();
const ads = require('../controllers/ads.controller.js');
const authMiddleware = require('../utils/authMiddleware.js');
const imageUpload = require('../utils/imageUpload.js');

router.get('/ads', ads.getAllAds);
router.get('/ads/:id', ads.getAdsById)
router.get('/ads/search/:searchPhrase', ads.getAdsBySearchPhrase);
router.post('/ads', authMiddleware, imageUpload.single('pic'), ads.addAds);
router.put('/ads/:id', authMiddleware,imageUpload.single('pic'), ads.changeAds);
router.delete('/ads/:id', authMiddleware, ads.deleteAds);

module.exports = router;