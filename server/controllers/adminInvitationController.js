const {
  createAdminInvitation
} = require('../services/adminInvitationService');

const inviteAdmin = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: 'Email is required'
      });
    }

    const result = await createAdminInvitation(
      email,
      req.user._id
    );

    res.status(201).json({
      success: true,
      message: 'Admin invitation created successfully',
      invitationId: result.invitation._id
    });
  } catch (error) {
    console.error('Admin invitation error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to create admin invitation'
    });
  }
};

module.exports = {
  inviteAdmin
};