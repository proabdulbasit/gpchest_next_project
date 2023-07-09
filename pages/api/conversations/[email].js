import Conversation from "../../../models/Conversation";
import dbConnect from "../../../utils/mongo";

export default async function handler(req, res) {
  await dbConnect();

  const {
    method,
    query: { email },
  } = req;

  // Get user conversation
  if (method === "GET") {
    try {
      const conversation = await Conversation.find({
        members: { $in: [email] },
      });

      if (conversation.length === 0) {
        res.status(404).json("Conversation does not exists!");
      } else {
        res.status(200).json(conversation[0]);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
