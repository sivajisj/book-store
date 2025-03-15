import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import router from "./routes/product.route.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use('/api/products', router);
app.listen(port, () => {
  connectDb();
  console.log("port listening on : ", port);
});
