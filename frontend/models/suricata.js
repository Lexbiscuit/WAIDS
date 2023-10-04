import mongoose, { Schema } from "mongoose";

// const suricataSchema = new Schema({
//   generator_id: Number,
//   signature_id: Number,
//   signature_rev_id: Number,
//   description: String,
//   classification: String,
//   priority: Number,
//   protocol: Number,
//   src_addr: String,
//   src_port: Number,
//   dest_addr: String,
//   dest_port: Number,
//   timestamp: Date,
// },
// {
//   collection: "Suricata",
// });
//
// const Suricata = mongoose.models.Suricata || mongoose.model("Suricata", suricataSchema);
//
// export default Suricata;

const alertSchema = new Schema(
  {
    flow_id: Number,
    in_iface: String,
    event_type: String,
    src_ip: String,
    src_port: Number,
    dest_ip: String,
    dest_port: Number,
    proto: String,
    pkt_src: String,
    alert: Object,
    http: Object,
    files: Object,
    app_proto: String,
    direction: String,
    flow: Object,
    timestamp: Date,
  },
  { collection: "Suricata" },
);

const Alert = mongoose.models.Alert || mongoose.model("Alert", alertSchema);

const anomalySchema = new Schema(
  {
    flow_id: Number,
    in_iface: String,
    event_type: String,
    src_ip: String,
    src_port: Number,
    dest_ip: String,
    dest_port: Number,
    proto: String,
    pkt_src: String,
    metadata: Object,
    anomaly: Object,
    timestamp: Date,
  },
  { collection: "Suricata" },
);

const Anomaly =
  mongoose.models.Anomaly || mongoose.model("Anomaly", anomalySchema);

export { Alert, Anomaly };
