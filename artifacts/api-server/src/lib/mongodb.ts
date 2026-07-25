import mongoose from "mongoose";
import { logger } from "./logger";

const MONGODB_URI =
  process.env["MONGODB_URI"] ||
  "mongodb://localhost:27017/ailinc_corporate";

export async function connectMongoDB(): Promise<void> {
  const safeUri = MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, "//***:***@");
  logger.info({ uri: safeUri }, "Connecting to MongoDB...");

  let lastErr: unknown;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      await mongoose.connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 10000,
        connectTimeoutMS: 10000,
      });
      logger.info({ uri: safeUri }, "MongoDB connected");
      return;
    } catch (err) {
      lastErr = err;
      logger.warn({ err, attempt }, `MongoDB connection attempt ${attempt} failed — retrying...`);
      if (attempt < 3) await new Promise((r) => setTimeout(r, 2000 * attempt));
    }
  }
  logger.error({ err: lastErr }, "MongoDB connection failed after 3 attempts — API will return empty data");
  // Don't throw: let the server start anyway so the frontend loads
}

export async function disconnectMongoDB(): Promise<void> {
  await mongoose.disconnect();
  logger.info("MongoDB disconnected");
}
