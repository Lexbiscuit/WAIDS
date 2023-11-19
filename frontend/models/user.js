import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    // password: { type: String, required: true },
    // passwordHistory: [{
    //   password: String,
    //   setAt: { type: Date, default: Date.now }
    // }],
    role: {
      type: String,
      enum: [
        "System Administrator",
        "Network Administrator",
        "SOC Analyst",
        "IR Team",
        "IT Manager",
        "Security Auditor",
      ],
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "suspended"],
      default: "active",
    },
    widgets: [],
    charts: [],
  },
  {
    collection: "Users",
  },
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
