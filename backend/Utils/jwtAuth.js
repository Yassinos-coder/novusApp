const jwt = require('jsonwebtoken');

// JWT Authentication Middleware
const jwtAuth = (req, res, next) => {
  // Get the token from the authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'Token is missing' }); // Unauthorized
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' }); // Forbidden
    }
    req.user = user; // Attach user data to request
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = jwtAuth;
