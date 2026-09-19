const {
  createEventPlannerInvitation
} = require('../services/eventPlannerInvitationService');

const inviteEventPlanner = async (req, res) => {
  try {
    const { email } = req.body;

    // 1. Check email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    // 2. Create and send invitation
    const result = await createEventPlannerInvitation(
      email,
      req.user._id
    );

    // 3. Send success response
    return res.status(201).json({
      success: true,
      message: 'Event planner invitation sent successfully',
      invitationId: result.invitation._id
    });

  } catch (error) {
    console.error(
      'Event planner invitation error:',
      error
    );

    return res.status(500).json({
      success: false,
      message: 'Failed to send event planner invitation'
    });
  }
};

module.exports = {
  inviteEventPlanner
};