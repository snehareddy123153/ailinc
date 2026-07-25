import mongoose, { type Document, type Model, Schema } from "mongoose";

export interface ITrainer extends Document {
  name: string;
  title: string;
  category: string;
  bio: string;
  expertise: string[];
  experience: string;
  availability: string;
  rating: number;
  sessionsCompleted: number;
  imageUrl: string | null;
  linkedin: string | null;
  featured: boolean;
  createdAt: Date;
}

const TrainerSchema = new Schema<ITrainer>(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    bio: { type: String, required: true },
    expertise: [{ type: String }],
    experience: { type: String, default: "" },
    availability: { type: String, required: true },
    rating: { type: Number, default: 5.0 },
    sessionsCompleted: { type: Number, default: 0 },
    imageUrl: { type: String, default: null },
    linkedin: { type: String, default: null },
    featured: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export const Trainer: Model<ITrainer> = mongoose.model<ITrainer>(
  "Trainer",
  TrainerSchema,
);
