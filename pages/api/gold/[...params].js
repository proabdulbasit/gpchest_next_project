import dbConnect from "../../../utils/mongo";
import Gold from "../../../models/Gold";

export default async function handler(req, res) {
  const { method, params, query } = req;
  await dbConnect();

  if (method === "GET") {
    try {
      const type = query?.params[0];
      const trade = query?.params[1];

      const result = await Gold.find({ type, trade });

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
