import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized, token not provided' });
  }

  jwt.verify(token.split(' ')[1], 'thisisproject', (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized, invalid token' });
    }
    req.user = decodedToken; 
    next();
  });
};

export default authenticateToken;