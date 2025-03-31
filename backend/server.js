import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import router from "./routes/product.route.js";
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.PORT || 5001;


// Enable CORS for all origins (for development)
app.use(cors({
  origin: "*",  // Allow all domains
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
}));
app.use(express.json());
app.use('/api/products', router);
app.listen(port, () => {
  connectDb();
  console.log("port listening on : ", port);
});
