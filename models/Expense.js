import PAYMENT_METHODS from "@/constants/paymentMethods";
import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  entryDate: { type: Date, required: true },
  paymentMethod: { type: String, enum: PAYMENT_METHODS, required: true },
});

const Expense =
  mongoose.models.Expense || mongoose.model("Expense", expenseSchema);

export default Expense;
