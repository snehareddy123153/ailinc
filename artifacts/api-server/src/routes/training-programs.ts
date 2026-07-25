import { Router, type IRouter } from "express";
import { TrainingProgram } from "../models/TrainingProgram";
import {
  CreateTrainingProgramBody,
  GetTrainingProgramParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/training-programs", async (req, res): Promise<void> => {
  const programs = await TrainingProgram.find().sort({ createdAt: -1 });
  res.json(
    programs.map((p) => ({
      id: p._id.toString(),
      title: p.title,
      description: p.description,
      category: p.category,
      duration: p.duration,
      level: p.level,
      outcomes: p.outcomes,
      benefits: p.benefits,
      imageUrl: p.imageUrl ?? null,
      featured: p.featured,
      createdAt: p.createdAt.toISOString(),
    })),
  );
});

router.get("/training-programs/:id", async (req, res): Promise<void> => {
  const params = GetTrainingProgramParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const program = await TrainingProgram.findById(params.data.id).catch(
    () => null,
  );
  if (!program) {
    res.status(404).json({ error: "Training program not found" });
    return;
  }

  res.json({
    id: program._id.toString(),
    title: program.title,
    description: program.description,
    category: program.category,
    duration: program.duration,
    level: program.level,
    outcomes: program.outcomes,
    benefits: program.benefits,
    imageUrl: program.imageUrl ?? null,
    featured: program.featured,
    createdAt: program.createdAt.toISOString(),
  });
});

router.post("/training-programs", async (req, res): Promise<void> => {
  const parsed = CreateTrainingProgramBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const program = await TrainingProgram.create(parsed.data);
  res.status(201).json({
    id: program._id.toString(),
    title: program.title,
    description: program.description,
    category: program.category,
    duration: program.duration,
    level: program.level,
    outcomes: program.outcomes,
    benefits: program.benefits,
    imageUrl: program.imageUrl ?? null,
    featured: program.featured,
    createdAt: program.createdAt.toISOString(),
  });
});

export default router;
