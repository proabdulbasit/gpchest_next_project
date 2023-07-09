import dbConnect from "../../../utils/mongo";
import Review from "../../../models/Review";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  if (method === "GET") {
    try {
      const reviews = await Review.aggregate([
        { $sample: { size: 5 } },
        { $group: { _id: "$_id", result: { $push: "$$ROOT" } } },
        { $replaceRoot: { newRoot: { $first: "$result" } } },
      ]);
      res.status(200).json(reviews);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
