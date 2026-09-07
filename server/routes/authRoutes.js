const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect, adminOnly } = require("../middleware/authMiddleware");
router.post('/register', authController.register);
router.post('/login', authController.login);

router.post('/forgot-password', authController.forgotPassword); 

router.put('/resetpassword/:resetToken', authController.resetPassword);
router.post('/google', authController.googleLogin);

router.post(
  "/create-support",
  protect,
  adminOnly,
  authController.createSupportUser
);

module.exports = router;
