import connectDB from "../../../../connectDB";
import User from "../../../../model/userModel";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../../../helpers/sendEmail";
// import bcrypt from "bcryptjs";
// import absoluteUrl from "next-absolute-url";

connectDB();
const handler = async (req, res) => {
  try {
    if (req.method === "PUT") {
      const { token } = req.query;
      console.log(token);

      if (token) {
        const decoded = await jwt.verify(
          token,
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkF5YW4gbWFobW91ZCIsImlhdCI6MTUxNjIzOTAyMn0.HanbK56lGE1BaM3nT4B1PwXoZisAbBbCfyyCHZRR278"
        );
        req.user = decoded;
      }
      if (!token) {
        return res.status(200).json({ message: "no Token" });
      }

      const user = await User.findById(req.user._id);

      if (user) {
        user.validEmail = "yes";
        user.emailToken = undefined;
        await user.save();
        return res.status(200).json({ message: "success in updating user" });
      }
      await sendEmail({
        to: user.email,
        subject: "💙🚀 Email confirmed",
        text: `<h1>your Email confirmed welcome to sessions</h1>`,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
export default handler;
