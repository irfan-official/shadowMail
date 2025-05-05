import mongoose from "mongoose";

const emailSchema = new mongoose.Schema(
  {
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    html: {
      type: String,
    },
    type: {
      type: String,
      enum: ["sent", "receive"],
      default: ["sent"],
    },
    date: {
      type: Date,
    },
    raw: {
      type: String,
    },
  },
  { timestamps: true }
);

const Email = mongoose.model("Email", emailSchema);

export default Email;
