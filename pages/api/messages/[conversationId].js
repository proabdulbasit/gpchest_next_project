import Message from "../../../models/Message";
import dbConnect from "../../../utils/mongo";

export default async function handler(req, res) {
  await dbConnect();

  const {
    method,
    query: { conversationId },
  } = req;

  // Get user conversation
  if (method === "GET") {
    try {
      const messages = await Message.find({
        conversationId,
      });

      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
