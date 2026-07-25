# AI LINC Corporate Portal 🚀

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen.svg)](https://nodejs.org/)
[![pnpm Version](https://img.shields.io/badge/pnpm-%3E%3D9.0.0-blue.svg)](https://pnpm.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A modern full-stack corporate portal and enterprise management platform for **AI LINC** (corporate.ailinc.com). The platform showcases corporate AI training programs, connects enterprises with on-demand AI industry experts, and provides a student enrollment and admin management portal.

---

## 🏗️ Architecture & Tech Stack

This project is organized as a high-performance **pnpm monorepo**:

* **Frontend (`artifacts/corporate-portal`)**:
  * **Framework**: React 18 + Vite
  * **Styling**: Tailwind CSS, Radix UI / Shadcn UI components, Lucide Icons, Framer Motion
  * **State & Data Fetching**: TanStack React Query, Wouter router
* **Backend (`artifacts/api-server`)**:
  * **Runtime**: Node.js 20+ (ESM modules)
  * **Framework**: Express 5
  * **Database & ODM**: MongoDB Atlas via Mongoose
  * **Bundler & Logger**: esbuild, Pino HTTP logger
* **Shared Libraries (`lib/`)**:
  * **`lib/api-spec`**: OpenAPI 3.1 specification single source of truth
  * **`lib/api-client-react`**: Auto-generated React Query hooks and custom fetch client (via Orval)
  * **`lib/api-zod`**: Auto-generated Zod request/response validation schemas

---

## 📁 Repository Layout

```text
.
├── artifacts/
│   ├── api-server/           # Express 5 Node.js backend server
│   │   ├── src/
│   │   │   ├── models/       # Mongoose models (User, Trainer, TrainingProgram, Inquiry)
│   │   │   ├── routes/       # Express route handlers (auth, admin, trainers, programs, inquiries)
│   │   │   ├── lib/          # MongoDB connection & Pino logger
│   │   │   └── seed.ts       # Database initial seed script
│   │   └── package.json
│   └── corporate-portal/     # React 18 + Vite frontend web portal
│       ├── public/           # Static assets & SPA _redirects configuration
│       ├── src/
│       │   ├── pages/        # Route pages (Home, Training, Trainers, Contact, Auth, Admin)
│       │   ├── components/   # UI components & layout shell
│       │   └── lib/          # Auth context & utility helpers
│       └── package.json
├── lib/
│   ├── api-spec/             # openapi.yaml schema definition
│   ├── api-client-react/     # Generated React Query hooks & custom fetcher
│   └── api-zod/              # Generated Zod validation schemas
├── package.json              # Monorepo root package.json
└── pnpm-workspace.yaml       # pnpm workspace configuration
```

---

## ⚡ Prerequisites

Make sure you have the following installed on your machine:

- **Node.js**: `v20.0.0` or higher
- **pnpm**: `v9.0.0` or higher (`npm install -g pnpm` or `corepack enable`)
- **MongoDB**: A standard MongoDB Atlas cluster URI or local MongoDB instance

---

## ⚙️ Environment Variables Setup

### 1. API Server Environment (`artifacts/api-server/.env`)
Create a `.env` file inside `artifacts/api-server/`:

```env
PORT=8080
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ailinc_corporate?retryWrites=true&w=majority
NODE_ENV=development
```

### 2. Corporate Portal Environment (`artifacts/corporate-portal/.env`)
Create a `.env` file inside `artifacts/corporate-portal/`:

```env
# Optional for local dev (Vite proxies /api to http://localhost:8080 by default)
VITE_API_URL=http://localhost:8080
```

---

## 🚀 Quick Start & Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/snehareddy123153/ailinc.git
   cd ailinc
   ```

2. **Install all dependencies across the monorepo**:
   ```bash
   pnpm install
   ```

3. **Seed the database (First-time setup)**:
   ```bash
   pnpm --filter @workspace/api-server run seed
   ```

4. **Start local development servers**:
   * **Start API Backend** (runs on `http://localhost:8080`):
     ```bash
     pnpm --filter @workspace/api-server run dev
     ```
   * **Start Corporate Portal** (runs on `http://localhost:5173`):
     ```bash
     pnpm --filter @workspace/corporate-portal run dev
     ```

5. **Typecheck & Build**:
   * Run typecheck across all workspace packages:
     ```bash
     pnpm run typecheck
     ```
   * Build all workspace packages for production:
     ```bash
     pnpm run build
     ```

---

## 🌐 Deployment Instructions

### 1. Deploying Backend API (e.g., Render / Railway Web Service)

* **Build Command**: `npx pnpm --filter @workspace/api-server run build`
* **Start Command**: `node --enable-source-maps artifacts/api-server/dist/index.mjs`
* **Environment Variables**:
  * `MONGODB_URI`: *Your MongoDB connection string*
  * `NODE_ENV`: `production`
  * `PORT`: `8080`

### 2. Deploying Frontend Portal (e.g., Render Static Site / Vercel / Netlify)

* **Framework Preset**: `Vite`
* **Root Directory**: `artifacts/corporate-portal`
* **Build Command**: `npx pnpm --filter @workspace/corporate-portal run build`
* **Publish Directory**: `artifacts/corporate-portal/dist/public`
* **Environment Variable**:
  * `VITE_API_URL`: `https://ailinc.onrender.com` (Your deployed backend API URL)
* **Single Page Application (SPA) Routing**:
  The repository includes `artifacts/corporate-portal/public/_redirects` (`/* /index.html 200`) to ensure client-side routing works on all page refreshes.

---

## 📌 Features & Page Routes

| Route | Name | Description |
| :--- | :--- | :--- |
| `/` | **Home** | Hero section, enterprise stats, featured training programs, and top expert trainers |
| `/training` | **Corporate Training** | Full catalog of enterprise training programs with category filter & outcome metrics |
| `/trainers` | **Industry Experts** | Grid of AI practitioners, category filters, and request trainer submission form |
| `/contact` | **Contact & Inquiries** | Enterprise inquiry form for custom training programs and consulting requests |
| `/login` / `/auth` | **Portal Access** | Student registration & Admin sign-in (Demo quick login buttons included) |
| `/admin` | **Admin Portal** | Dashboard statistics, student enrollment management, status filters, and notes |

---

## 📄 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/healthz` | Server health check endpoint |
| `GET` | `/api/stats` | Global portal statistics |
| `GET` | `/api/training-programs` | List all corporate training programs |
| `GET` | `/api/training-programs/:id` | Get single program details |
| `GET` | `/api/trainers` | List industry expert trainers (supports `?category=`) |
| `GET` | `/api/trainers/:id` | Get single trainer profile |
| `POST` | `/api/inquiries` | Submit corporate inquiry or trainer request |
| `POST` | `/api/auth/register` | Register a new student account |
| `POST` | `/api/auth/login` | Authenticate student or admin account |
| `GET` | `/api/admin/dashboard-stats` | Admin metrics (students count, status breakdown) |
| `GET` | `/api/admin/students` | List all registered students (supports `?status=` & `?search=`) |
| `PATCH` | `/api/admin/students/:id` | Update student status, enrolled courses, and admin notes |

---

## 🛠️ Code Generation

If you modify `lib/api-spec/openapi.yaml`, regenerate the React Query hooks and Zod validation schemas by running:

```bash
pnpm --filter @workspace/api-spec run codegen
```

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
