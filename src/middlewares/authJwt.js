const jwt = require('jsonwebtoken');

// JWT authentication middleware for restaurant users
module.exports = function authJwt(req, res, next) {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.restaurantId = decoded.id; // attach restaurant id for controllers
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
