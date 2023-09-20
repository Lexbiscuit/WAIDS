import mongoose, { Schema } from "mongoose";

const suricataSchema = new Schema({
  generator_id: Number,
  signature_id: Number,
  signature_rev_id: Number,
  description: String,
  classification: String,
  priority: Number,
  protocol: Number,
  src_addr: String,
  src_port: Number,
  dest_addr: String,
  dest_port: Number,
  timestamp: Date,
},
{
  collection: "Suricata",
});

const Suricata = mongoose.models.Suricata || mongoose.model("Suricata", suricataSchema);

export default Suricata;