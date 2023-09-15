import mongoose, { Schema } from "mongoose";

const suricataSchema = new Schema({
  generator_id: String,
  signature_id: String,
  signature_rev_id: String,
  description: String,
  classification: String,
  priority: String,
  protocol: String,
  src_addr: String,
  src_port: String,
  dest_addr: String,
  dest_port: String,
  time: Date,
},
{
  collection: "Suricata",
});

const Suricata = mongoose.models.Suricata || mongoose.model("Suricata", suricataSchema);

export default Suricata;