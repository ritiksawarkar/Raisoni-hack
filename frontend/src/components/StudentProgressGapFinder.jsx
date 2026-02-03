import React, { useState, useEffect } from "react";
import "../App.css";

const mockStudents = [
  {
    _id: 1,
    name: "Aarav Sharma",
    grade: "10th",
  },
  {
    _id: 2,
    name: "Priya Verma",
    grade: "9th",
  },
  {
    _id: 3,
    name: "Rahul Singh",
    grade: "11th",
  },
  {
    _id: 4,
    name: "Sara Khan",
    grade: "10th",
  },
];

const mockProgressData = {
  1: [
    {
      subject: "Math",
      score: 80,
      progress: 82,
      gaps: ["Algebra: Quadratic Equations"],
    },
    { subject: "Physics", score: 85, progress: 78, gaps: ["Newton's Laws"] },
  ],
  2: [
    { subject: "English", score: 65, progress: 68, gaps: ["Comprehension"] },
    { subject: "Math", score: 70, progress: 60, gaps: ["Geometry"] },
  ],
  3: [{ subject: "Science", score: 92, progress: 94, gaps: [] }],
  4: [
    { subject: "Chemistry", score: 70, progress: 74, gaps: ["Acids & Bases"] },
  ],
};

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
  const [students, setStudents] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/students");
        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }
        const data = await response.json();
        if (data.length > 0) {
          setStudents(data);
          setSelectedId(data[0]._id);
        } else {
          // Use mock data if API returns empty
          setStudents(mockStudents);
          setSelectedId(mockStudents[0]._id);
        }
      } catch (err) {
        // Use mock data as fallback
        console.log("Using mock data as fallback:", err.message);
        setStudents(mockStudents);
        setSelectedId(mockStudents[0]._id);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    if (!selectedId) return;

    const fetchProgress = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/students/${selectedId}/progress`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch progress");
        }
        const data = await response.json();
        setProgressData(data);
        const selected = students.find((s) => s._id === selectedId);
        setSelectedStudent(selected);
      } catch (err) {
        // Use mock data as fallback
        console.log("Using mock progress data as fallback:", err.message);
        const mockData = mockProgressData[selectedId] || [];
        setProgressData(mockData);
        const selected = students.find((s) => s._id === selectedId);
        setSelectedStudent(selected);
      }
    };

    fetchProgress();
  }, [selectedId, students]);

  const calculateOverallProgress = () => {
    if (progressData.length === 0) return 0;
    const total = progressData.reduce((sum, p) => sum + p.progress, 0);
    return Math.round(total / progressData.length);
  };

  const getRecentScores = () => {
    return progressData.slice(-4).map((p) => p.score);
  };

  const getGaps = () => {
    const allGaps = progressData.flatMap((p) => p.gaps);
    return [...new Set(allGaps)]; // unique gaps
  };

  if (loading) return <div>Loading...</div>;
  if (!selectedStudent) return <div>No students found</div>;

  const overallProgress = calculateOverallProgress();
  const recentScores = getRecentScores();
  const gaps = getGaps();

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
              {students.map((s) => (
                <div
                  key={s._id}
                  onClick={() => setSelectedId(s._id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "10px 8px",
                    marginBottom: 10,
                    borderRadius: 10,
                    cursor: "pointer",
                    background: selectedId === s._id ? "#e3f0ff" : "#f6f8fa",
                    color: selectedId === s._id ? "#2b6cb0" : "#333",
                    fontWeight: selectedId === s._id ? 700 : 500,
                    border:
                      selectedId === s._id
                        ? "2px solid #2b6cb0"
                        : "1.5px solid #e3f0ff",
                    transition: "all 0.2s",
                    boxShadow:
                      selectedId === s._id ? "0 2px 8px #2b6cb033" : "none",
                  }}
                >
                  <img
                    src={`https://ui-avatars.com/api/?name=${s.name}&size=38&background=2b6cb0&color=fff&rounded=true`}
                    alt={s.name}
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: "50%",
                      objectFit: "cover",
                      border:
                        selectedId === s._id
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
                src={`https://ui-avatars.com/api/?name=${selectedStudent.name}&size=64&background=2b6cb0&color=fff&rounded=true`}
                alt={selectedStudent.name}
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
                {selectedStudent.name}
              </div>
              <div style={{ marginBottom: 10, fontWeight: 500, color: "#444" }}>
                Overall Progress
              </div>
              <ProgressBar percent={overallProgress} />
              <div
                style={{
                  margin: "10px 0 18px 0",
                  color:
                    overallProgress > 80
                      ? "#38a169"
                      : overallProgress > 60
                        ? "#f6ad55"
                        : "#e53e3e",
                  fontWeight: 600,
                  fontSize: 18,
                }}
              >
                {overallProgress}% Complete
              </div>
              <div style={{ marginBottom: 10, fontWeight: 500, color: "#444" }}>
                Recent Scores
              </div>
              <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
                {recentScores.map((score, idx) => (
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
              {gaps.length === 0 ? (
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
                  {gaps.map((gap, idx) => (
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
