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

  shippingChargeCustomer: Number,
  shippingChargeMerchant: Number,
  shippingMethod: String,
  otherCost: Number,
  courierTax: Number,

  // Calculated fields (write-once at submission)
  totalQuantity: { type: Number, immutable: true },
  totalSell: { type: Number, immutable: true },
  totalPurchase: { type: Number, immutable: true },
  totalDiscount: { type: Number, immutable: true },
  subtotal: { type: Number, immutable: true },
  paidByCustomer: { type: Number, immutable: true },
  shippingChargeTotal: { type: Number, immutable: true },
  netProfit: { type: Number, immutable: true },
});

const Entry = mongoose.models.Entry || mongoose.model("Entry", entrySchema);

export default Entry;
