# AI Linc Corporate Portal

Corporate website for AI Linc (corporate.ailinc.com) showcasing AI training programs and on-demand industry trainers.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/corporate-portal run dev` — run the frontend (port 25232)
- `pnpm --filter @workspace/api-server run seed` — seed MongoDB with sample data (run once after DB connects)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks from OpenAPI spec

## Required Environment Variables

| Variable | Description | Example |
|---|---|---|
| `MONGODB_URI` | MongoDB connection string | `mongodb://user:pass@host:27017/ailinc_corporate?authSource=admin` |

> **Note:** Use a standard `mongodb://` URI, **not** `mongodb+srv://`. Get it from Atlas → Connect → Drivers → Node.js → Standard connection string.

## Stack

- **Frontend:** React 18 + Vite, TailwindCSS, TanStack React Query, Wouter router
- **Backend:** Node.js 24, Express 5, Mongoose (MongoDB ODM)
- **Database:** MongoDB (via Mongoose)
- **API Contract:** OpenAPI 3.1 → Orval codegen (React Query hooks + Zod schemas)
- **Build:** esbuild (API), Vite (frontend)
- **Monorepo:** pnpm workspaces

## Where things live

```
artifacts/
  api-server/           ← Express backend
    src/
      models/           ← Mongoose models (TrainingProgram, Trainer, Inquiry)
      routes/           ← Express route handlers
      lib/
        mongodb.ts      ← MongoDB connection
        logger.ts       ← Pino logger
      seed.ts           ← Seed script (run once)
  corporate-portal/     ← React + Vite frontend
    src/
      pages/            ← Page components (Home, Training, Trainers, Contact)
      components/       ← UI components
lib/
  api-spec/
    openapi.yaml        ← Single source of truth for API contracts
  api-client-react/     ← Generated React Query hooks
  api-zod/              ← Generated Zod validation schemas
```

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero, stats, featured programs & trainers |
| `/training` | Corporate Training — program listing, filtering, CTA form |
| `/trainers` | Industry Trainers — trainer grid, category filter, request form |
| `/contact` | Contact — full inquiry form |

## API Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/training-programs` | List all training programs |
| GET | `/api/training-programs/:id` | Get single program |
| POST | `/api/training-programs` | Create program |
| GET | `/api/trainers` | List trainers (optional `?category=` filter) |
| GET | `/api/trainers/:id` | Get single trainer |
| POST | `/api/trainers` | Create trainer |
| GET | `/api/inquiries` | List all inquiries |
| POST | `/api/inquiries` | Submit inquiry |
| GET | `/api/stats` | Portal statistics |

## MongoDB Setup (First Time)

1. Create a free MongoDB Atlas cluster at https://cloud.mongodb.com
2. Under **Network Access**, add `0.0.0.0/0` to allow all IPs
3. Under **Database Access**, create a user with read/write permissions
4. Click **Connect** → **Drivers** → **Node.js** → copy the **Standard** connection string
5. Set `MONGODB_URI` in your environment
6. Run the seed script: `pnpm --filter @workspace/api-server run seed`

## User preferences

- MERN stack (MongoDB, Express, React, Node.js)
- Responsive, professional corporate design
- AI Linc branding — navy/slate primary, electric blue accent
