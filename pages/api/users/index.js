import User from "../../../models/User";
import dbConnect from "../../../utils/mongo";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  await dbConnect();
  const { method, body } = req;

  // Get All Users
  if (method === "GET") {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "POST") {
    try {
      const { username, email, password } = body;
      const foundUser = await User.findOne({ email });

      if (!foundUser) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({ username, email, password: hashedPassword });
        const savedUser = await user.save();
        res.status(201).json(savedUser);
      } else {
        res.status(409).json("User Exists!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
