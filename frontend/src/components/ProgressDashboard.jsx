import React, { useState } from "react";
import "../App.css";

const studentData = {
  name: "Aarav Sharma",
  overallProgress: 82,
  subjects: [
    { name: "Mathematics", progress: 90, score: 88 },
    { name: "Physics", progress: 75, score: 80 },
    { name: "Chemistry", progress: 85, score: 85 },
    { name: "English", progress: 70, score: 72 },
  ],
  recentActivities: [
    "Completed Algebra Quiz",
    "Watched Physics Video",
    "Submitted Chemistry Assignment",
    "Read English Comprehension",
  ],
};

const teacherData = {
  name: "Ms. Priya Verma",
  classAverage: 78,
  students: 25,
  topPerformers: ["Aarav Sharma", "Rahul Singh", "Sara Khan"],
  subjectAverages: [
    { subject: "Mathematics", average: 85 },
    { subject: "Physics", average: 80 },
    { subject: "Chemistry", average: 75 },
    { subject: "English", average: 70 },
  ],
  recentFeedback: [
    "Class performance improving in Math",
    "Need more focus on English grammar",
    "Physics experiments engaging students",
    "Chemistry labs need more resources",
  ],
};

function ProgressBar({ percent, color = "#38a169" }) {
  return (
    <div
      style={{
        background: "#e3f0ff",
        borderRadius: 8,
        height: 12,
        width: "100%",
      }}
    >
      <div
        style={{
          width: `${percent}%`,
          background: color,
          height: "100%",
          borderRadius: 8,
          transition: "width 0.5s",
        }}
      ></div>
    </div>
  );
}

function SimpleBarChart({ data, labels, color = "#2b6cb0" }) {
  const max = Math.max(...data, 100);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        height: 120,
        gap: 16,
        margin: "1rem 0",
      }}
    >
      {data.map((val, idx) => (
        <div
          key={idx}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              height: `${(val / max) * 100}%`,
              width: 24,
              background: color,
              borderRadius: 6,
              marginBottom: 6,
              transition: "height 0.5s",
            }}
            title={val}
          ></div>
          <div style={{ fontSize: 12, color: "#225080", fontWeight: 600 }}>
            {labels[idx]}
          </div>
        </div>
      ))}
    </div>
  );
}

function ProgressDashboard() {
  const [view, setView] = useState("student");

  const data = view === "student" ? studentData : teacherData;

  return (
    <section
      style={{
        width: "100vw",
        background: "#f6f8fa",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        margin: 0,
        padding: 0,
        minHeight: "calc(100vh - 120px)",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1000,
          padding: "2.5rem 1rem",
          marginTop: "2.5rem",
          marginBottom: "2.5rem",
        }}
      >
        <h2
          style={{
            color: "#2b6cb0",
            textAlign: "center",
            fontWeight: 800,
            fontSize: 30,
            marginBottom: 24,
            letterSpacing: 1,
          }}
        >
          Student & Teacher Progress Dashboard
        </h2>
        <div
          style={{
            background: "#fff",
            borderRadius: 18,
            border: "1.5px solid #e3f0ff",
            boxShadow: "0 4px 24px rgba(43,108,176,0.09)",
            padding: 32,
          }}
        >
          <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
            <button
              onClick={() => setView("student")}
              style={{
                flex: 1,
                padding: "12px 0",
                background: view === "student" ? "#2b6cb0" : "#e3f0ff",
                color: view === "student" ? "#fff" : "#2b6cb0",
                border: "none",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 16,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              Student View
            </button>
            <button
              onClick={() => setView("teacher")}
              style={{
                flex: 1,
                padding: "12px 0",
                background: view === "teacher" ? "#2b6cb0" : "#e3f0ff",
                color: view === "teacher" ? "#fff" : "#2b6cb0",
                border: "none",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 16,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              Teacher View
            </button>
          </div>
          {view === "student" ? (
            <div>
              <div
                style={{
                  fontWeight: 700,
                  color: "#2b6cb0",
                  fontSize: 20,
                  marginBottom: 16,
                }}
              >
                {data.name}'s Progress
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 24,
                  marginBottom: 24,
                }}
              >
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div
                    style={{ fontWeight: 600, color: "#444", marginBottom: 8 }}
                  >
                    Overall Progress
                  </div>
                  <ProgressBar percent={data.overallProgress} />
                  <div
                    style={{ color: "#38a169", fontWeight: 700, marginTop: 6 }}
                  >
                    {data.overallProgress}%
                  </div>
                </div>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div
                    style={{ fontWeight: 600, color: "#444", marginBottom: 8 }}
                  >
                    Subject Scores
                  </div>
                  <SimpleBarChart
                    data={data.subjects.map((s) => s.score)}
                    labels={data.subjects.map((s) => s.name.slice(0, 3))}
                    color="#f6ad55"
                  />
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <div
                  style={{ fontWeight: 600, color: "#444", marginBottom: 8 }}
                >
                  Subject Details
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: 16,
                  }}
                >
                  {data.subjects.map((subj, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: 16,
                        borderRadius: 12,
                        border: "1.5px solid #e3f0ff",
                        background: "#f9f9f9",
                      }}
                    >
                      <div
                        style={{
                          fontWeight: 700,
                          color: "#2b6cb0",
                          marginBottom: 6,
                        }}
                      >
                        {subj.name}
                      </div>
                      <ProgressBar percent={subj.progress} color="#f6ad55" />
                      <div
                        style={{
                          color: "#f6ad55",
                          fontWeight: 700,
                          marginTop: 6,
                        }}
                      >
                        Progress: {subj.progress}% | Score: {subj.score}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div
                  style={{ fontWeight: 600, color: "#444", marginBottom: 8 }}
                >
                  Recent Activities
                </div>
                <ul
                  style={{ color: "#225080", fontWeight: 600, paddingLeft: 18 }}
                >
                  {data.recentActivities.map((act, idx) => (
                    <li key={idx}>{act}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div>
              <div
                style={{
                  fontWeight: 700,
                  color: "#2b6cb0",
                  fontSize: 20,
                  marginBottom: 16,
                }}
              >
                {data.name}'s Class Overview
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 24,
                  marginBottom: 24,
                }}
              >
                <div style={{ flex: 1, minWidth: 150 }}>
                  <div
                    style={{ fontWeight: 600, color: "#444", marginBottom: 8 }}
                  >
                    Class Average
                  </div>
                  <div
                    style={{ fontSize: 32, fontWeight: 800, color: "#38a169" }}
                  >
                    {data.classAverage}%
                  </div>
                </div>
                <div style={{ flex: 1, minWidth: 150 }}>
                  <div
                    style={{ fontWeight: 600, color: "#444", marginBottom: 8 }}
                  >
                    Total Students
                  </div>
                  <div
                    style={{ fontSize: 32, fontWeight: 800, color: "#2b6cb0" }}
                  >
                    {data.students}
                  </div>
                </div>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div
                    style={{ fontWeight: 600, color: "#444", marginBottom: 8 }}
                  >
                    Subject Averages
                  </div>
                  <SimpleBarChart
                    data={data.subjectAverages.map((s) => s.average)}
                    labels={data.subjectAverages.map((s) =>
                      s.subject.slice(0, 3),
                    )}
                    color="#e53e3e"
                  />
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <div
                  style={{ fontWeight: 600, color: "#444", marginBottom: 8 }}
                >
                  Top Performers
                </div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {data.topPerformers.map((student, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: "8px 16px",
                        borderRadius: 8,
                        background: "#e3f0ff",
                        color: "#2b6cb0",
                        fontWeight: 700,
                      }}
                    >
                      {student}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div
                  style={{ fontWeight: 600, color: "#444", marginBottom: 8 }}
                >
                  Recent Feedback
                </div>
                <ul
                  style={{ color: "#225080", fontWeight: 600, paddingLeft: 18 }}
                >
                  {data.recentFeedback.map((fb, idx) => (
                    <li key={idx}>{fb}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProgressDashboard;
