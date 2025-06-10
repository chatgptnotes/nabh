const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token is required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = await User.findByPk(decoded.userId, {
      include: ['department']
    });

    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'Invalid or inactive user' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
};

const authorizeDepartment = async (req, res, next) => {
  const { departmentId } = req.params;
  
  if (req.user.role === 'admin' || req.user.role === 'quality_manager') {
    return next();
  }
  
  if (req.user.departmentId !== parseInt(departmentId)) {
    return res.status(403).json({ error: 'Access denied to this department' });
  }
  
  next();
};

module.exports = {
  authenticateToken,
  authorizeRoles,
  authorizeDepartment
};