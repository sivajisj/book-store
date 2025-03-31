import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) {
      res.status(404).json({ success: false, message: "Products not found" });
    }
    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: products,
    });
  } catch (error) {
    console.log("Error in fetching products", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const postProducts = async (req, res) => {
  const products = req.body; // Expecting an array of products
  console.log(products);
  

  if (!Array.isArray(products) || products.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide an array of products" });
  }

  try {
    const newProducts = await Product.insertMany(products);
    res.status(201).json({
      success: true,
      message: "Products created successfully",
      data: newProducts,
    });
  } catch (error) {
    console.error("Error in bulk insert", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


export const deleteProduct = async (req, res) => {
    const productId = req.params.id;
  console.log("productId", productId);


   // ✅ Check if the provided ID is a valid MongoDB ObjectId
   if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ success: false, message: "Invalid product ID" });
    }
  try {
    const product = await Product.findById(productId);

   
    if (!product) {
      res.status(404).json({ success: false, message: "Product not found" });
    }

    await product.deleteOne();
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.log("Error in delete product", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
    };

export const updateProduct = async (req, res) => {

    const productId = req.params.id;   
    const product = req.body;

    // ✅ Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, product, {
            new: true, 
            runValidators: true // ✅ Ensures validation rules are followed
        });

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, message: "Product updated successfully", data: updatedProduct });

    } catch (error) {
        console.log("Error updating product:", error);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
}