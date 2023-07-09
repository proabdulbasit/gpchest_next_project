import Conversation from "../../../models/Conversation";
import dbConnect from "../../../utils/mongo";

export default async function handler(req, res) {
  await dbConnect();
  const {
    method,
    body: { senderEmail, receiverEmail },
  } = req;

  // create conversation
  if (method === "POST") {
    try {
      const conversation = await Conversation.find({
        members: { $in: [senderEmail] },
      });

      if (conversation.length) {
        res.status(500).json("Conversation Already Exists!");
      } else {
        const newConversation = new Conversation({
          members: [senderEmail, receiverEmail],
        });

        const savedConversation = await newConversation.save();

        res.status(200).json(savedConversation);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
