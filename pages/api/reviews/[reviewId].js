import dbConnect from "../../../utils/mongo";
import Review from "../../../models/Review";

export default async function handler(req, res) {
  const {
    method,
    query: { reviewId },
  } = req;
  await dbConnect();

  if (method === "GET") {
    try {
      const review = await Review.findById(reviewId);
      res.status(200).json(review);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "DELETE") {
    try {
      await Review.findByIdAndDelete(reviewId);
      res.status(200).json("Review successfully deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
