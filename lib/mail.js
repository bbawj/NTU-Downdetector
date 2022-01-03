const nodemailer = require("nodemailer");

let transporter;
if (process.env.NODE_ENV === "production") {
  // all emails are delivered to destination
  //todo: production email service
} else {
  // all emails are catched by ethereal.email
  nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: account.user, // generated ethereal user
        pass: account.pass, // generated ethereal password
      },
    });
  });
}

module.exports = transporter;
