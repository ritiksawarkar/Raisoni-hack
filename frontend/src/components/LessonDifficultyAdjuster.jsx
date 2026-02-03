import React, { useState, useEffect } from "react";
import "../App.css";

const mockLessons = [
  {
    _id: 1,
    title: "Algebra: Linear Equations",
    subject: "Mathematics",
    currentLevel: "Medium",
    recommendedLevel: "Hard",
    lastScore: 92,
    attempts: 3,
  },
  {
    _id: 2,
    title: "Physics: Motion & Forces",
    subject: "Physics",
    currentLevel: "Easy",
    recommendedLevel: "Medium",
    lastScore: 78,
    attempts: 2,
  },
  {
    _id: 3,
    title: "English: Reading Comprehension",
    subject: "English",
    currentLevel: "Hard",
    recommendedLevel: "Medium",
    lastScore: 61,
    attempts: 4,
  },
  {
    _id: 4,
    title: "Chemistry: Acids & Bases",
    subject: "Chemistry",
    currentLevel: "Medium",
    recommendedLevel: "Medium",
    lastScore: 80,
    attempts: 1,
  },
];

const levelColors = {
  Easy: "#38a169",
  Medium: "#f6ad55",
  Hard: "#e53e3e",
};

function LevelBadge({ level }) {
  return (
    <span
      style={{
        background: levelColors[level] + "22",
        color: levelColors[level],
        borderRadius: 8,
        padding: "4px 12px",
        fontWeight: 700,
        fontSize: 15,
        marginLeft: 6,
        marginRight: 6,
        border: `1.5px solid ${levelColors[level]}`,
      }}
    >
      {level}
    </span>
  );
}

function LessonDifficultyAdjuster() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adjusted, setAdjusted] = useState({});

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/lessons");
        if (!response.ok) {
          throw new Error("Failed to fetch lessons");
        }
        const data = await response.json();
        if (data.length > 0) {
          setLessons(data);
        } else {
          setLessons(mockLessons);
        }
      } catch (err) {
        console.log("Using mock lessons data as fallback:", err.message);
        setLessons(mockLessons);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  const handleAdjust = (id) => {
    setAdjusted((prev) => ({ ...prev, [id]: true }));
    setLessons((prev) =>
      prev.map((l) =>
        l._id === id ? { ...l, currentLevel: l.recommendedLevel } : l,
      ),
    );
  };

  if (loading) return <div>Loading...</div>;

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
          Automatic Lesson Difficulty Adjuster
        </h2>
        <div
          style={{
            background: "#fff",
            borderRadius: 18,
            border: "1.5px solid #e3f0ff",
            boxShadow: "0 4px 24px rgba(43,108,176,0.09)",
            padding: 32,
            minHeight: 260,
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          {lessons.map((lesson) => (
            <div
              key={lesson._id || lesson.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "18px 0",
                borderBottom: "1px solid #e3f0ff",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <div style={{ flex: 2, minWidth: 180 }}>
                <div
                  style={{ fontWeight: 700, fontSize: 18, color: "#2b6cb0" }}
                >
                  {lesson.title}
                </div>
                <div
                  style={{
                    color: "#444",
                    fontWeight: 500,
                    fontSize: 15,
                    marginTop: 2,
                  }}
                >
                  Attempts:{" "}
                  <span style={{ color: "#2b6cb0", fontWeight: 700 }}>
                    {lesson.attempts}
                  </span>
                  {"  |  "}Last Score:{" "}
                  <span style={{ color: "#2b6cb0", fontWeight: 700 }}>
                    {lesson.lastScore}
                  </span>
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 120, textAlign: "center" }}>
                <span style={{ fontWeight: 500, color: "#444" }}>Current:</span>
                <LevelBadge level={lesson.currentLevel} />
              </div>
              <div style={{ flex: 1, minWidth: 120, textAlign: "center" }}>
                <span style={{ fontWeight: 500, color: "#444" }}>
                  Recommended:
                </span>
                <LevelBadge level={lesson.recommendedLevel} />
              </div>
              <div style={{ minWidth: 120, textAlign: "center" }}>
                {lesson.currentLevel !== lesson.recommendedLevel ? (
                  <button
                    onClick={() => handleAdjust(lesson.id)}
                    disabled={adjusted[lesson.id]}
                    style={{
                      background: adjusted[lesson.id] ? "#e3f0ff" : "#2b6cb0",
                      color: adjusted[lesson.id] ? "#2b6cb0" : "#fff",
                      border: "none",
                      borderRadius: 8,
                      padding: "8px 20px",
                      fontWeight: 700,
                      fontSize: 15,
                      cursor: adjusted[lesson.id] ? "not-allowed" : "pointer",
                      boxShadow: adjusted[lesson.id]
                        ? "none"
                        : "0 2px 8px #2b6cb033",
                      transition: "all 0.2s",
                    }}
                  >
                    {adjusted[lesson.id] ? "Adjusted" : "Adjust"}
                  </button>
                ) : (
                  <span
                    style={{ color: "#38a169", fontWeight: 700, fontSize: 15 }}
                  >
                    Perfect!
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LessonDifficultyAdjuster;
