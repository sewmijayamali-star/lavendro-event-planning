const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    let token;

    // Authorization: Bearer <token>
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        message: 'Not authorized. No token provided.'
      });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Find current user
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(401).json({
        message: 'User no longer exists.'
      });
    }

    // Attach user to request
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Not authorized. Invalid or expired token.'
    });
  }
};

const supportOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: 'Not authenticated.'
    });
  }

  if (req.user.role !== 'support') {
    return res.status(403).json({
      message: 'Access denied. Support privileges required.'
    });
  }

  next();
};

const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: 'Not authenticated.'
    });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({
      message: 'Access denied. Admin privileges required.'
    });
  }

  

  next();
};

module.exports = {
  protect,
  adminOnly,
  supportOnly
};