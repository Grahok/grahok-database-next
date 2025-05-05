import EXPENSE_CATEGORIES from "@/constants/expenseCategories";
import PAYMENT_METHODS from "@/constants/paymentMethods";
import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  name: { type: String, enum: EXPENSE_CATEGORIES, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  paymentMethod: { type: String, enum: PAYMENT_METHODS, required: true },
  note: { type: String },
});

const Expense =
  mongoose.models.Expense || mongoose.model("Expense", expenseSchema);

export default Expense;
