import connectDB from "../../../connectDB";
import User from "../../../model/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import absoluteUrl from "next-absolute-url";

import { sendEmail } from "../../../helpers/sendEmail";

connectDB();

const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      // parse body check if user exist
      const { email, password, firstName, lastName } = req.body;
      const user = await User.findOne({ email: email });

      if (user) {
        return res.status(422).json({ error: "User already exists" });
      }
      if (password.length < 6) {
        return res
          .status(400)
          .json({ error: "Password needs to be at least 6 characters" });
      }
      // hash password
      const HashedPassword = await bcrypt.hash(password, 12);
      // create new user and save to mongodb
      const newUser = await new User({
        email: email,
        password: HashedPassword,
        name: `${firstName} ${lastName}`,
      }).save();
      // HS265
      const token = jwt.sign(
        { _id: newUser._id },
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkF5YW4gbWFobW91ZCIsImlhdCI6MTUxNjIzOTAyMn0.HanbK56lGE1BaM3nT4B1PwXoZisAbBbCfyyCHZRR278",
        {
          expiresIn: "30d",
        }
      );
      newUser.emailToken = token;
      await newUser.save();
      // absolute to localhost
      const { origin } = absoluteUrl(req);
      // console.log(origin);

      const link = `${origin}/src/user/email/${token}`;
      const message = `
      <style>
      .confirm:{
        color:red;
      }
      </style>
      <div class="confirm">
    Click on the link below to verify your email, if the link is not working then please paste into the browser.</div></br>
    <div>link:<a>${link}</a></div>`;

      // console.log("message", message);
      // send Email for verification
      await sendEmail({
        to: newUser.email,
        subject: "💙🚀 Verify Email",
        text: message,
      });

      return res.status(200).json({
        message: `Email sent to ${newUser.email}, please check your email`,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export default handler;
