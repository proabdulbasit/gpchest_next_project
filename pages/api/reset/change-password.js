import dbConnect from "../../../utils/mongo";
import User from "../../../models/User";
import bcrypt from "bcrypt";
import { confirmReset } from "../../../utils/templates/reset-password";
import sendEmail from "../../../utils/sendEmail";

export default async function handler(req, res) {
  await dbConnect();
  const { method, body } = req;
  const { email, password } = body;

  if (method === "PUT") {
    try {
      const foundUser = await User.findOne({ email });

      if (!foundUser) {
        res.status(500).json("Something went wrong!");
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const updatedUser = await User.findByIdAndUpdate(
          foundUser._id,
          { $set: { password: hashedPassword } },
          { new: true }
        );

        const response = await sendEmail(
          email,
          "Password Reset Successful",
          "link",
          confirmReset
        );
        res.status(200).json(updatedUser);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
