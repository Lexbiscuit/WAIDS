import mongoose, { Schema } from "mongoose";

const supportSchema = new Schema({
    name: String,
    email: String,
    message: String,
},
{
  collection: "Support",
});

const Support = mongoose.models.Support || mongoose.model("Support", supportSchema);

export default Support;