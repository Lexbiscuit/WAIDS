import mongoose, { Schema } from "mongoose";

const idssourceSchema = new Schema(
  {
    name: String,
    isEnabled: Boolean,
  },
  {
    collection: "IdsSource",
  }
);

const IdsSource =
  mongoose.models.IdsSource || mongoose.model("IdsSource", idssourceSchema);

export default IdsSource;
