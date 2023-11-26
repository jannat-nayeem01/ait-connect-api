const jwt = require('jsonwebtoken-promisified');

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, 'keyJ', (err, decodedToken) => {
        if (err) {
          console.error('Error verifying token:', err);
          return reject(err);
        }
        console.log('Decoded Token:', decodedToken);
        resolve(decodedToken);
      });
    });
  };
  
  const requireAuth = async (req, res, next) => {
    const token = req.headers.authorization;
    console.log('Server Token:', token);

    
    try {
      const decodedToken = await verifyToken(token);
      req.user = decodedToken;
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  };
  
module.exports = { requireAuth };
