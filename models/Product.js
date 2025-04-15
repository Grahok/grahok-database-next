import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  purchasePrice: { type: Number, required: true, default: 0 },
  sellPrice: { type: Number, required: true, default: 0 },
  inStock: { type: Number, required: true, default: 0 },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
