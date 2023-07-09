import Message from "../../../models/Message";
import dbConnect from "../../../utils/mongo";

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;

  if (method === "POST") {
    const newMessage = new Message(req.body);

    try {
      const savedMessage = await newMessage.save();
      res.status(200).json(savedMessage);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
