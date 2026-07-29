<p align="center">
  <img src="public/favicon.svg" alt="MemoryVerse AI Logo" width="80" height="80" />
</p>

<h1 align="center">🧠 MemoryVerse AI</h1>

<p align="center">
  <strong>Intelligent Digital Identity & Knowledge Management Platform</strong>
</p>

<p align="center">
  <a href="https://dinesh37518.github.io/MEMORYVERSE-AI-PROJECT/">
    <img src="https://img.shields.io/badge/🚀_Live_Demo-MemoryVerse_AI-6366f1?style=for-the-badge&labelColor=1e1b4b" alt="Live Demo" />
  </a>
  &nbsp;
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-8.1-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
</p>

<p align="center">
  <a href="https://dinesh37518.github.io/MEMORYVERSE-AI-PROJECT/">🌐 Live Demo</a> •
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-project-structure">Structure</a> •
  <a href="#-contributing">Contributing</a>
</p>

---

## 🌐 Live Demo

> **👉 [https://dinesh37518.github.io/MEMORYVERSE-AI-PROJECT/](https://dinesh37518.github.io/MEMORYVERSE-AI-PROJECT/)**

Experience the full platform instantly — no installation required.

---

## 📖 About

**MemoryVerse AI** is a next-generation, AI-powered digital identity and knowledge management platform designed for **students and professionals**. It serves as your intelligent digital memory — automatically extracting insights from documents, building interactive knowledge graphs, and providing instant retrieval of career achievements, skills, and certifications.

Think of it as your **AI-powered career vault** that remembers everything you've accomplished and helps you find it in seconds.

---

## ✨ Features

### 🏠 Dashboard
- Real-time overview of your entire digital identity
- Animated stat cards with knowledge scores, document counts, and AI readiness metrics
- Quick action shortcuts for uploads, AI queries, and profile management

### 📂 Document Vault & OCR Upload
- Drag-and-drop document upload with intelligent OCR processing
- Support for PDFs, images, certificates, and transcripts
- Auto-extraction of metadata, skills, dates, and entities from uploaded documents

### 🕸️ Knowledge Graph
- Interactive, force-directed knowledge graph visualization
- Nodes represent skills, projects, certifications, and achievements
- Dynamic connections show relationships between different career elements
- Real-time graph traversal with zoom, pan, and node inspection

### ⏳ Career Timeline
- Chronological journey visualization of your entire career
- Milestone tracking for education, internships, certifications, and projects
- Animated timeline with expandable event details

### 💡 Skills Matrix
- Comprehensive skill inventory with proficiency levels
- Category-based organization (Technical, Soft Skills, Tools, Frameworks)
- Visual progress bars and skill verification badges

### 📁 Projects Portfolio
- Detailed project cards with descriptions, tech stacks, and outcomes
- Project status tracking (Active, Completed, In Progress)
- Links to repositories and live demos

### 🏢 Internships Tracker
- Internship experience management with company details
- Role descriptions, key learnings, and duration tracking
- Performance metrics and supervisor feedback

### 🏅 Certifications
- Digital certificate management and verification
- Issuing authority tracking with expiry date monitoring
- One-click certificate viewing and download

### 🏆 Achievements
- Achievement showcase with categorization
- Confetti animations for milestone celebrations
- Badge system for different achievement tiers

### 🤖 AI Assistant (RAG-powered)
- Natural language query interface for your knowledge base
- Retrieval-Augmented Generation for context-aware responses
- Career advice, document summarization, and skill gap analysis
- Conversational AI that understands your complete profile

### 🔍 Smart Search
- Natural language search across all your data
- Semantic search powered by AI embeddings
- Instant results with relevance scoring and highlighted matches

### 📊 Analytics Dashboard
- Comprehensive analytics with interactive charts
- Skill growth tracking over time
- Document processing statistics and engagement metrics
- Exportable reports

### 👤 Profile Management
- Rich user profile with avatar, bio, and social links
- Academic information management
- Privacy settings and data export options

### 🔐 Authentication System
- Beautiful login page with glassmorphism design
- Role-based access control (Student / Admin)
- Secure session management

### 🛡️ Admin Panel
- User management dashboard for administrators
- System-wide analytics and user activity monitoring
- Content moderation tools

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Frontend Framework** | React 19 with TypeScript 6.0 |
| **Build Tool** | Vite 8.1 (Lightning-fast HMR) |
| **Styling** | Tailwind CSS 4.3 + Custom CSS (Glassmorphism, 3D effects) |
| **Icons** | Lucide React |
| **Animations** | Canvas Confetti + CSS Animations |
| **Typography** | Plus Jakarta Sans + Fira Code (Google Fonts) |
| **Linting** | OxLint |
| **Deployment** | GitHub Pages |
| **Version Control** | Git + GitHub |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x
- **Git**

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/dinesh37518/MEMORYVERSE-AI-PROJECT.git

# 2. Navigate to the project directory
cd MEMORYVERSE-AI-PROJECT

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be running at **`http://localhost:5173`**.

### Build for Production

```bash
npm run build
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

---

## 📂 Project Structure

```
MEMORYVERSE-AI-PROJECT/
├── public/
│   ├── favicon.svg              # App favicon
│   └── icons.svg                # SVG icon sprites
├── src/
│   ├── assets/                  # Static assets
│   ├── components/
│   │   ├── achievements/        # 🏆 Achievement showcase
│   │   ├── admin/               # 🛡️ Admin panel
│   │   ├── ai/                  # 🤖 RAG AI Assistant
│   │   ├── analytics/           # 📊 Analytics dashboard
│   │   ├── auth/                # 🔐 Login & authentication
│   │   ├── certifications/      # 🏅 Certification manager
│   │   ├── dashboard/           # 🏠 Main dashboard
│   │   ├── documents/           # 📂 Document vault & viewer
│   │   ├── graph/               # 🕸️ Knowledge graph
│   │   ├── internship/          # 🏢 Internship tracker
│   │   ├── profile/             # 👤 User profile
│   │   ├── projects/            # 📁 Project portfolio
│   │   ├── search/              # 🔍 Smart search
│   │   ├── skills/              # 💡 Skills matrix
│   │   ├── timeline/            # ⏳ Career timeline
│   │   ├── upload/              # 📤 OCR upload module
│   │   └── Navigation.tsx       # 🧭 3D floating navigation
│   ├── context/
│   │   └── AppContext.tsx        # Global state management
│   ├── data/                    # Mock data & constants
│   ├── types/                   # TypeScript type definitions
│   ├── utils/                   # Utility functions
│   ├── App.tsx                  # Root application component
│   ├── App.css                  # Global app styles
│   ├── index.css                # Base styles & design tokens
│   └── main.tsx                 # Entry point
├── index.html                   # HTML template
├── vite.config.ts               # Vite configuration
├── tsconfig.json                # TypeScript config
├── package.json                 # Dependencies & scripts
└── README.md                    # You are here! 📍
```

---

## 🎨 Design Philosophy

MemoryVerse AI follows a **premium dark-mode glassmorphism** design language:

- **3D UI Elements** — Soft shadows, depth layering, and elevated surfaces
- **Glassmorphism** — Frosted glass panels with backdrop blur effects
- **Gradient Accents** — Indigo → Purple → Pink brand gradients
- **Micro-animations** — Pulse effects, hover transitions, and smooth state changes
- **Responsive Design** — Fully adaptive from mobile to ultra-wide displays
- **Plus Jakarta Sans** — Modern, clean typography for optimal readability

---

## 🔑 Default Login Credentials

| Role | Email | Password |
|------|-------|----------|
| **Student** | `dinesh@memoryverse.ai` | `password123` |
| **Admin** | `admin@memoryverse.ai` | `admin123` |

> ⚠️ *These are demo credentials for the live preview. In production, implement proper authentication.*

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run OxLint code linting |
| `npm run deploy` | Build & deploy to GitHub Pages |

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

---

## 👨‍💻 Author

**Dineshkumar M**

- GitHub: [@dinesh37518](https://github.com/dinesh37518)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Made with ❤️ and AI by <strong>Dineshkumar M</strong>
</p>

<p align="center">
  <a href="https://dinesh37518.github.io/MEMORYVERSE-AI-PROJECT/">
    <img src="https://img.shields.io/badge/🌐_Visit_Live_App-MemoryVerse_AI-6366f1?style=for-the-badge&labelColor=1e1b4b" alt="Visit Live App" />
  </a>
</p>
