import dbConnect from "../../../utils/mongo";
import Gold from "../../../models/Gold";

export default async function handler(req, res) {
  const { method, body } = req;
  await dbConnect();

  if (method === "POST") {
    try {
      const gold = new Gold({
        type: body.type,
        trade: body.trade,
        price: body.price,
      });

      const savedGold = await gold.save();
      res.status(201).json(savedGold);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "GET") {
    try {
      const golds = await Gold.find();
      res.status(200).json(golds);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
