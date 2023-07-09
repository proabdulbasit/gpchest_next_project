import User from "../../models/User";
import dbConnect from "../../utils/mongo";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;

  // Register
  if (method === "POST") {
    try {
      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const newUser = new User({
        email: req.body.email,
        password: hashedPassword,
      });

      const user = await newUser.save();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
