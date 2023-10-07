import mongoose, { Schema } from "mongoose";

const suricataSchema = new Schema(
  {
    timestamp: Date,
  },
  { collection: "Suricata" },
);

const Suricata =
  mongoose.models.Suricata || mongoose.model("Suricata", suricataSchema);

export default Suricata;

// const alertSchema = new Schema(
//   {
//     flow_id: Number,
//     in_iface: String,
//     event_type: String,
//     src_ip: String,
//     src_port: Number,
//     dest_ip: String,
//     dest_port: Number,
//     proto: String,
//     pkt_src: String,
//     metadata: Object,
//     alert: Object,
//     tls: Object,
//     http: Object,
//     files: Object,
//     app_proto: String,
//     direction: String,
//     flow: Object,
//     timestamp: Date,
//   },
//   { collection: "Suricata" },
// );
//
// const Alert = mongoose.models.Alert || mongoose.model("Alert", alertSchema);
//
// const anomalySchema = new Schema(
//   {
//     flow_id: Number,
//     in_iface: String,
//     event_type: String,
//     src_ip: String,
//     src_port: Number,
//     dest_ip: String,
//     dest_port: Number,
//     proto: String,
//     pkt_src: String,
//     metadata: Object,
//     anomaly: Object,
//     timestamp: Date,
//   },
//   { collection: "Suricata" },
// );
//
// const Anomaly =
//   mongoose.models.Anomaly || mongoose.model("Anomaly", anomalySchema);
//
// const dnsSchema = new Schema(
//   {
//     flow_id: Number,
//     in_iface: String,
//     event_type: String,
//     src_ip: String,
//     src_port: Number,
//     dest_ip: String,
//     dest_port: Number,
//     proto: String,
//     pkt_src: String,
//     dns: Object,
//     timestamp: Date,
//   },
//   { collection: "Suricata" },
// );
//
// const Dns = mongoose.models.Dns || mongoose.model("Dns", dnsSchema);
//
// const fileinfoSchema = new Schema(
//   {
//     flow_id: Number,
//     in_iface: String,
//     event_type: String,
//     src_ip: String,
//     src_port: Number,
//     dest_ip: String,
//     dest_port: Number,
//     proto: String,
//     pkt_src: String,
//     http: Object,
//     app_proto: String,
//     fileinfo: Object,
//     timestamp: Date,
//   },
//   { collection: "Suricata" },
// );
//
// const Fileinfo =
//   mongoose.models.Fileinfo || mongoose.model("Fileinfo", fileinfoSchema);
//
// const flowSchema = new Schema(
//   {
//     flow_id: Number,
//     in_iface: String,
//     event_type: String,
//     src_ip: String,
//     src_port: Number,
//     dest_ip: String,
//     dest_port: Number,
//     proto: String,
//     app_proto: String,
//     icmp_type: Number,
//     icmp_code: Number,
//     response_icmp_type: Number,
//     response_icmp_code: Number,
//     flow: Object,
//     timestamp: Date,
//   },
//   { collection: "Suricata" },
// );
//
// const Flow = mongoose.models.Flow || mongoose.model("Flow", flowSchema);
//
// const httpSchema = new Schema(
//   {
//     flow_id: Number,
//     in_iface: String,
//     event_type: String,
//     src_ip: String,
//     src_port: Number,
//     dest_ip: String,
//     dest_port: Number,
//     proto: String,
//     pkt_src: String,
//     tx_id: Number,
//     http: Object,
//     timestamp: Date,
//   },
//   { collection: "Suricata" },
// );
//
// const Http = mongoose.models.Http || mongoose.model("Http", httpSchema);
//
// const quicSchema = new Schema(
//   {
//     flow_id: Number,
//     in_iface: String,
//     event_type: String,
//     src_ip: String,
//     src_port: Number,
//     dest_ip: String,
//     dest_port: Number,
//     proto: String,
//     pkt_src: String,
//     quic: Object,
//     timestamp: Date,
//   },
//   { collection: "Suricata" },
// );
//
// const Quic = mongoose.models.Quic || mongoose.model("Quic", quicSchema);
//
// const statsSchema = new Schema(
//   {
//     event_type: String,
//     stats: Object,
//     timestamp: Date,
//   },
//   { collection: "Suricata" },
// );
//
// const Stats = mongoose.models.Stats || mongoose.model("Stats", statsSchema);
//
// const tlsSchema = new Schema(
//   {
//     flow_id: Number,
//     in_iface: String,
//     event_type: String,
//     src_ip: String,
//     src_port: Number,
//     dest_ip: String,
//     dest_port: Number,
//     proto: String,
//     pkt_src: String,
//     tls: Object,
//     timestamp: Date,
//   },
//   { collection: "Suricata" },
// );
//
// const Tls = mongoose.models.Tls || mongoose.model("Tls", tlsSchema);
//
// export { Alert, Anomaly, Dns, Fileinfo, Flow, Http, Quic, Stats, Tls };
