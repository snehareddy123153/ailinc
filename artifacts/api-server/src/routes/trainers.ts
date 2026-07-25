import { Router, type IRouter } from "express";
import { Trainer } from "../models/Trainer";
import {
  CreateTrainerBody,
  GetTrainerParams,
  ListTrainersQueryParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/trainers", async (req, res): Promise<void> => {
  const query = ListTrainersQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: query.error.message });
    return;
  }

  const filter: Record<string, unknown> = {};
  if (query.data.category) {
    filter["category"] = query.data.category;
  }

  const trainers = await Trainer.find(filter).sort({ featured: -1, createdAt: -1 });
  res.json(
    trainers.map((t) => ({
      id: t._id.toString(),
      name: t.name,
      title: t.title,
      category: t.category,
      bio: t.bio,
      expertise: t.expertise,
      experience: t.experience,
      availability: t.availability,
      rating: t.rating,
      sessionsCompleted: t.sessionsCompleted,
      imageUrl: t.imageUrl ?? null,
      linkedin: t.linkedin ?? null,
      featured: t.featured,
      createdAt: t.createdAt.toISOString(),
    })),
  );
});

router.get("/trainers/:id", async (req, res): Promise<void> => {
  const params = GetTrainerParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const trainer = await Trainer.findById(params.data.id).catch(() => null);
  if (!trainer) {
    res.status(404).json({ error: "Trainer not found" });
    return;
  }

  res.json({
    id: trainer._id.toString(),
    name: trainer.name,
    title: trainer.title,
    category: trainer.category,
    bio: trainer.bio,
    expertise: trainer.expertise,
    experience: trainer.experience,
    availability: trainer.availability,
    rating: trainer.rating,
    sessionsCompleted: trainer.sessionsCompleted,
    imageUrl: trainer.imageUrl ?? null,
    linkedin: trainer.linkedin ?? null,
    featured: trainer.featured,
    createdAt: trainer.createdAt.toISOString(),
  });
});

router.post("/trainers", async (req, res): Promise<void> => {
  const parsed = CreateTrainerBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const trainer = await Trainer.create(parsed.data);
  res.status(201).json({
    id: trainer._id.toString(),
    name: trainer.name,
    title: trainer.title,
    category: trainer.category,
    bio: trainer.bio,
    expertise: trainer.expertise,
    experience: trainer.experience,
    availability: trainer.availability,
    rating: trainer.rating,
    sessionsCompleted: trainer.sessionsCompleted,
    imageUrl: trainer.imageUrl ?? null,
    linkedin: trainer.linkedin ?? null,
    featured: trainer.featured,
    createdAt: trainer.createdAt.toISOString(),
  });
});

export default router;
