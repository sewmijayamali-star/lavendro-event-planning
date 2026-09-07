const {
  createAdminInvitation,
  acceptAdminInvitation
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

const acceptInvitation = async (req, res) => {
  try {
    const { token, fullName, password } = req.body;

    if (!token || !fullName || !password) {
      return res.status(400).json({
        success: false,
        message: 'Token, full name and password are required'
      });
    }

    const invitation = await acceptAdminInvitation(
      token,
      fullName,
      password
    );

    res.status(200).json({
      success: true,
      message: 'Admin invitation accepted successfully',
      invitationId: invitation._id
    });

  } catch (error) {
    console.error('Accept invitation error:', error);

    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  inviteAdmin,
  acceptInvitation
};