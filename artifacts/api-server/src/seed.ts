import { connectMongoDB, disconnectMongoDB } from "./lib/mongodb";
import { TrainingProgram } from "./models/TrainingProgram";
import { Trainer } from "./models/Trainer";
import { Inquiry } from "./models/Inquiry";
import { logger } from "./lib/logger";

const trainingPrograms = [
  {
    title: "AI Foundations for Enterprise",
    description:
      "A comprehensive introduction to Artificial Intelligence concepts tailored for corporate leaders and teams. Covers ML basics, AI strategy, and practical use-case identification.",
    category: "Foundations",
    duration: "3 days",
    level: "Beginner",
    outcomes: [
      "Understand core AI and ML concepts",
      "Identify AI opportunities in your organization",
      "Build an AI adoption roadmap",
      "Communicate effectively with technical teams",
    ],
    benefits: [
      "Accelerate AI adoption company-wide",
      "Reduce costly misalignment between business and tech",
      "Build AI-ready culture",
      "Increase ROI on AI investments",
    ],
    featured: true,
  },
  {
    title: "Generative AI for Business Leaders",
    description:
      "Hands-on training in LLMs, prompt engineering, and generative AI tools. Designed for executives and managers looking to leverage GenAI for competitive advantage.",
    category: "Generative AI",
    duration: "2 days",
    level: "Intermediate",
    outcomes: [
      "Master prompt engineering techniques",
      "Evaluate GenAI tools for enterprise use",
      "Design AI-augmented workflows",
      "Manage GenAI risk and governance",
    ],
    benefits: [
      "Cut operational costs with AI automation",
      "Unlock new revenue streams",
      "Stay ahead of competitors",
      "Ensure responsible AI use",
    ],
    featured: true,
  },
  {
    title: "Machine Learning Operations (MLOps)",
    description:
      "End-to-end training on deploying, monitoring, and scaling ML models in production. For data teams and engineering leaders.",
    category: "MLOps",
    duration: "5 days",
    level: "Advanced",
    outcomes: [
      "Build robust ML pipelines",
      "Implement model monitoring and drift detection",
      "Automate model retraining",
      "Scale ML infrastructure cost-effectively",
    ],
    benefits: [
      "Faster time-to-production for models",
      "Reduce model failure incidents",
      "Lower infrastructure costs",
      "Build repeatable ML delivery",
    ],
    featured: false,
  },
  {
    title: "AI Ethics and Responsible AI",
    description:
      "Critical training on building fair, transparent, and accountable AI systems. Covers bias mitigation, explainability, and regulatory compliance.",
    category: "Ethics & Governance",
    duration: "1 day",
    level: "All Levels",
    outcomes: [
      "Identify and mitigate algorithmic bias",
      "Implement explainable AI techniques",
      "Navigate AI regulatory frameworks",
      "Build AI governance structures",
    ],
    benefits: [
      "Reduce regulatory and reputational risk",
      "Build stakeholder trust",
      "Future-proof AI investments",
      "Align with global AI standards",
    ],
    featured: false,
  },
  {
    title: "Natural Language Processing for Enterprises",
    description:
      "Applied NLP training covering text analytics, document intelligence, chatbot development, and sentiment analysis at scale.",
    category: "NLP",
    duration: "3 days",
    level: "Intermediate",
    outcomes: [
      "Process and analyze large text datasets",
      "Build customer-facing NLP applications",
      "Extract insights from unstructured data",
      "Integrate NLP into existing workflows",
    ],
    benefits: [
      "Automate document-heavy processes",
      "Improve customer experience",
      "Surface hidden business intelligence",
      "Reduce manual data processing",
    ],
    featured: true,
  },
];

const trainers = [
  {
    name: "Dr. Priya Sharma",
    title: "AI Strategy Consultant",
    category: "AI Strategy",
    bio: "Former Chief AI Officer at a Fortune 500 company with 15 years of experience implementing AI transformation programs across healthcare, finance, and retail sectors.",
    expertise: ["AI Strategy", "Digital Transformation", "Executive Coaching", "AI Governance"],
    experience: "15 years",
    availability: "On-Demand",
    rating: 4.9,
    sessionsCompleted: 312,
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    featured: true,
  },
  {
    name: "Marcus Chen",
    title: "Senior ML Engineer & Trainer",
    category: "Machine Learning",
    bio: "PhD in Machine Learning from Stanford. Previously led ML teams at Google and Uber. Specializes in translating complex ML concepts into actionable enterprise training.",
    expertise: ["Deep Learning", "MLOps", "Computer Vision", "TensorFlow", "PyTorch"],
    experience: "12 years",
    availability: "On-Demand",
    rating: 4.8,
    sessionsCompleted: 245,
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    featured: true,
  },
  {
    name: "Aisha Okonkwo",
    title: "Generative AI Specialist",
    category: "Generative AI",
    bio: "Pioneer in enterprise LLM adoption with hands-on experience deploying GPT and Claude across banking, legal, and media industries. Regular speaker at AI conferences.",
    expertise: ["LLMs", "Prompt Engineering", "RAG Systems", "AI Product Management"],
    experience: "8 years",
    availability: "On-Demand",
    rating: 4.9,
    sessionsCompleted: 189,
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
    featured: true,
  },
  {
    name: "Dr. James Thornton",
    title: "AI Ethics Researcher",
    category: "Ethics & Governance",
    bio: "Leading expert in responsible AI with academic appointments at MIT and Cambridge. Advises governments and corporations on AI policy and ethical frameworks.",
    expertise: ["AI Ethics", "Algorithmic Fairness", "AI Policy", "Risk Management"],
    experience: "10 years",
    availability: "On-Demand",
    rating: 4.7,
    sessionsCompleted: 134,
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    featured: false,
  },
  {
    name: "Riya Patel",
    title: "NLP & Data Science Lead",
    category: "NLP",
    bio: "10+ years in Natural Language Processing and computational linguistics. Built NLP systems used by millions at Amazon and Microsoft before transitioning to enterprise training.",
    expertise: ["NLP", "Text Analytics", "BERT/GPT Fine-tuning", "Information Extraction"],
    experience: "10 years",
    availability: "On-Demand",
    rating: 4.8,
    sessionsCompleted: 201,
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
    featured: true,
  },
  {
    name: "Carlos Mendez",
    title: "MLOps & Cloud AI Architect",
    category: "MLOps",
    bio: "AWS and GCP certified architect with deep expertise in building production ML infrastructure. Helped 50+ enterprises move from ML prototypes to scalable production systems.",
    expertise: ["MLOps", "AWS SageMaker", "GCP Vertex AI", "Kubernetes", "CI/CD for ML"],
    experience: "9 years",
    availability: "On-Demand",
    rating: 4.7,
    sessionsCompleted: 167,
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
    featured: false,
  },
];

import { User } from "./models/User";

const sampleUsers = [
  {
    name: "AI Linc Administrator",
    email: "admin@ailinc.com",
    passwordHash: "admin123",
    role: "admin",
    company: "AI Linc Corporate",
    phone: "+1 (800) 555-0199",
    enrollmentStatus: "enrolled",
    enrolledCourses: [],
    adminNotes: "System administrator account",
  },
  {
    name: "Rahul Sharma",
    email: "rahul@techcorp.com",
    passwordHash: "student123",
    role: "student",
    company: "TechCorp Systems",
    phone: "+1 (555) 234-5678",
    enrollmentStatus: "new",
    enrolledCourses: [],
    adminNotes: "Registered via corporate portal. Needs introductory call.",
  },
  {
    name: "Elena Rostova",
    email: "elena@innovate.io",
    passwordHash: "student123",
    role: "student",
    company: "Innovate Labs",
    phone: "+1 (555) 876-5432",
    enrollmentStatus: "contacted",
    enrolledCourses: [],
    adminNotes: "Spoke on phone. Requesting custom Generative AI workshop for 15 lead engineers.",
  },
  {
    name: "Marcus Vance",
    email: "marcus@globalbank.org",
    passwordHash: "student123",
    role: "student",
    company: "Global Bank",
    phone: "+1 (555) 345-6789",
    enrollmentStatus: "enrolled",
    enrolledCourses: ["AI Foundations for Enterprise"],
    adminNotes: "Enrolled in Q3 Enterprise Batch. Invoice paid.",
  },
  {
    name: "Sophia Lin",
    email: "sophia@datasolutions.com",
    passwordHash: "student123",
    role: "student",
    company: "Data Solutions Inc",
    phone: "+1 (555) 901-2345",
    enrollmentStatus: "new",
    enrolledCourses: [],
    adminNotes: "Inquired about MLOps curriculum.",
  },
];

async function seed(): Promise<void> {
  await connectMongoDB();

  // Clear existing
  await Promise.all([
    TrainingProgram.deleteMany({}),
    Trainer.deleteMany({}),
    Inquiry.deleteMany({}),
    User.deleteMany({}),
  ]);

  // Insert seed data
  await Promise.all([
    TrainingProgram.insertMany(trainingPrograms),
    Trainer.insertMany(trainers),
    User.insertMany(sampleUsers),
  ]);

  logger.info(
    {
      programs: trainingPrograms.length,
      trainers: trainers.length,
      users: sampleUsers.length,
    },
    "Seeded database successfully",
  );

  await disconnectMongoDB();
}

seed().catch((err) => {
  logger.error({ err }, "Seed failed");
  process.exit(1);
});
