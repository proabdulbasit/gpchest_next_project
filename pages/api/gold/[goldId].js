import dbConnect from "../../../utils/mongo";
import Gold from "../../../models/Gold";

export default async function handler(req, res) {
  await dbConnect();
  const {
    method,
    query: { goldId },
    body,
  } = req;

  if (method === "GET") {
    try {
      const gold = await Gold.findById(goldId);
      res.status(200).json(gold);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "DELETE") {
    try {
      await Gold.findByIdAndDelete(goldId);
      res.status(200).json("Gold Price Deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "PUT") {
    try {
      const gold = await Gold.findById(goldId);
      if (!gold) {
        res.status(401).json("Gold Price not found!");
      } else {
        const updatedGold = await Gold.findByIdAndUpdate(goldId, {
            $set: body
        }, { new: true });
        res.status(201).json(updatedGold);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
