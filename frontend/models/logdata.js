import mongoose, { Schema } from "mongoose";

const logDataSchema = new Schema(
  {},
  {
    collection: "Aggregated_collection",
    strict: false,
  }
);

const LogData =
  mongoose.models.LogData || mongoose.model("LogData", logDataSchema);

export default LogData;
