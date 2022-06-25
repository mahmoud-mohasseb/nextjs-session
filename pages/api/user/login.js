import connectDB from "../../../connectDB";
import User from "../../../model/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();
const handler = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (req.method === "POST") {
      if (!email || !password) {
        return res.status(422).json({ error: "please fill all the fields" });
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "Invalid credentials" });
      }
      const doMatch = await bcrypt.compare(password, user.password);

      if (doMatch) {
        const token = jwt.sign(
          { userId: user._id },
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkF5YW4gbWFobW91ZCIsImlhdCI6MTUxNjIzOTAyMn0.HanbK56lGE1BaM3nT4B1PwXoZisAbBbCfyyCHZRR278",
          {
            expiresIn: "7d",
          }
        );
        const { email, _id, name } = user;

        res.status(201).json({
          token,
          user: { email, _id, name },
          message: "login successful",
        });
      }

      if (!doMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
    } else {
      return res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
  }
};
export default handler;
