import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import router from "./routes/product.route.js";
import cors from "cors";
import path from "path";

dotenv.config();
const app = express();
const port = process.env.PORT || 5001;

const __dirname = path.resolve();

// Enable CORS for all origins (for development)
app.use(cors({
  origin: "*",  // Allow all domains
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
}));
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/client/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
	});
}
app.use(express.json());
app.use('/api/products', router);
app.listen(port, () => {
  connectDb();
  console.log("port listening on : ", port);
});
