const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const SupportInvitation = require("../models/SupportInvitation");
const User = require("../models/User");

const acceptSupportInvitation = async (
  token,
  fullName,
  password
) => {
  // 1. Hash the token received from the invitation URL
  const tokenHash = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  // 2. Find the invitation
  const invitation = await SupportInvitation.findOne({
    tokenHash,
  });

  if (!invitation) {
    throw new Error("Invalid invitation.");
  }

  // 3. Check whether invitation was already accepted
  if (invitation.status === "accepted") {
    throw new Error("This invitation has already been accepted.");
  }

  // 4. Check invitation expiration
  if (new Date() > invitation.expiresAt) {
    invitation.status = "expired";
    await invitation.save();

    throw new Error(
      "This invitation has expired. Please request a new invitation."
    );
  }

  // 5. Check whether an account already exists
  const existingUser = await User.findOne({
    email: invitation.email,
  });

  if (existingUser) {
    throw new Error(
      "An account with this email already exists."
    );
  }

  // 6. Validate password
  if (!password || password.length < 6) {
    throw new Error(
      "Password must be at least 6 characters long."
    );
  }

  // 7. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 8. Create support staff account
  const supportUser = await User.create({
    fullName: fullName.trim(),
    email: invitation.email,
    password: hashedPassword,
    role: "support",
    isActive: true,
    isOnline: false,
    lastSeen: null,
  });

  // 9. Mark invitation as accepted
  invitation.status = "accepted";
  invitation.acceptedAt = new Date();

  await invitation.save();

  return {
    user: supportUser,
    invitation,
  };
};

module.exports = {
  acceptSupportInvitation,
};