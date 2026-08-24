const crypto = require('crypto');
const AdminInvitation = require('../models/AdminInvitation');
const sendEmail = require('../utils/sendEmail');

const createAdminInvitation = async (email, invitedBy) => {
  // 1. Generate a secure random token
  const rawToken = crypto.randomBytes(32).toString('hex');

  // 2. Hash the token before storing it
  const tokenHash = crypto
    .createHash('sha256')
    .update(rawToken)
    .digest('hex');

  // 3. Invitation expires after 24 hours
  const expiresAt = new Date(
    Date.now() + 24 * 60 * 60 * 1000
  );

  // 4. Save invitation in MongoDB
  const invitation = await AdminInvitation.create({
    email,
    invitedBy,
    tokenHash,
    expiresAt
  });

  // 5. Create invitation link
  const invitationUrl =
    `${process.env.FRONTEND_URL}/admin/accept-invite/${rawToken}`;

  // 6. Create email content
  const message = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Lavendro Administrator Invitation</h2>

      <p>You have been invited to become an administrator
      of Lavendro Event Planning.</p>

      <p>
        Click the button below to accept the invitation
        and set up your administrator account.
      </p>

      <p>
        <a
          href="${invitationUrl}"
          style="
            display:inline-block;
            padding:12px 20px;
            background:#f58b8b;
            color:#ffffff;
            text-decoration:none;
            border-radius:6px;
          "
        >
          Accept Invitation
        </a>
      </p>

      <p>This invitation will expire in 24 hours.</p>

      <p>
        If you did not expect this invitation, you can safely ignore this email.
      </p>

      <p>
        Regards,<br>
        Lavendro Event Planning
      </p>
    </div>
  `;

  try {
    // 7. Send invitation email
    await sendEmail({
      email,
      subject: 'Lavendro Admin Invitation',
      message
    });
  } catch (error) {
    // If email sending fails, revoke the invitation
    invitation.status = 'revoked';
    await invitation.save();

    throw new Error('Admin invitation email could not be sent.');
  }

  // 8. Return invitation information
  return {
    invitation
  };
};

module.exports = {
  createAdminInvitation
};