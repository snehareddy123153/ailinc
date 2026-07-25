import mongoose, { type Document, type Model, Schema } from "mongoose";

export interface IInquiry extends Document {
  name: string;
  email: string;
  company: string;
  type: string;
  message: string;
  phone: string | null;
  status: string;
  createdAt: Date;
}

const InquirySchema = new Schema<IInquiry>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ["Corporate Training", "Trainer Request", "General"],
      default: "General",
    },
    message: { type: String, required: true },
    phone: { type: String, default: null },
    status: {
      type: String,
      enum: ["pending", "reviewed", "responded"],
      default: "pending",
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export const Inquiry: Model<IInquiry> = mongoose.model<IInquiry>(
  "Inquiry",
  InquirySchema,
);
