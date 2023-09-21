import mongoose, { Schema } from "mongoose";

const quoteSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    subscription: String,
    accounts: Number
},
{
  collection: "Quote",
});

const Quote = mongoose.models.Quote || mongoose.model("Quote", quoteSchema);

export default Quote;