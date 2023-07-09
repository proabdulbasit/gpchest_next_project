import Post from "../../../models/Post";
import dbConnect from "../../../utils/mongo";
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  await dbConnect();

  const {
    method,
    body,
    query: { postId },
  } = req;

  //   Get one post
  if (method === "GET") {
    try {
      const post = await Post.findById(postId);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //   Delete One Post
  if (method === "DELETE") {
    try {
      const post = await Post.findById(postId);
      fs.unlink(
        path.join(process.cwd(), "public", "images", "posts", `${post.image}`),
        (err) => {
          if (err) {
            throw err;
          }
        }
      );
      await Post.findByIdAndDelete(postId);
      res.status(200).json("Post Deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // Update Post
  // if (method === "PUT") {
  //   try {
  //     const updatedPost = await Post.findByIdAndUpdate(
  //       postId,
  //       {
  //         $set: body,
  //       },
  //       { new: true }
  //     );
  //     res.status(200).json(updatedPost);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // }
}
