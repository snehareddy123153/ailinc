import { Router, type IRouter } from "express";
import { TrainingProgram } from "../models/TrainingProgram";
import { Trainer } from "../models/Trainer";
import { Inquiry } from "../models/Inquiry";

const router: IRouter = Router();

router.get("/stats", async (_req, res): Promise<void> => {
  const [
    totalTrainers,
    totalPrograms,
    totalInquiries,
    featuredTrainers,
    featuredPrograms,
    trainerCategoryAgg,
  ] = await Promise.all([
    Trainer.countDocuments(),
    TrainingProgram.countDocuments(),
    Inquiry.countDocuments(),
    Trainer.countDocuments({ featured: true }),
    TrainingProgram.countDocuments({ featured: true }),
    Trainer.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]),
  ]);

  res.json({
    totalTrainers,
    totalPrograms,
    totalInquiries,
    featuredTrainers,
    featuredPrograms,
    trainerCategories: trainerCategoryAgg.map((t) => ({
      category: t._id as string,
      count: t.count as number,
    })),
  });
});

export default router;
