const User = require('../models/Users.model.js');
const bcrypt = require('bcryptjs');
const getImageFileType = require('../utils/getImageFileType.js');
const fs = require('fs');

exports.register = async (req, res) => {
  try {
    const { login, password, phone } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
    const imageExtensions = ['image/png', 'image/jpeg', 'image/gif'];
    if (login && typeof login === 'string' && password && typeof password === 'string' && imageExtensions.includes(fileType)) {
      const userWithLogin = await User.findOne({ login });
      if (userWithLogin) {
        fs.unlinkSync(req.file.path);
        return res.status(409).json({ message: 'User with this login already exists' });
      }
      const user = User.create({ login: login, password: await bcrypt.hash(password, 10), avatar: req.file.filename, phone });
      res.status(201).json({ message: 'User ' + login + ' created'});
    } else {
      fs.unlinkSync(req.file.path);
      res.status(400).json({ message: 'Bad request' });
    }
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
}

exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;
    if (login && typeof login === 'string' && password && typeof password === 'string') {
      const user = await User.findOne({ login });

      if(!user) {
        res.status(400).json({ message: 'Login or password are incorrect '});
      } else {
        if (bcrypt.compareSync(password, user.password)) {
          req.session.login = login;
          req.session.userId = user._id;
          res.status(200).json({ message: 'Login succesful' });
        } else {
            res.status(400).json({ message: 'Login or password are incorrect' });
          }
      }
    } else {
      res.status(400).json({ message: 'Bad request' });
    }
  }

  catch (err) {
    res.status(500).json({ message: err });
  }
}

exports.logout = async (req, res) => {
  try {
    req.session.destroy();
    res.json({ message: 'User logout' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
}