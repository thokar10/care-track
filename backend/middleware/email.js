const { transporter } = require("./mailConfig");

const SendVerificationCode = async (email, verifcationCode) => {
  console.log("hello" + email, verifcationCode);
  try {
    const response = await transporter.sendMail({
      from: "Care Track",
      to: email,
      subject: "Verification code ",
      html: `<b>Your verfication code is ${verifcationCode}</b>`,
    });
    console.log(response);
  } catch (e) {
    console.log(e);
  }
};

module.exports = { SendVerificationCode };
