const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller.js');
const authMiddleware = require('../utils/authMiddleware.js');
const imageUpload = require('../utils/imageUpload.js');

router.post('/register', imageUpload.single('avatar'), auth.register);
router.post('/login', auth.login);
router.delete('/logout', authMiddleware, auth.logout);

module.exports = router;