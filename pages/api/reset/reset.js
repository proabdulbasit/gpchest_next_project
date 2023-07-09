import dbConnect from "../../../utils/mongo";
import Token from "../../../models/Token";
import { compare } from "bcrypt";

export default async function handler(req, res) {
  await dbConnect();
  const { method, body } = req;

  if (method === "POST") {
    try {
      const { email, token } = body;

      const tokenDB = await Token.findOne({ email });

      if (tokenDB) {
        const validated = await compare(token, tokenDB.token);

        if (validated) {
          res.status(200).json({ validated: true });
          await Token.findByIdAndDelete(tokenDB._id);
        } else {
          res.status(500).json({ validated: false });
        }
      } else {
        res.status(500).json({ validated: false });
      }
    } catch (err) {
      res.status(500).json({ validated: false });
    }
  }
}
