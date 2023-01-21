const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads');
  },
  filename: (req, file, cb) => {
    const [name, ext] = file.originalname.split('.');
    cb(null, `${name}-${Date.now()}.${ext}`);
  }
});

const limits = multer({
  limits: {
    fileSize: 1024 * 1024
  }
})

const upload = multer({
  storage: storage,
  limits: limits
})

const imageUpload = multer({ storage });

module.exports = imageUpload;