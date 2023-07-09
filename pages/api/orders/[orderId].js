import dbConnect from "../../../utils/mongo";
import Order from "../../../models/Order";

export default async function handler(req, res) {
  const {
    method,
    body,
    query: { orderId },
  } = req;
  await dbConnect();

  if (method === "PUT") {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        {
          $set: body,
        },
        { new: true }
      );

      res.status(201).json(updatedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "GET") {
    try {
      const order = await Order.find(orderId);
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "DELETE") {
    try {
      await Order.findByIdAndDelete(orderId);
      res.status(200).json("Order deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
