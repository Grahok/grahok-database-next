import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  purchasePrice: { type: Number, required: true },
  sellPrice: { type: Number, required: true },
  inStock: { type: Number, required: true },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
