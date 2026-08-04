<p align="center">
  <img src="frontend/public/favicon.svg" alt="MemoryVerse AI Logo" width="90" height="90" />
</p>

<h1 align="center">🧠 MemoryVerse AI</h1>

<p align="center">
  <strong>Intelligent Digital Identity, Automated Document Vault & Multi-Tenant Placement AI Platform</strong>
</p>

<p align="center">
  <a href="https://memoryverse-ai-project-muoq.vercel.app/">
    <img src="https://img.shields.io/badge/🚀_Frontend_Live-Vercel-6366f1?style=for-the-badge&labelColor=0f172a" alt="Frontend Vercel" />
  </a>
  &nbsp;
  <a href="https://memoryverse-ai-project-2.onrender.com">
    <img src="https://img.shields.io/badge/⚡_Backend_API-Render-10b981?style=for-the-badge&labelColor=0f172a" alt="Backend Render" />
  </a>
  &nbsp;
  <a href="https://github.com/dinesh37518/MEMORYVERSE-AI-PROJECT">
    <img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Repo" />
  </a>
</p>

<p align="center">
  🚀 <strong>Frontend Deployment:</strong> <a href="https://memoryverse-ai-project-muoq.vercel.app/">https://memoryverse-ai-project-muoq.vercel.app/</a><br/>
  ⚡ <strong>Backend Deployment:</strong> <a href="https://memoryverse-ai-project-2.onrender.com">https://memoryverse-ai-project-2.onrender.com</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-8.1-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Node.js-Express_4-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node Express" />
  <img src="https://img.shields.io/badge/Supabase-PostgreSQL-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.3-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
</p>

<p align="center">
  <a href="#-deployed-urls--live-links">Live Links</a> •
  <a href="#-architecture--project-structure">Architecture</a> •
  <a href="#-key-features--capabilities">Key Features</a> •
  <a href="#-platform-access--credentials">Credentials</a> •
  <a href="#-api-endpoints-summary">API Endpoints</a> •
  <a href="#-database-schema">Database</a> •
  <a href="#-getting-started-locally">Getting Started</a>
</p>

---

## 🌐 Deployed URLs & Live Links

| Service | Hosting Provider | Live Deployed Link | Status |
| :--- | :--- | :--- | :--- |
| 🚀 **Frontend Web Application** | **Vercel** | [https://memoryverse-ai-project-muoq.vercel.app/](https://memoryverse-ai-project-muoq.vercel.app/) | ![Active](https://img.shields.io/badge/Status-Active-brightgreen) |
| ⚡ **Backend REST API** | **Render** | [https://memoryverse-ai-project-2.onrender.com](https://memoryverse-ai-project-2.onrender.com) | ![Active](https://img.shields.io/badge/Status-Active-brightgreen) |
| 🩺 **Backend Health Endpoint** | **Render** | [https://memoryverse-ai-project-2.onrender.com/health](https://memoryverse-ai-project-2.onrender.com/health) | ![Active](https://img.shields.io/badge/Status-Active-brightgreen) |
| 📦 **GitHub Source Code** | **GitHub** | [https://github.com/dinesh37518/MEMORYVERSE-AI-PROJECT](https://github.com/dinesh37518/MEMORYVERSE-AI-PROJECT) | ![Public](https://img.shields.io/badge/Repo-Public-blue) |

---

## 🌟 Architecture & Project Structure

MemoryVerse AI is architected as an enterprise-grade **Multi-Tenant Full-Stack Web Application** divided into a high-performance **Vite + React** frontend client and a scalable **Node.js Express + TypeScript** REST backend API backed by **Supabase PostgreSQL**.

```
MEMORYVERSE-AI-PROJECT/
├── frontend/                     # React 19 + TypeScript + Tailwind CSS client (Vercel)
│   ├── src/
│   │   ├── components/           # UI Components (Dashboard, Digital Twin, Vault, Graph, etc.)
│   │   │   ├── admin/            # College Admin Directory & Vault Inspection
│   │   │   ├── ai/               # RAG Placement AI & Custom Assistant
│   │   │   ├── auth/             # Login Page & Multi-Tenant Authentication
│   │   │   ├── documents/        # PDF/Image Viewer Modal & Document Vault
│   │   │   ├── graph/            # 3D Knowledge Graph Visualization
│   │   │   ├── insights/         # Career Insights & Gap Analyzer
│   │   │   ├── portfolio/        # Portfolio Web Page Generator
│   │   │   ├── resume/           # Resume Builder & Intelligence
│   │   │   ├── twin/             # AI Student Digital Twin
│   │   │   └── ...
│   │   ├── context/              # Global AppState & Auth Provider
│   │   ├── services/             # AI Twin, Resume Intel, Semantic Search & Gap Analyzer Services
│   │   └── ...
│   ├── vercel.json               # Vercel Deployment Configuration
│   └── vite.config.ts            # Vite Build Pipeline
│
├── backend/                      # Node.js + Express + TypeScript API server (Render)
│   ├── src/
│   │   ├── ai/                   # Gemini & LLM Services (Chat, Resume, Portfolio, Career)
│   │   ├── config/               # Environment & Supabase Client Config
│   │   ├── controllers/          # Request Handlers (Auth, Docs, Profile, Timeline, KG, AI)
│   │   ├── middleware/           # CORS & Auth Middleware
│   │   ├── routes/               # Express API Route Registries
│   │   └── server.ts             # Server Entry Point
│   └── render.yaml               # Render Deployment Blueprint
│
├── supabase_schema.sql           # Complete Supabase PostgreSQL Database Schema
└── README.md                     # Project Documentation
```

---

## ✨ Key Features & Capabilities

### 1. 🤖 Multi-Tenant Placement AI & Student Digital Twin
- **AI Student Digital Twin**: Creates an intelligent digital clone for every student based on verified skills, uploaded certificates, and engineering projects.
- **Dynamic Career Gap Analyzer**: Evaluates student preparation and generates personalized 5-phase placement action plans.
- **Company-Specific Interview Roadmaps**: Custom interview preparation strategies tailored for top hiring companies (**Zoho**, **Cisco**, **Infosys**, **TCS**, **Accenture**, and Core ECE/Embedded/IoT firms).
- **Interactive Placement AI Assistant**: Multi-tenant Groq LLaMA / Gemini RAG engine with dynamic student context infusion.

### 2. 🛡️ College Admin Portal & Directory
- **Student Inspection Directory**: View all registered students sorted by Register Number, Year, and Department.
- **Instant Vault Audit**: College administrators can inspect any target student's uploaded vault documents, extracted skills, and certificates in real-time.
- **Department & Multi-Tenant Sync**: Database synchronization across multiple academic departments via indexed Register Numbers.

### 3. 📄 View-First Document Vault & PDF Inspector
- **Binary Data URL Preservation**: Uploading PDF, PNG, or JPG documents preserves exact binary representations for inline previewing.
- **Master Resume & Document Viewer**: Embedded viewer modal allows instant document inspection without background file downloads.
- **High-Resolution HTML/PDF Export**: Download formal high-res printable documents with contact details, educational marks, and seal signatures.
- **View Password Visibility**: Integrated password eye toggles (`<Eye />` / `<EyeOff />`) for user convenience and account security.

### 4. 🕸️ 3D Knowledge Graph & Career Timeline
- **Force-Directed Knowledge Graph**: Interactive node visualization mapping skill relationships, project credentials, and certification nodes.
- **Chronological Digital Timeline**: Automated career trajectory timeline capturing academic achievements, internships, and skill milestones.

### 5. 💼 Resume Builder & Portfolio Generator
- **ATS Resume Intelligence**: Automatic ATS compatibility scoring, keyword analysis, and real-time formatting recommendations.
- **One-Click Portfolio Generator**: Converts student vault credentials into a sleek, published web portfolio.
- **Smart Vector Search**: Semantic search capability across student documents and portfolio items.

---

## 🔑 Platform Access & Credentials

| Role | Email / Identifier | Password | Permitted Actions & Scope |
| :--- | :--- | :--- | :--- |
| 👑 **College Admin** | `vsbkaruredu@gmail.com` | `VSBece@2024` | Complete Admin Portal, Student Directory Inspection & Vault Analytics |
| 🎓 **Student Account** | Any registered student email | Account Password | Personal Vault, Digital Twin, Placement AI, Resume Builder & Portfolio |
| 🆕 **New Registration** | Any email (Sign Up) | User Password | Instant creation of isolated student profile & digital identity twin |

---

## 🛠️ Tech Stack Matrix

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 19.2 + TypeScript 6.0** | Next-generation React framework with strict typing |
| **Build Engine** | **Vite 8.1** | Instant HMR and optimized production bundling |
| **Frontend Hosting** | **Vercel** | Continuous deployment client hosting |
| **Backend API** | **Node.js Express 4.21 + TS 5.7** | Scalable RESTful microservice backend |
| **Backend Hosting** | **Render** | Cloud web service hosting |
| **Database & Auth** | **Supabase PostgreSQL** | Relational database with RLS policies and UUID indexing |
| **Styling & UI** | **Tailwind CSS 4.3** | Modern dark-mode UI with glassmorphism & responsive cards |
| **AI Models & RAG** | **Gemini AI & Groq LLaMA-3.3** | Contextual AI reasoning, career advice & portfolio synthesis |
| **Icons & Effects** | **Lucide React & Canvas Confetti** | Crisp UI icon set and celebration visual effects |
| **Email Service** | **EmailJS Browser** | Automated transactional email notifications |

---

## 🔌 API Endpoints Summary

### Backend Base URL: `https://memoryverse-ai-project-2.onrender.com`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Server health and uptime verification |
| `POST` | `/auth/login` | Student / Admin authentication |
| `POST` | `/auth/register` | Multi-tenant student registration |
| `POST` | `/documents/upload` | Document upload with binary parsing and metadata extraction |
| `GET` | `/documents` | Retrieve vault documents for authenticated student / admin inspection |
| `DELETE` | `/documents/:id` | Delete a document from the vault |
| `GET` / `POST` / `PUT` | `/profile` | Fetch and update student profiles |
| `GET` / `POST` | `/timeline` | Sync and retrieve digital journey timeline events |
| `GET` / `POST` | `/knowledge-graph` | Fetch and generate student 3D knowledge graph nodes |
| `POST` | `/chat` | Placement AI Assistant chat interaction |
| `POST` | `/portfolio` | Generate custom portfolio JSON payload |
| `POST` | `/resume-analysis` | Analyze ATS score and resume content |
| `POST` | `/career-insights` | Generate company placement strategy & gap analysis |

---

## 🗄️ Database Schema

The database relies on a multi-tenant **Supabase PostgreSQL** instance with Row Level Security (RLS) enabled. Key tables include:

- **`public.profiles`**: Registered student profiles (keyed by `reg_no` & `email`).
- **`public.documents`**: Uploaded document metadata and binary storage references.
- **`public.skills`**: Extracted and verified technical/soft skill records.
- **`public.projects`**: Engineering project showcases and GitHub repository links.
- **`public.internships`**: Industrial internship logs and skill summaries.
- **`public.certifications`**: Professional certification credentials and issue dates.
- **`public.achievements`**: Student honors and competition records.
- **`public.timeline_events`**: Chronological milestone events.
- **`public.knowledge_graph_nodes` & `knowledge_graph_edges`**: Graph relationship matrices.

*SQL migration schema is maintained in [`supabase_schema.sql`](file:///c:/Users/Dineshkumar%20M/OneDrive/Desktop/MEMORYVERSE/supabase_schema.sql).*

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### 1. Clone the Repository
```bash
git clone https://github.com/dinesh37518/MEMORYVERSE-AI-PROJECT.git
cd MEMORYVERSE-AI-PROJECT
```

### 2. Configure Backend Server
```bash
cd backend
npm install
```
Create a `.env` file inside `backend/`:
```env
PORT=5000
SUPABASE_URL=https://your-supabase-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
GEMINI_API_KEY=your_gemini_api_key
```
Start the backend dev server:
```bash
npm run dev
```
*(Backend runs on `http://localhost:5000`)*

### 3. Configure Frontend Client
In a new terminal window:
```bash
cd frontend
npm install
```
Create a `.env` file inside `frontend/`:
```env
VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_BACKEND_URL=http://localhost:5000
```
Start the frontend dev server:
```bash
npm run dev
```
*(Frontend runs on `http://localhost:5173`)*

---

## 👨‍💻 Author & Maintainer

**Dineshkumar M**
- **GitHub**: [@dinesh37518](https://github.com/dinesh37518)
- **Frontend App**: [https://memoryverse-ai-project-muoq.vercel.app/](https://memoryverse-ai-project-muoq.vercel.app/)
- **Backend API**: [https://memoryverse-ai-project-2.onrender.com](https://memoryverse-ai-project-2.onrender.com)
- **Repository**: [https://github.com/dinesh37518/MEMORYVERSE-AI-PROJECT](https://github.com/dinesh37518/MEMORYVERSE-AI-PROJECT)

---

<p align="center">
  Crafted with ❤️ for student career empowerment and multi-tenant placement AI excellence.
</p>
