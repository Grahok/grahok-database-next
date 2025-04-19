import { ORDER_STATUSES } from "@/constants/orderStatuses";
import { SHIPPING_METHODS } from "@/constants/shippingMethods";
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: Number,
  purchasePrice: Number,
  sellPrice: Number,
  discount: Number,
  subtotal: Number,
});

// const paymentSchema = new mongoose.Schema({
//   paymentDate: Date,
//   amount: Number,
// })

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
    products: [productSchema],
    subtotal: Number,
    paidByMerchant: Number,
    shippingCharge: Number,
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
    totalDiscount: Number,
    overallDiscount: Number,
    totalPayment: Number,
    // payments: [paymentSchema],
    alreadyPaid: Number,
    duePayment: Number,
  },
  {
    collection: "Vendor Entries",
  }
);

const VendorEntry =
  mongoose.models.VendorEntry ||
  mongoose.model("VendorEntry", vendorEntrySchema);

export default VendorEntry;
