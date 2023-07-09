import dbConnect from "../../../utils/mongo";
import Review from "../../../models/Review";

export default async function handler(req, res) {
  const { method, body } = req;
  await dbConnect();

  if (method === "POST") {
    try {
      const review = new Review({
        name: body.name,
        email: body.email,
        rating: body.rating,
        experience: body.experience,
      });
      const savedReview = await review.save();
      res.status(201).json(savedReview);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "GET") {
    try {
      const reviews = await Review.find();
      res.status(200).json(reviews);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
