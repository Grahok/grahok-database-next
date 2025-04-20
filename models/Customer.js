import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobileNumber: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  entryDate: { type: Date, default: Date.now },
});

const Customer =
  mongoose.models.Customer || mongoose.model("Customer", customerSchema);

export default Customer;
