const crypto = require('crypto');
const AdminInvitation = require('../models/AdminInvitation');

const createAdminInvitation = async (email, invitedBy) => {
  // Generate a secure random token
  const rawToken = crypto.randomBytes(32).toString('hex');

  // Hash token before storing it
  const tokenHash = crypto
    .createHash('sha256')
    .update(rawToken)
    .digest('hex');

  // Invitation expires after 24 hours
  const expiresAt = new Date(
    Date.now() + 24 * 60 * 60 * 1000
  );

  const invitation = await AdminInvitation.create({
    email,
    invitedBy,
    tokenHash,
    expiresAt
  });

  return {
    invitation,
    rawToken
  };
};

module.exports = {
  createAdminInvitation
};