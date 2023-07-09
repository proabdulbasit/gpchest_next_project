import User from "../../../models/User";
import dbConnect from "../../../utils/mongo";

export default async function handler(req, res) {
  await dbConnect();

  const { body, method, query, params } = req;

  // Get One User by Id or Email
  if (method === "GET") {
    const email = query.email;
    try {
      const user = await User.findOne({ email });

      const { password, ...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
