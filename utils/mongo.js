import mongoose from "mongoose";
let dev = process.env.NODE_ENV !== "production";
let DEV_DB_URL = process.env.MONGODB_URL_DEV;
let PROD_DB_URL = process.env.MONGODB_URL_PROD;
// mongoose.set('strictQuery': true)

const MONGODB_URL = `${dev ? DEV_DB_URL : PROD_DB_URL}`;
// const MONGODB_URL = PROD_DB_URL;

if (!MONGODB_URL) {
  throw new Error(
    "Please define the MONGODB_URL environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URL, opts).then((mongoose) => {
      console.log("Database connected!!, now ready for work");
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
