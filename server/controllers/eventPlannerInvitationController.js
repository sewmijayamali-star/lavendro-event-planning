const crypto = require("crypto");

const EventPlannerInvitation = require("../models/EventPlannerInvitation");

const {
  createEventPlannerInvitation
} = require("../services/eventPlannerInvitationService");


// ======================================================
// ADMIN - SEND EVENT PLANNER INVITATION
// ======================================================

const inviteEventPlanner = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    const result = await createEventPlannerInvitation(
      email,
      req.user._id
    );

    return res.status(201).json({
      success: true,
      message:
        "Event planner invitation sent successfully",
      invitationId: result.invitation._id
    });

  } catch (error) {

    console.error(
      "Event planner invitation error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to send event planner invitation"
    });
  }
};


// ======================================================
// EVENT PLANNER - VERIFY INVITATION
// ======================================================

const getEventPlannerInvitation = async (req, res) => {

  try {

    const { token } = req.params;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Invitation token is required."
      });
    }


    // Hash token received from URL
    const tokenHash = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");


    // Find invitation
    const invitation =
      await EventPlannerInvitation.findOne({
        tokenHash
      });


    if (!invitation) {
      return res.status(404).json({
        success: false,
        message: "Invalid invitation link."
      });
    }


    // Check status
    if (invitation.status !== "pending") {

      return res.status(400).json({
        success: false,
        message:
          "This invitation is no longer available."
      });

    }


    // Check expiration
    if (new Date() > invitation.expiresAt) {

      invitation.status = "expired";

      await invitation.save();

      return res.status(400).json({
        success: false,
        message:
          "This invitation has expired."
      });

    }


    // Return only required information
    return res.status(200).json({
      success: true,
      email: invitation.email
    });

  } catch (error) {

    console.error(
      "Get event planner invitation error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to verify invitation."
    });
  }
};


// ======================================================
// EXPORT CONTROLLERS
// ======================================================

module.exports = {
  inviteEventPlanner,
  getEventPlannerInvitation
};