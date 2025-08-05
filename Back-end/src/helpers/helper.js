const nodemailer = require("nodemailer");

require("dotenv").config();

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  service: "gmail",

  secure: process.env.NODE_ENV === "development" ? false : true, // true for 465, false for other ports
  auth: {
    user: "subrotokumarbarman@gmail.com",
    pass: process.env.APP_PASSWORD || "oetj lpnr obox kuup",
  },
});

exports.mailSender = async (email, template) => {
  const info = await transporter.sendMail({
    from: "Clicon",
    to: email,
    subject: "Confirm Registration",

    html: template, // HTML body
  });

  console.log("Message sent:", info.messageId);
};


