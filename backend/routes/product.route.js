import express from "express";

import { deleteProduct, getProducts, postProducts, updateProduct } from "../controllers/product.controller.js";


const router = express.Router();

router.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

router.get("/", getProducts);
router.post("/", postProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);



export default router;