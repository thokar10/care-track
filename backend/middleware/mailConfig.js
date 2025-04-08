const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Ensure this is correct
  port: 587,
  secure: false,
  auth: {
    user: "sthokar459@gmail.com",
    pass: "bbzl bwli tsgd uuud",
  },
});

module.exports = { transporter };
