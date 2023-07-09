import dbConnect from "../../../utils/mongo";
import Post from "../../../models/Post";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  if (method === "GET") {
    try {
      const posts = await Post.aggregate([
        { $sample: { size: 4 } },
        { $group: { _id: "$_id", result: { $push: "$$ROOT" } } },
        { $replaceRoot: { newRoot: { $first: "$result" } } },
      ]);
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
