# VBright – Smart LMS for Schools

**One platform for school learning, communication, and progress tracking.**

VBright is a lightweight Learning Management System MVP built for Indian private and CBSE schools. It helps students, teachers, and parents manage homework, announcements, and progress in one place — without the complexity of heavy enterprise tools.

> Built as part of a **Product Management Internship (YuvaIntern)** — from user research and PRD to interactive MVP.

---

## Features

| Role | What you can do |
|------|-----------------|
| **Student** | Class Hub, subject list, homework & announcements |
| **Teacher** | Create assignments, build question papers, publish announcements |
| **Parent** | Simple dashboard — homework, attendance summary, school notices |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Vite, React Router |
| Backend | Node.js, Express, CORS, UUID |
| Storage | In-memory (demo) — easy to run, no DB setup |
| Design | Clean blue theme, mobile-friendly screens |

---

## Project Structure

```
vbright-smart-lms/
├── backend/
│   ├── package.json
│   └── server.js          # REST API
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx        # All screens
│       ├── main.jsx
│       └── index.css
└── README.md
```

---

## How to Run

### Prerequisites
- [Node.js](https://nodejs.org/) (LTS recommended)
- npm (comes with Node)

### 1. Backend

```bash
cd backend
npm install
npm start
```

API runs at: **http://localhost:4000**

### 2. Frontend (new terminal)

```bash
cd frontend
npm install
npm run dev
```

App opens at: **http://localhost:3000**

### 3. Try the product
- Open the app in browser
- Switch roles: **Student / Teacher / Parent**
- Teacher can create assignments (saved while server is running)
- Demo data resets when backend restarts

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/health` | Health check |
| `GET` | `/api/subjects` | List subjects |
| `GET` | `/api/homework` | List homework (optional `?subjectId=`) |
| `POST` | `/api/homework` | Create assignment |
| `GET` | `/api/announcements` | List announcements |
| `POST` | `/api/papers` | Save question paper |
| `GET` | `/api/parent/dashboard` | Parent summary |

---

## Product Context

- **Problem:** Homework and notices are scattered across WhatsApp; parents lack one clear view; teachers lose time on admin.
- **Solution:** Simple browser-based LMS for students, teachers, and parents.
- **Target:** Private & CBSE schools (approx. 200–800 students) in Tier-2/3 cities.
- **Go-to-market:** Feature flyer by post → call → free pilot demo.

---

## Author

**Majji Bhaskara Rao**  
Email: majjivinaybhaskar998@gmail.com  
WhatsApp: 9985789328  

Internship: YuvaIntern – Product Management  
Product: VBright Smart LMS for Schools

---

## License

This project is shared for learning and portfolio purposes as part of a product management internship.
