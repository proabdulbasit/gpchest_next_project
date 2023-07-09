import User from "../../../models/User";
import dbConnect from "../../../utils/mongo";
import { compare } from "bcrypt";

export default async function handler(req, res) {
  await dbConnect();
  const { method, body } = req;

  if (method === "POST") {
    try {
      const { email, password } = body;

      const user = await User.findOne({ email });

      if (user) {
        const validated = await compare(password, user.password);
        if (validated) {
          const { password, ...rest } = user._doc;
          res.status(200).json(rest);
        } else {
          res.status(401).json("Invalid Credentials!");
        }
      } else {
        res.status(401).json("Invalid Credentials!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
