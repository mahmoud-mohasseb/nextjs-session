import connectDB from "../../../connectDB";
import User from "../../../model/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import absoluteUrl from "next-absolute-url";
import { sendEmail } from "../../../helpers/sendEmail";

const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      console.log(req.body.dbUser.email);

      const user = await User.findOne({ email: req.body.dbUser.email });

      const token = jwt.sign(
        { _id: user._id },
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkF5YW4gbWFobW91ZCIsImlhdCI6MTUxNjIzOTAyMn0.HanbK56lGE1BaM3nT4B1PwXoZisAbBbCfyyCHZRR278",
        {
          expiresIn: "30d",
        }
      );
      console.log(token);

      user.emailToken = token;
      await user.save();

      const { origin } = absoluteUrl(req);
      const link = `${origin}/src/user/email/${token}`;

      const message = `<div>Click on the link below to verify your email, if the link is not working then please paste into the browser.</div></br>
    <div>link:${link}</div>`;

      await sendEmail({
        to: user.email,
        subject: "Password Reset",
        text: message,
      });

      return res.status(200).json({
        message: `Email sent to ${user.email}, please check your email`,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export default handler;
