import jwt from 'jsonwebtoken';

const isAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'thisisproject');
    console.log(decoded);
    if (decoded.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Unauthorized: Admin access required' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

export default isAdmin;