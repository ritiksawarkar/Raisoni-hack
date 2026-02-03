import React, { useState } from "react";
import "../App.css";

const mockStudents = [
  {
    id: 1,
    name: "Aarav Sharma",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    progress: 82,
    gaps: ["Algebra: Quadratic Equations", "Physics: Newton's Laws"],
    recentScores: [80, 85, 78, 90],
  },
  {
    id: 2,
    name: "Priya Verma",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    progress: 68,
    gaps: ["English: Comprehension", "Math: Geometry"],
    recentScores: [65, 70, 60, 77],
  },
  {
    id: 3,
    name: "Rahul Singh",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    progress: 94,
    gaps: [],
    recentScores: [92, 95, 97, 92],
  },
  {
    id: 4,
    name: "Sara Khan",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    progress: 74,
    gaps: ["Chemistry: Acids & Bases"],
    recentScores: [70, 75, 72, 79],
  },
];

function ProgressBar({ percent }) {
  return (
    <div
      style={{
        background: "#e3f0ff",
        borderRadius: 8,
        height: 16,
        width: "100%",
        marginBottom: 6,
      }}
    >
      <div
        style={{
          width: `${percent}%`,
          background:
            percent > 80 ? "#38a169" : percent > 60 ? "#f6ad55" : "#e53e3e",
          height: "100%",
          borderRadius: 8,
          transition: "width 0.5s",
        }}
      ></div>
    </div>
  );
}

function StudentProgressGapFinder() {
  const [selectedId, setSelectedId] = useState(mockStudents[0].id);
  const selected = mockStudents.find((s) => s.id === selectedId);

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
          maxWidth: 1100,
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
            fontSize: 32,
            marginBottom: 24,
            letterSpacing: 1,
          }}
        >
          Student Progress & Learning-Gap Finder
        </h2>
        <div
          style={{
            display: "flex",
            gap: 40,
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          {/* Student List */}
          <div style={{ minWidth: 240, maxWidth: 280 }}>
            <div
              style={{
                fontWeight: 700,
                color: "#225080",
                marginBottom: 16,
                fontSize: 20,
                letterSpacing: 0.5,
              }}
            >
              Students
            </div>
            <div
              style={{
                background: "#fff",
                borderRadius: 16,
                border: "1.5px solid #e3f0ff",
                padding: 16,
                boxShadow: "0 2px 16px rgba(43,108,176,0.07)",
              }}
            >
              {mockStudents.map((s) => (
                <div
                  key={s.id}
                  onClick={() => setSelectedId(s.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "10px 8px",
                    marginBottom: 10,
                    borderRadius: 10,
                    cursor: "pointer",
                    background: selectedId === s.id ? "#e3f0ff" : "#f6f8fa",
                    color: selectedId === s.id ? "#2b6cb0" : "#333",
                    fontWeight: selectedId === s.id ? 700 : 500,
                    border:
                      selectedId === s.id
                        ? "2px solid #2b6cb0"
                        : "1.5px solid #e3f0ff",
                    transition: "all 0.2s",
                    boxShadow:
                      selectedId === s.id ? "0 2px 8px #2b6cb033" : "none",
                  }}
                >
                  <img
                    src={s.avatar}
                    alt={s.name}
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: "50%",
                      objectFit: "cover",
                      border:
                        selectedId === s.id
                          ? "2px solid #2b6cb0"
                          : "1.5px solid #e3f0ff",
                      background: "#e3f0ff",
                    }}
                  />
                  <span>{s.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Student Details */}
          <div style={{ flex: 1, minWidth: 320, maxWidth: 520 }}>
            <div
              style={{
                background: "#fff",
                borderRadius: 18,
                border: "1.5px solid #e3f0ff",
                padding: 32,
                minHeight: 260,
                boxShadow: "0 4px 24px rgba(43,108,176,0.09)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={selected.avatar}
                alt={selected.name}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2.5px solid #2b6cb0",
                  marginBottom: 12,
                  background: "#e3f0ff",
                }}
              />
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 22,
                  color: "#2b6cb0",
                  marginBottom: 8,
                  letterSpacing: 0.5,
                }}
              >
                {selected.name}
              </div>
              <div style={{ marginBottom: 10, fontWeight: 500, color: "#444" }}>
                Overall Progress
              </div>
              <ProgressBar percent={selected.progress} />
              <div
                style={{
                  margin: "10px 0 18px 0",
                  color:
                    selected.progress > 80
                      ? "#38a169"
                      : selected.progress > 60
                        ? "#f6ad55"
                        : "#e53e3e",
                  fontWeight: 600,
                  fontSize: 18,
                }}
              >
                {selected.progress}% Complete
              </div>
              <div style={{ marginBottom: 10, fontWeight: 500, color: "#444" }}>
                Recent Scores
              </div>
              <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
                {selected.recentScores.map((score, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: "#e3f0ff",
                      color: "#2b6cb0",
                      borderRadius: 8,
                      padding: "6px 16px",
                      fontWeight: 600,
                      fontSize: 16,
                      boxShadow: "0 1px 4px #2b6cb022",
                    }}
                  >
                    {score}
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: 10, fontWeight: 500, color: "#444" }}>
                Learning Gaps
              </div>
              {selected.gaps.length === 0 ? (
                <div
                  style={{ color: "#38a169", fontWeight: 600, fontSize: 16 }}
                >
                  No major gaps detected 🎉
                </div>
              ) : (
                <ul
                  style={{
                    color: "#e53e3e",
                    fontWeight: 600,
                    paddingLeft: 18,
                    fontSize: 16,
                    margin: 0,
                  }}
                >
                  {selected.gaps.map((gap, idx) => (
                    <li key={idx}>{gap}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StudentProgressGapFinder;
