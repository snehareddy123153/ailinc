import { Router, type IRouter } from "express";
import healthRouter from "./health";
import trainingProgramsRouter from "./training-programs";
import trainersRouter from "./trainers";
import inquiriesRouter from "./inquiries";
import statsRouter from "./stats";
import authRouter from "./auth";
import adminRouter from "./admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use(trainingProgramsRouter);
router.use(trainersRouter);
router.use(inquiriesRouter);
router.use(statsRouter);
router.use(authRouter);
router.use(adminRouter);

export default router;
