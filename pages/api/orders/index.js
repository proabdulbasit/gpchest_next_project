import dbConnect from "../../../utils/mongo";
import Order from "../../../models/Order";
import sendEmail from "../../../utils/sendEmail";
import { orderNotify } from "../../../utils/templates/reset-password";

export default async function handler(req, res) {
  const { method, body } = req;
  await dbConnect();

  if (method === "POST") {
    const { customer, orderId, total, basket } = body;
    try {
      const order = new Order(body);
      const savedOrder = await order.save();

      const products = [];

      basket.map((item) => {
        products.push(item.title);
      });

      const payload = {
        orderId,
        total,
        products,
      };

      const response = await sendEmail(
        customer,
        "New Order Placed",
        payload,
        orderNotify
      );

      res.status(201).json(savedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "GET") {
    try {
      const order = await Order.find();
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
