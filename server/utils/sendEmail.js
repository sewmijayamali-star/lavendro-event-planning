const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sewmijayamali@gmail.com',
      pass: 'mvyf vjhb uxtf uqpz'
    }
  });

  const mailOptions = {
    from: 'Lavendro Support <sewmijayamali369@gmail.com>',
    to: options.email,
    subject: options.subject,
    html: options.message
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
