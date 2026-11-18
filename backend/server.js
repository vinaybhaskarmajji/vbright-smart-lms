/**
 * VBright Smart LMS - MVP Backend
 * Simple Express API with in-memory data (easy to run, no DB setup needed)
 */

const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// ==================== DEMO DATA ====================
const users = [
  { id: "s1", name: "Ananya Sharma", role: "student", grade: "8", roll: "14", school: "Delhi Public School" },
  { id: "t1", name: "Ms. Priya Mehta", role: "teacher", subjects: ["Mathematics"], school: "Delhi Public School" },
  { id: "p1", name: "Mr. Sharma", role: "parent", childId: "s1", school: "Delhi Public School" },
];

let subjects = [
  { id: "sub1", name: "Mathematics", teacher: "Ms. Priya Mehta", icon: "📐" },
  { id: "sub2", name: "English", teacher: "Mr. Rajiv Das", icon: "📘" },
  { id: "sub3", name: "Science", teacher: "Ms. Neha Iyer", icon: "🔬" },
  { id: "sub4", name: "Social Studies", teacher: "Mr. Amit Verma", icon: "🌍" },
];

let homework = [
  { id: "h1", subjectId: "sub1", title: "Algebra Worksheet", due: "2026-11-10", status: "Pending", description: "Complete exercises 1-10" },
  { id: "h2", subjectId: "sub1", title: "Linear Equations - Exercise 5.2", due: "2026-11-12", status: "Pending", description: "Solve all questions" },
  { id: "h3", subjectId: "sub1", title: "Data Handling Project", due: "2026-11-15", status: "Pending", description: "Collect data and make a chart" },
  { id: "h4", subjectId: "sub2", title: "Essay on Environment", due: "2026-11-11", status: "Pending", description: "300 words" },
];

let announcements = [
  { id: "a1", title: "Parent-Teacher Meeting", body: "PTM on 15 Nov, 10 AM – 1 PM", date: "2026-11-05" },
  { id: "a2", title: "Sports Day", body: "Annual Sports Day on 20 Nov. All students must participate.", date: "2026-11-04" },
];

let questionPapers = [];

// ==================== AUTH (DEMO) ====================
app.post("/api/login", (req, res) => {
  const { role } = req.body;
  const user = users.find((u) => u.role === role) || users[0];
  res.json({ success: true, user });
});

app.get("/api/users", (req, res) => res.json(users));

// ==================== SUBJECTS ====================
app.get("/api/subjects", (req, res) => res.json(subjects));

// ==================== HOMEWORK ====================
app.get("/api/homework", (req, res) => {
  const { subjectId } = req.query;
  let list = homework;
  if (subjectId) list = list.filter((h) => h.subjectId === subjectId);
  res.json(list);
});

app.post("/api/homework", (req, res) => {
  const item = {
    id: uuidv4(),
    subjectId: req.body.subjectId || "sub1",
    title: req.body.title,
    due: req.body.due,
    status: "Pending",
    description: req.body.description || "",
    classSection: req.body.classSection || "",
  };
  homework.unshift(item);
  res.status(201).json(item);
});

// ==================== ANNOUNCEMENTS ====================
app.get("/api/announcements", (req, res) => res.json(announcements));

app.post("/api/announcements", (req, res) => {
  const item = {
    id: uuidv4(),
    title: req.body.title,
    body: req.body.body,
    date: new Date().toISOString().slice(0, 10),
  };
  announcements.unshift(item);
  res.status(201).json(item);
});

// ==================== QUESTION PAPERS ====================
app.get("/api/papers", (req, res) => res.json(questionPapers));

app.post("/api/papers", (req, res) => {
  const paper = {
    id: uuidv4(),
    title: req.body.title,
    classSection: req.body.classSection,
    sections: req.body.sections || [],
    createdAt: new Date().toISOString(),
  };
  questionPapers.unshift(paper);
  res.status(201).json(paper);
});

// ==================== PARENT DASHBOARD ====================
app.get("/api/parent/dashboard", (req, res) => {
  const child = users.find((u) => u.id === "s1");
  res.json({
    parent: users.find((u) => u.role === "parent"),
    child,
    upcomingHomework: homework.filter((h) => h.status === "Pending").length,
    attendance: "92%",
    academicOverview: "Good progress",
    recentHomework: homework.slice(0, 5),
    announcements: announcements.slice(0, 3),
  });
});

// ==================== HEALTH ====================
app.get("/api/health", (req, res) => res.json({ status: "ok", app: "VBright Smart LMS" }));

app.listen(PORT, () => {
  console.log(`\n🚀 VBright Backend running at http://localhost:${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/api/health\n`);
});
