const {
  createSupportInvitation,
} = require("../services/supportInvitationService");

const {
  acceptSupportInvitation,
} = require("../services/acceptSupportInvitationService");


// =====================================================
// INVITE SUPPORT STAFF
// =====================================================
const inviteSupportStaff = async (req, res) => {
  try {
    // Get email from request body
    const { email } = req.body;

    // Check whether email was provided
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Create the support invitation
    // req.user._id = currently logged-in admin
    const result = await createSupportInvitation(
      email,
      req.user._id
    );

    // Send successful response
    return res.status(201).json({
      success: true,
      message: "Support staff invitation sent successfully",
      invitationId: result.invitation._id,
    });

  } catch (error) {
    console.error("Support invitation error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create support staff invitation",
    });
  }
};


// =====================================================
// ACCEPT SUPPORT STAFF INVITATION
// =====================================================
const acceptInvitation = async (req, res) => {
  try {
    // Get data sent from AcceptSupportInvite page
    const {
      token,
      fullName,
      password,
    } = req.body;

    // Check required fields
    if (!token || !fullName || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Token, full name and password are required",
      });
    }

    // Accept the invitation
    const result = await acceptSupportInvitation(
      token,
      fullName,
      password
    );

    // Return successful response
    return res.status(200).json({
      success: true,
      message:
        "Support staff account created successfully",

      user: {
        id: result.user._id,
        fullName: result.user.fullName,
        email: result.user.email,
        role: result.user.role,
      },
    });

  } catch (error) {
    console.error(
      "Accept support invitation error:",
      error
    );

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================================
// EXPORT CONTROLLERS
// =====================================================
module.exports = {
  inviteSupportStaff,
  acceptInvitation,
};