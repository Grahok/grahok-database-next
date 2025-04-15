import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: Number,
  purchasePrice: Number,
  sellPrice: Number,
  discount: Number,
  subtotal: Number,
});

export const vendorEntrySchema = new mongoose.Schema(
  {
    invoiceNumber: Number,
    orderStatus: {
      type: String,
      enum: ORDER_STATUSES,
      default: "Pending",
    },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },
    orderDate: Date,
    entryDate: Date,
    paymentDate: Date,
    products: [productSchema],
    subtotal: Number,
    paidByVendor: Number,
    shippingCharge: Number,
    shippingMethod: {
      type: String,
      enum: SHIPPING_METHODSX,
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
    collection: "Vendor Entries",
  }
);

const VendorEntry =
  mongoose.models.VendorEntry ||
  mongoose.model("VendorEntry", vendorEntrySchema);

export default VendorEntry;
