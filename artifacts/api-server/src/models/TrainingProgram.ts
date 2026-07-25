import mongoose, { type Document, type Model, Schema } from "mongoose";

export interface ITrainingProgram extends Document {
  title: string;
  description: string;
  category: string;
  duration: string;
  level: string;
  outcomes: string[];
  benefits: string[];
  imageUrl: string | null;
  featured: boolean;
  createdAt: Date;
}

const TrainingProgramSchema = new Schema<ITrainingProgram>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    duration: { type: String, required: true },
    level: { type: String, default: "Intermediate" },
    outcomes: [{ type: String }],
    benefits: [{ type: String }],
    imageUrl: { type: String, default: null },
    featured: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export const TrainingProgram: Model<ITrainingProgram> = mongoose.model<ITrainingProgram>(
  "TrainingProgram",
  TrainingProgramSchema,
);
