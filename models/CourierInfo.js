import mongoose from "mongoose";

const courierInfoSchema = new mongoose.Schema(
  {
    courierName: { type: String, required: true },
    courierCondition: { type: String },
    address: {
      division: { type: String, required: true },
      district: { type: String, required: true },
      upazilla: { type: String, required: true },
      location: { type: String, required: true },
    },
    branchName: { type: String, required: true },
    branchId: { type: String },
    branchCode: { type: String },
    mobileNumbers: { type: String, unique: true },
  },
  {
    collection: "Courier List",
  }
);

const CourierInfo =
  mongoose.models.CourierInfo ||
  mongoose.model("CourierInfo", courierInfoSchema);

export default CourierInfo;
