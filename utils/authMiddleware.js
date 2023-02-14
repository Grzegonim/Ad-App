const authMiddleware = (req, res, next) => {
  if (req.session.login) {
    next();
  } else {
    res.status(401).json({ message: req.session });
  }
};

module.exports = authMiddleware;