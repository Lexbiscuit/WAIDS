import mongoose, { Schema } from "mongoose";

const investigationSchema = new Schema(
  {
    suricata: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Suricata",
    },
    creator: String,
    description: String,
    investigation_status: String,
  },
  {
    collection: "Investigation",
  }
);

const Investigation =
  mongoose.models.Investigation ||
  mongoose.model("Investigation", investigationSchema);

export default Investigation;
