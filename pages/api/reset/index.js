import dbConnect from "../../../utils/mongo";
import Token from "../../../models/Token";
import crypto from "crypto";
import bcrypt from "bcrypt";
import sendEmail from "../../../utils/sendEmail";
import { resetPassword } from "../../../utils/templates/reset-password";

export default async function handler(req, res) {
  await dbConnect();
  const { method, body } = req;

  const clientURL = "localhost:3000";

  if (method === "POST") {
    try {
      const { email } = body;
      const resetToken = crypto.randomBytes(32).toString("hex");
      const salt = await bcrypt.genSalt(10);
      const hashedToken = await bcrypt.hash(resetToken, salt);
      const token = new Token({ email, token: hashedToken });
      const savedToken = await token.save();

      // creating reset link
      const link = `${clientURL}/password-reset/${email}/${resetToken}`;

      const payload = { link };

      const response = await sendEmail(
        email,
        "Password Reset Request",
        payload,
        resetPassword
      );

      res.status(200).json(savedToken);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
