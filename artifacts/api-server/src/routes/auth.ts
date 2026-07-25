import { Router, type IRouter } from "express";
import { User } from "../models/User";

const router: IRouter = Router();

// Helper to format user payload safely (omitting password hash)
function formatUser(user: any) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    company: user.company || "",
    phone: user.phone || "",
    enrolledCourses: user.enrolledCourses || [],
    enrollmentStatus: user.enrollmentStatus,
    adminNotes: user.adminNotes || "",
    createdAt: user.createdAt.toISOString(),
  };
}

router.post("/auth/register", async (req, res): Promise<void> => {
  const { name, email, password, company, phone } = req.body || {};
  try {
    if (!name || !email || !password) {
      res.status(400).json({ error: "Name, email, and password are required." });
      return;
    }

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      res.status(409).json({ error: "An account with this email already exists." });
      return;
    }

    // In a production app, use bcrypt hash. Here plain match for simplicity & rapid demo
    const user = await User.create({
      name,
      email: email.toLowerCase().trim(),
      passwordHash: password,
      role: "student",
      company: company || "",
      phone: phone || "",
      enrollmentStatus: "new",
      enrolledCourses: [],
    });

    res.status(201).json({
      message: "Registration successful",
      user: formatUser(user),
    });
  } catch (err: any) {
    if (err.code === 11000) {
      if (err.message?.includes("username")) {
        try {
          await User.collection.dropIndex("username_1");
          // Retry insertion once after dropping legacy index
          const user = await User.create({
            name,
            email: email.toLowerCase().trim(),
            passwordHash: password,
            role: "student",
            company: company || "",
            phone: phone || "",
            enrollmentStatus: "new",
            enrolledCourses: [],
          });
          res.status(201).json({
            message: "Registration successful",
            user: formatUser(user),
          });
          return;
        } catch (retryErr: any) {
          res.status(500).json({ error: retryErr.message || "Failed to register user" });
          return;
        }
      }
      res.status(409).json({ error: "An account with this email already exists." });
      return;
    }
    res.status(500).json({ error: err.message || "Failed to register user" });
  }
});

router.post("/auth/login", async (req, res): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required." });
      return;
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user || user.passwordHash !== password) {
      res.status(401).json({ error: "Invalid email or password." });
      return;
    }

    res.json({
      message: "Login successful",
      user: formatUser(user),
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to log in" });
  }
});

export default router;
