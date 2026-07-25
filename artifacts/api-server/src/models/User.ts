import mongoose, { type Document, type Model, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: "student" | "admin";
  company?: string;
  phone?: string;
  enrolledCourses: string[];
  enrollmentStatus: "new" | "contacted" | "enrolled" | "inactive";
  adminNotes?: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["student", "admin"], default: "student" },
    company: { type: String, default: "" },
    phone: { type: String, default: "" },
    enrolledCourses: [{ type: String }],
    enrollmentStatus: {
      type: String,
      enum: ["new", "contacted", "enrolled", "inactive"],
      default: "new",
    },
    adminNotes: { type: String, default: "" },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
