import React, { useState } from "react";
import "../App.css";

const students = [
  {
    id: 1,
    name: "Aarav Sharma",
    grade: "10th",
    overallProgress: 82,
    averageScore: 85,
    subjects: [
      { name: "Mathematics", score: 90, progress: 88 },
      { name: "Physics", score: 80, progress: 75 },
      { name: "Chemistry", score: 85, progress: 85 },
      { name: "English", score: 72, progress: 70 },
    ],
    strengths: ["Strong in Math", "Good problem-solving"],
    weaknesses: ["English comprehension", "Physics concepts"],
    recommendations: ["Focus on English reading", "Practice Physics problems"],
  },
  {
    id: 2,
    name: "Priya Verma",
    grade: "9th",
    overallProgress: 78,
    averageScore: 80,
    subjects: [
      { name: "Mathematics", score: 85, progress: 82 },
      { name: "Physics", score: 75, progress: 70 },
      { name: "Chemistry", score: 80, progress: 78 },
      { name: "English", score: 78, progress: 75 },
    ],
    strengths: ["Consistent performance", "Good in Chemistry"],
    weaknesses: ["Physics basics", "English writing"],
    recommendations: ["Review Physics fundamentals", "Improve writing skills"],
  },
  {
    id: 3,
    name: "Rahul Singh",
    grade: "11th",
    overallProgress: 94,
    averageScore: 92,
    subjects: [
      { name: "Mathematics", score: 95, progress: 96 },
      { name: "Physics", score: 90, progress: 92 },
      { name: "Chemistry", score: 92, progress: 94 },
      { name: "English", score: 88, progress: 90 },
    ],
    strengths: ["Excellent in all subjects", "High motivation"],
    weaknesses: ["None significant"],
    recommendations: ["Continue current pace", "Explore advanced topics"],
  },
];

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

function ReportGenerator() {
  const [selectedStudent, setSelectedStudent] = useState(students[0]);
  const [generated, setGenerated] = useState(false);

  const handleStudentChange = (e) => {
    const student = students.find((s) => s.id === parseInt(e.target.value));
    setSelectedStudent(student);
    setGenerated(false);
  };

  const handleGenerate = () => {
    setGenerated(true);
  };

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
          maxWidth: 900,
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
          Automated Student Report Generator
        </h2>
        <div
          style={{
            background: "#fff",
            borderRadius: 18,
            border: "1.5px solid #e3f0ff",
            boxShadow: "0 4px 24px rgba(43,108,176,0.09)",
            padding: 32,
            marginBottom: 32,
          }}
        >
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontWeight: 600, color: "#2b6cb0", fontSize: 18 }}>
              Select Student
            </label>
            <select
              value={selectedStudent.id}
              onChange={handleStudentChange}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 8,
                border: "1.5px solid #e3f0ff",
                fontWeight: 600,
                color: "#225080",
                marginTop: 8,
                fontSize: 16,
              }}
            >
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name} - {student.grade}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleGenerate}
            style={{
              width: "100%",
              padding: "14px 0",
              background: "#2b6cb0",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 16,
              cursor: "pointer",
              boxShadow: "0 2px 8px #2b6cb033",
              transition: "all 0.2s",
            }}
          >
            Generate Report
          </button>
        </div>
        {generated && (
          <div
            style={{
              background: "#fff",
              borderRadius: 18,
              border: "1.5px solid #e3f0ff",
              boxShadow: "0 4px 24px rgba(43,108,176,0.09)",
              padding: 32,
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <h3 style={{ color: "#2b6cb0", fontWeight: 800, fontSize: 24 }}>
                Student Report
              </h3>
              <p style={{ color: "#444", fontWeight: 600 }}>
                Generated on {new Date().toLocaleDateString()}
              </p>
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
                  style={{
                    fontWeight: 700,
                    color: "#2b6cb0",
                    fontSize: 18,
                    marginBottom: 8,
                  }}
                >
                  {selectedStudent.name}
                </div>
                <div style={{ color: "#444", fontWeight: 600 }}>
                  Grade: {selectedStudent.grade}
                </div>
                <div style={{ color: "#444", fontWeight: 600 }}>
                  Overall Progress: {selectedStudent.overallProgress}%
                </div>
                <div style={{ color: "#444", fontWeight: 600 }}>
                  Average Score: {selectedStudent.averageScore}
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div
                  style={{ fontWeight: 600, color: "#444", marginBottom: 8 }}
                >
                  Subject Performance
                </div>
                {selectedStudent.subjects.map((subj, idx) => (
                  <div key={idx} style={{ marginBottom: 12 }}>
                    <div
                      style={{
                        fontWeight: 700,
                        color: "#2b6cb0",
                        fontSize: 14,
                      }}
                    >
                      {subj.name}
                    </div>
                    <ProgressBar percent={subj.progress} color="#f6ad55" />
                    <div
                      style={{
                        color: "#f6ad55",
                        fontWeight: 600,
                        fontSize: 12,
                        marginTop: 4,
                      }}
                    >
                      Score: {subj.score} | Progress: {subj.progress}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontWeight: 600, color: "#444", marginBottom: 8 }}>
                Strengths
              </div>
              <ul
                style={{ color: "#38a169", fontWeight: 600, paddingLeft: 18 }}
              >
                {selectedStudent.strengths.map((str, idx) => (
                  <li key={idx}>{str}</li>
                ))}
              </ul>
            </div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontWeight: 600, color: "#444", marginBottom: 8 }}>
                Areas for Improvement
              </div>
              <ul
                style={{ color: "#e53e3e", fontWeight: 600, paddingLeft: 18 }}
              >
                {selectedStudent.weaknesses.map((weak, idx) => (
                  <li key={idx}>{weak}</li>
                ))}
              </ul>
            </div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontWeight: 600, color: "#444", marginBottom: 8 }}>
                Recommendations
              </div>
              <ul
                style={{ color: "#2b6cb0", fontWeight: 600, paddingLeft: 18 }}
              >
                {selectedStudent.recommendations.map((rec, idx) => (
                  <li key={idx}>{rec}</li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => alert("Report downloaded (mock functionality)")}
              style={{
                width: "100%",
                padding: "12px 0",
                background: "#38a169",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 16,
                cursor: "pointer",
                boxShadow: "0 2px 8px #38a16933",
                transition: "all 0.2s",
              }}
            >
              Download PDF
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default ReportGenerator;
