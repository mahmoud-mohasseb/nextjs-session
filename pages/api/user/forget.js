import connectDB from "../../../connectDB";
import User from "../../../model/userModel";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../../helpers/sendEmail";
import absoluteUrl from "next-absolute-url";

connectDB();
const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      const { email } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        res.status(404).json({ error: "email not found" });
      }

      console.log(user);

      const token = jwt.sign(
        { _id: user._id },
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkF5YW4gbWFobW91ZCIsImlhdCI6MTUxNjIzOTAyMn0.HanbK56lGE1BaM3nT4B1PwXoZisAbBbCfyyCHZRR278",
        {
          expiresIn: "30d",
        }
      );
      // console.log(token)
      user.resetToken = token;
      await user.save();

      const { origin } = absoluteUrl(req);
      const link = `${origin}/src/user/reset/${token}`;

      const message = `<div><h1>Click on the link below to reset your password, if the link is not working then please paste into the browser.</h1></div></br>
    <div><p>link:${link}</p></div>`;

      // console.log("message", message)
      // console.log("here")

      await sendEmail({
        to: user.email,
        subject: "Reset password you forgot ",
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
