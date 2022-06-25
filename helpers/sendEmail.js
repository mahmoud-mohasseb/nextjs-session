import nodemailer from "nodemailer";

export const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: true,
    logger: true,
    debug: true,
    ignoreTLS: true,
    secureConnection: false,
    auth: {
      user: "elghareb1986@gmail.com",
      pass: `ayan@ayan@2704`,
    },
  });
  //   https://app-smtp.sendinblue.com/real-time
  const mailOptions = {
    from: "elghareb1986@gmail.com",
    to: options.to,
    subject: options.subject,
    html: options.text,
  };

  console.log(transporter);
  await transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};
