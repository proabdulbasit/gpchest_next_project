import Account from "../../../models/Account";
import dbConnect from "../../../utils/mongo";
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  await dbConnect();

  const {
    method,
    body,
    query: { accountId },
  } = req;

  //   Get one account
  if (method === "GET") {
    try {
      const account = await Account.findById(accountId);
      res.status(200).json(account);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //   Delete One Account
  if (method === "DELETE") {
    try {
      const account = await Account.findById(accountId);
      fs.unlink(
        path.join(
          process.cwd(),
          "public",
          "images",
          "accounts",
          `${account.image}`
        ),
        (err) => {
          if (err) {
            throw err;
          }
        }
      );
      await Account.findByIdAndDelete(accountId);
      res.status(200).json("Account Deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // Update Account
  if (method === "PUT") {
    try {
      const updatedAccount = await Account.findByIdAndUpdate(
        accountId,
        {
          $set: body,
        },
        { new: true }
      );

      res.status(200).json(updatedAccount);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
