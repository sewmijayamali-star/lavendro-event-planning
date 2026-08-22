const User = require('../models/User');

// GET /api/admin/dashboard
exports.getDashboard = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Welcome to Lavendro Admin Dashboard',
      admin: {
        id: req.user._id,
        name: req.user.fullName,
        email: req.user.email,
        role: req.user.role
      }
    });
  } catch (error) {
    console.error('Admin dashboard error:', error);

    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// GET /api/admin/profile
exports.getAdminProfile = async (req, res) => {
  try {
    const admin = await User.findById(req.user._id).select('-password');

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    res.status(200).json({
      success: true,
      admin
    });
  } catch (error) {
    console.error('Get admin profile error:', error);

    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};