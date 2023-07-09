import User from "../../../models/User";
import bcrypt from "bcrypt";
import dbConnect from "../../../utils/mongo";

export default async function handler(req, res) {
  await dbConnect();
  const {
    body,
    method,
    query: { userId },
  } = req;

  // Get One User by Id or Email
  if (method === "GET") {
    try {
      const user = await User.findById(userId);
      const { password, ...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // Update User
  if (method === "PUT") {
    if (body.userId === userId) {
      if (body.password) {
        const salt = await bcrypt.genSalt(10);
        body.password = await bcrypt.hash(body.password, salt);
      }

      try {
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          {
            $set: body,
          },
          { new: true }
        );

        res.status(201).json(updatedUser);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("Unauthorized!");
    }
  }

  //   Delete User
  if (method === "DELETE") {
    if (body.userId === params.userId) {
      try {
        await User.findByIdAndDelete(params.userId);
        res.status(200).json("User has been deleted");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("Unauthorized!");
    }
  }
}
