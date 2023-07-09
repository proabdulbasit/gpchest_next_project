import dbConnect from "../../../../utils/mongo";
import Order from "../../../../models/Order";

export default async function handler(req, res) {
  const {
    method,
    query: { email },
  } = req;
  await dbConnect();

  if (method === "GET") {
    try {
      // this gets the latest data.

      const order = await Order.find({ customer: email })
        .limit(1)
        .sort({ $natural: -1 });
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
