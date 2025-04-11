import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: Number,
  purchasePrice: Number,
  sellPrice: Number,
  discount: Number,
  subtotal: Number,
});

const entrySchema = new mongoose.Schema({
  invoiceNumber: Number,
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  orderDate: Date,
  entryDate: Date,
  paymentDate: Date,
  products: [productSchema],
  subtotal: Number,
  paidByCustomer: Number,
  shippingCustomer: Number,
  shippingMerchant: Number,
  totalShippingCharge: Number,
  shippingMethod: String,
  otherCost: Number,
  courierTax: Number,
  
  // Calculated fields (write-once at submission)
  totalQuantity: Number,
  totalPurchasePrice: Number,
  totalSellPrice: Number,
  totalDiscount: Number,
  overallDiscount: Number,
  totalIncome: Number,
  netProfit: Number,
});

const Entry = mongoose.models.Entry || mongoose.model("Entry", entrySchema);

export default Entry;
