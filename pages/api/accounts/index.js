import dbConnect from "../../../utils/mongo";
import Account from "../../../models/Account";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  if (method === "GET") {
    try {
      const accounts = await Account.find();
      res.status(200).json(accounts);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
