const crypto = require('crypto');
const AdminInvitation = require('../models/AdminInvitation');
const sendEmail = require('../utils/sendEmail');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

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


const acceptAdminInvitation = async (rawToken, fullName, password) => {
  // 1. Hash the token received from the invitation link
  const tokenHash = crypto
    .createHash('sha256')
    .update(rawToken)
    .digest('hex');

  // 2. Find the invitation
  const invitation = await AdminInvitation.findOne({
    tokenHash
  });

  if (!invitation) {
    throw new Error('Invalid invitation token');
  }

  // 3. Check invitation status
  if (invitation.status !== 'pending') {
    throw new Error('Invitation is no longer valid');
  }

  // 4. Check expiration
  if (invitation.expiresAt < new Date()) {
    invitation.status = 'expired';
    await invitation.save();

    throw new Error('Invitation has expired');
  }
 let user = await User.findOne({
  email: invitation.email
});

if (user) {
  user.role = 'admin';
  await user.save();
} else {
  const hashedPassword = await bcrypt.hash(password, 12);

  user = await User.create({
    fullName,
    email: invitation.email,
    password: hashedPassword,
    role: 'admin'
  });
}
invitation.status = 'accepted';
invitation.acceptedAt = new Date();

await invitation.save();


  // 5. Return invitation for the next step
  return invitation;
};
 
module.exports = {
  createAdminInvitation,
  acceptAdminInvitation
};