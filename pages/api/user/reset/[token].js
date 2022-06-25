import User from "../../../../model/userModel";
import connectDB from "../../../../connectDB";
import bcrypt from "bcryptjs";
import absoluteUrl from "next-absolute-url";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../../../helpers/sendEmail";

connectDB();
const handler = async (req, res) => {
  //
  try {
    if (req.method === "PUT") {
      const { token } = req.query;
      const { password, conPassword } = req.body;
      if (password !== conPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
      }
      if (password.length < 6) {
        return res
          .status(400)
          .json({ error: "Password needs to be at least 6 characters" });
      }
      if (token) {
        const decoded = await jwt.verify(
          token,
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkF5YW4gbWFobW91ZCIsImlhdCI6MTUxNjIzOTAyMn0.HanbK56lGE1BaM3nT4B1PwXoZisAbBbCfyyCHZRR278"
        );
        req.user = decoded;
      }

      const user = await User.findById(req.user._id);

      if (user) {
        user.password = await bcrypt.hash(password, 12);

        user.resetToken = undefined;
        await user.save();
        //
        const message = `<div>
         you have changed password .</div>`;

        // send pass changed
        await sendEmail({
          to: user.email,
          subject: "💙🚀 You have changed password",
          text: message,
        });

        return res.status(200).json({ message: "success in updating user" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
export default handler;
