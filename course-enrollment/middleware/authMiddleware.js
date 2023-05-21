const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get the JWT token from the request headers
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Verify the JWT token
  jwt.verify(token, 'your-secret-key', (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Extract the user's role from the decoded token
    const { role } = decodedToken;

    // Check if the user has the necessary permissions
    if (role !== 'admin') {
      return res.status(403).json({ message: 'You do not have permission to access this resource' });
    }

    // Store the decoded token in the request object for further use
    req.user = decodedToken;

    // Call the next middleware or route handler
    next();
  });
};

module.exports = authMiddleware;
