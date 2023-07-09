import dbConnect from "../../../utils/mongo";
import Post from "../../../models/Post";

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;

  //   Get All Posts
  if (method === "GET") {
    try {
      const posts = await Post.find();
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
