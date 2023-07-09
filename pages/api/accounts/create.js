import dbConnect from "../../../utils/mongo";
import Account from "../../../models/Account";
import multer from "multer";
import nc from "next-connect";
import path from "path";

// Disabling the NextJS default bodyParser
export const config = {
  api: {
    bodyParser: false,
  },
};

// Multer Middleware Configuration
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(process.cwd(), "public", "images", "accounts"));
    },
    filename: function (req, file, cb) {
      cb(null, new Date().getTime() + "-" + file.originalname);
    },
  }),
});

// This enables us pass in Middleware in Nextjs as Nextjs does not support middleware by default.
const handler = nc({
  onError: (err, req, res, next) => {
  
    res.status(500).end("Something went wrong!");
  },
  onNoMatch: (req, res, next) => {
    res.status(404).end("Page not found!");
  },
})
  .use(upload.single("image"))
  .post(async (req, res) => {
    try {
      // const session = await getSession();
      await dbConnect();

      const imageUrl = req.file.filename;

      const account = new Account({
        ...req.body,
        image: imageUrl,
      });

      const savedAccount = await account.save();
      res.status(201).json(savedAccount);
    } catch (err) {
      res.status(500).json(err);
    }
  });

export default handler;
