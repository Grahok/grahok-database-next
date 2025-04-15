import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: Number,
  purchasePrice: Number,
  sellPrice: Number,
  discount: Number,
  subtotal: Number,
});

const customerEntrySchema = new mongoose.Schema(
  {
    invoiceNumber: Number,
    orderStatus: {
      type: String,
      enum: ORDER_STATUSES,
      default: "Pending",
    },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    orderDate: Date,
    customerEntryDate: Date,
    paymentDate: Date,
    products: [productSchema],
    subtotal: Number,
    paidByCustomer: Number,
    shippingCustomer: Number,
    shippingMerchant: Number,
    totalShippingCharge: Number,
    shippingMethod: {
      type: String,
      enum: SHIPPING_METHODS,
      default: "Pathao",
    },
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
  },
  {
    collection: "Customer Entries",
  }
);

const CustomerEntry =
  mongoose.models.CustomerEntry ||
  mongoose.model("CustomerEntry", customerEntrySchema);

export default CustomerEntry;
