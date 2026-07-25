import { Router, type IRouter } from "express";
import { User } from "../models/User";
import { Inquiry } from "../models/Inquiry";

const router: IRouter = Router();

function formatStudent(user: any) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    company: user.company || "Independent",
    phone: user.phone || "N/A",
    enrolledCourses: user.enrolledCourses || [],
    enrollmentStatus: user.enrollmentStatus,
    adminNotes: user.adminNotes || "",
    createdAt: user.createdAt.toISOString(),
  };
}

// GET /api/admin/students
router.get("/admin/students", async (req, res): Promise<void> => {
  try {
    const { search, status } = req.query;
    const filter: Record<string, unknown> = { role: "student" };

    if (status && status !== "all") {
      filter["enrollmentStatus"] = status;
    }

    if (search) {
      const searchRegex = new RegExp(String(search), "i");
      filter["$or"] = [
        { name: searchRegex },
        { email: searchRegex },
        { company: searchRegex },
      ];
    }

    const students = await User.find(filter).sort({ createdAt: -1 });
    res.json(students.map(formatStudent));
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to fetch students" });
  }
});

// PATCH /api/admin/students/:id
router.patch("/admin/students/:id", async (req, res): Promise<void> => {
  try {
    const { id } = req.params;
    const { enrollmentStatus, enrolledCourses, adminNotes } = req.body;

    const student = await User.findById(id);
    if (!student) {
      res.status(404).json({ error: "Student not found" });
      return;
    }

    if (enrollmentStatus) student.enrollmentStatus = enrollmentStatus;
    if (Array.isArray(enrolledCourses)) student.enrolledCourses = enrolledCourses;
    if (typeof adminNotes === "string") student.adminNotes = adminNotes;

    await student.save();

    res.json({
      message: "Student updated successfully",
      student: formatStudent(student),
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to update student" });
  }
});

// GET /api/admin/dashboard-stats
router.get("/admin/dashboard-stats", async (_req, res): Promise<void> => {
  try {
    const totalStudents = await User.countDocuments({ role: "student" });
    const newStudents = await User.countDocuments({ role: "student", enrollmentStatus: "new" });
    const contactedStudents = await User.countDocuments({ role: "student", enrollmentStatus: "contacted" });
    const enrolledStudents = await User.countDocuments({ role: "student", enrollmentStatus: "enrolled" });
    const totalInquiries = await Inquiry.countDocuments();

    res.json({
      totalStudents,
      newStudents,
      contactedStudents,
      enrolledStudents,
      totalInquiries,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to fetch admin stats" });
  }
});

export default router;
