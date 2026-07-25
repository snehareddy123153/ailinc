import { Router, type IRouter } from "express";
import { Inquiry } from "../models/Inquiry";
import { SubmitInquiryBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/inquiries", async (_req, res): Promise<void> => {
  const inquiries = await Inquiry.find().sort({ createdAt: -1 });
  res.json(
    inquiries.map((i) => ({
      id: i._id.toString(),
      name: i.name,
      email: i.email,
      company: i.company,
      type: i.type,
      message: i.message,
      phone: i.phone ?? null,
      status: i.status,
      createdAt: i.createdAt.toISOString(),
    })),
  );
});

router.post("/inquiries", async (req, res): Promise<void> => {
  const parsed = SubmitInquiryBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const inquiry = await Inquiry.create(parsed.data);
  res.status(201).json({
    id: inquiry._id.toString(),
    name: inquiry.name,
    email: inquiry.email,
    company: inquiry.company,
    type: inquiry.type,
    message: inquiry.message,
    phone: inquiry.phone ?? null,
    status: inquiry.status,
    createdAt: inquiry.createdAt.toISOString(),
  });
});

export default router;
