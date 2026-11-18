import React, { useEffect, useState } from "react";

const API = "http://localhost:4000/api";

async function get(path) {
  const r = await fetch(`${API}${path}`);
  return r.json();
}

async function post(path, body) {
  const r = await fetch(`${API}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return r.json();
}

// ========== STUDENT: Class Hub ==========
function StudentClassHub({ subjects }) {
  return (
    <div className="phone">
      <div className="phone-header">
        <div>
          <strong>Delhi Public School</strong>
          <div style={{ fontSize: 12, color: "#64748b" }}>Ananya Sharma</div>
        </div>
        <span style={{ fontSize: 12, color: "#1d4ed8" }}>Student</span>
      </div>
      <div className="phone-body">
        <input
          placeholder="Search subjects, homework..."
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid #e2e8f0",
            marginBottom: 14,
          }}
        />
        <div style={{ fontWeight: 600, marginBottom: 8 }}>This Week</div>
        <div className="card">
          <div style={{ fontWeight: 600 }}>Algebra Worksheet</div>
          <div style={{ fontSize: 12, color: "#64748b" }}>Maths · Due 10 Nov</div>
          <span className="badge">Pending</span>
        </div>
        <div className="card">
          <div style={{ fontWeight: 600 }}>Essay on Environment</div>
          <div style={{ fontSize: 12, color: "#64748b" }}>English · Due 11 Nov</div>
          <span className="badge">Pending</span>
        </div>
        <div style={{ fontWeight: 600, margin: "16px 0 8px" }}>Subjects</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {(subjects || []).map((s) => (
            <div key={s.id} className="card" style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{s.name}</div>
              <div style={{ fontSize: 11, color: "#64748b" }}>{s.teacher}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="phone-nav">
        <span className="active">Home</span>
        <span>Offline</span>
        <span>Announce</span>
        <span>Profile</span>
      </div>
    </div>
  );
}

// ========== STUDENT: Subject Detail ==========
function StudentSubjectDetail({ homework }) {
  return (
    <div className="phone">
      <div className="phone-header">
        <strong>← Mathematics</strong>
        <span style={{ fontSize: 12 }}>Ms. Priya Mehta</span>
      </div>
      <div className="phone-body">
        <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
          {["Homework", "Materials", "Tests", "Announce"].map((t, i) => (
            <span
              key={t}
              style={{
                padding: "6px 12px",
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 600,
                background: i === 0 ? "#eff6ff" : "#f8fafc",
                color: i === 0 ? "#1d4ed8" : "#64748b",
                border: "1px solid #e2e8f0",
              }}
            >
              {t}
            </span>
          ))}
        </div>
        {(homework || []).map((h) => (
          <div key={h.id} className="card">
            <div style={{ fontWeight: 600 }}>{h.title}</div>
            <div style={{ fontSize: 12, color: "#64748b" }}>Due {h.due}</div>
            <span className="badge">{h.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ========== TEACHER: Create Assignment ==========
function TeacherCreateAssignment({ subjects, onCreated }) {
  const [title, setTitle] = useState("");
  const [subjectId, setSubjectId] = useState("sub1");
  const [due, setDue] = useState("");
  const [description, setDescription] = useState("");
  const [msg, setMsg] = useState("");

  async function submit() {
    if (!title.trim()) {
      setMsg("Title is required");
      return;
    }
    const item = await post("/homework", { title, subjectId, due, description });
    setMsg("Saved: " + item.title);
    setTitle("");
    setDescription("");
    onCreated && onCreated();
  }

  return (
    <div className="phone">
      <div className="phone-header">
        <strong>Create Assignment</strong>
        <span style={{ fontSize: 12, color: "#1d4ed8" }}>Teacher</span>
      </div>
      <div className="phone-body">
        <div className="field">
          <label>Subject</label>
          <select value={subjectId} onChange={(e) => setSubjectId(e.target.value)}>
            {(subjects || []).map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Algebra Worksheet" />
        </div>
        <div className="field">
          <label>Due Date</label>
          <input type="date" value={due} onChange={(e) => setDue(e.target.value)} />
        </div>
        <div className="field">
          <label>Description</label>
          <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <button className="btn btn-primary" style={{ width: "100%" }} onClick={submit}>
          Publish Assignment
        </button>
        {msg && <p style={{ marginTop: 10, fontSize: 13, color: "#166534" }}>{msg}</p>}
      </div>
    </div>
  );
}

// ========== TEACHER: Question Paper ==========
function TeacherPaperBuilder() {
  const [title, setTitle] = useState("Unit Test – Maths");
  const [msg, setMsg] = useState("");

  async function save() {
    await post("/papers", {
      title,
      classSection: "8-A",
      sections: [{ name: "Section A", marks: 20 }],
    });
    setMsg("Paper saved");
  }

  return (
    <div className="phone">
      <div className="phone-header">
        <strong>Question Paper Builder</strong>
      </div>
      <div className="phone-body">
        <div className="field">
          <label>Paper Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="card">
          <div style={{ fontWeight: 600 }}>Section A</div>
          <div style={{ fontSize: 12, color: "#64748b" }}>20 marks</div>
        </div>
        <button className="btn btn-orange" style={{ width: "100%", marginTop: 8 }} onClick={save}>
          Save Paper
        </button>
        {msg && <p style={{ marginTop: 10, fontSize: 13, color: "#166534" }}>{msg}</p>}
      </div>
    </div>
  );
}

// ========== PARENT DASHBOARD ==========
function ParentDashboard({ dash }) {
  if (!dash) return <div className="phone"><div className="phone-body">Loading...</div></div>;
  return (
    <div className="phone">
      <div className="phone-header">
        <div>
          <strong>{dash.child?.name || "Child"}</strong>
          <div style={{ fontSize: 12, color: "#64748b" }}>{dash.child?.school}</div>
        </div>
        <span style={{ fontSize: 12, color: "#1d4ed8" }}>Parent</span>
      </div>
      <div className="phone-body">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
          <div className="card">
            <div style={{ fontSize: 11, color: "#64748b" }}>Homework</div>
            <div style={{ fontSize: 22, fontWeight: 700 }}>{dash.upcomingHomework}</div>
          </div>
          <div className="card">
            <div style={{ fontSize: 11, color: "#64748b" }}>Attendance</div>
            <div style={{ fontSize: 22, fontWeight: 700 }}>{dash.attendance}</div>
          </div>
        </div>
        <div style={{ fontWeight: 600, marginBottom: 8 }}>Recent Homework</div>
        {(dash.recentHomework || []).slice(0, 3).map((h) => (
          <div key={h.id} className="card">
            <div style={{ fontWeight: 600 }}>{h.title}</div>
            <div style={{ fontSize: 12, color: "#64748b" }}>Due {h.due}</div>
          </div>
        ))}
        <div style={{ fontWeight: 600, margin: "14px 0 8px" }}>Announcements</div>
        {(dash.announcements || []).map((a) => (
          <div key={a.id} className="card">
            <div style={{ fontWeight: 600 }}>{a.title}</div>
            <div style={{ fontSize: 12, color: "#64748b" }}>{a.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ========== APP ==========
export default function App() {
  const [role, setRole] = useState("student");
  const [subjects, setSubjects] = useState([]);
  const [homework, setHomework] = useState([]);
  const [dash, setDash] = useState(null);

  async function load() {
    try {
      setSubjects(await get("/subjects"));
      setHomework(await get("/homework"));
      setDash(await get("/parent/dashboard"));
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="page">
      <div className="page-title">
        <div className="logo-row">
          <h1>VBright – Smart LMS for Schools</h1>
        </div>
        <p>One platform for school learning, communication, and progress tracking</p>
      </div>

      <div className="role-picker">
        {["student", "teacher", "parent", "all"].map((r) => (
          <button
            key={r}
            className={`role-btn ${role === r ? "active" : ""}`}
            onClick={() => setRole(r)}
          >
            {r === "all" ? "All Screens" : r.charAt(0).toUpperCase() + r.slice(1)}
          </button>
        ))}
      </div>

      <div className="screens-row">
        {(role === "student" || role === "all") && (
          <>
            <StudentClassHub subjects={subjects} />
            <StudentSubjectDetail homework={homework.filter((h) => h.subjectId === "sub1")} />
          </>
        )}
        {(role === "teacher" || role === "all") && (
          <>
            <TeacherCreateAssignment subjects={subjects} onCreated={load} />
            <TeacherPaperBuilder />
          </>
        )}
        {(role === "parent" || role === "all") && <ParentDashboard dash={dash} />}
      </div>

      <p style={{ textAlign: "center", marginTop: 28, fontSize: 12, color: "#94a3b8" }}>
        Backend: http://localhost:4000 &nbsp;·&nbsp; Frontend: http://localhost:3000
      </p>
    </div>
  );
}
