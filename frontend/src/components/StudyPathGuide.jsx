import React, { useState, useEffect } from "react";
import "../App.css";

const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "English",
  "Biology",
  "History",
];

const studyPaths = {
  Mathematics: [
    {
      step: 1,
      title: "Basic Algebra",
      subtopics: ["Variables", "Equations", "Inequalities"],
      completed: false,
    },
    {
      step: 2,
      title: "Geometry",
      subtopics: ["Shapes", "Angles", "Area"],
      completed: false,
    },
    {
      step: 3,
      title: "Trigonometry",
      subtopics: ["Sine", "Cosine", "Tangent"],
      completed: false,
    },
    {
      step: 4,
      title: "Calculus",
      subtopics: ["Limits", "Derivatives", "Integrals"],
      completed: false,
    },
  ],
  Physics: [
    {
      step: 1,
      title: "Motion",
      subtopics: ["Speed", "Velocity", "Acceleration"],
      completed: false,
    },
    {
      step: 2,
      title: "Forces",
      subtopics: ["Gravity", "Friction", "Newton's Laws"],
      completed: false,
    },
    {
      step: 3,
      title: "Energy",
      subtopics: ["Kinetic", "Potential", "Conservation"],
      completed: false,
    },
    {
      step: 4,
      title: "Electricity",
      subtopics: ["Circuits", "Resistance", "Ohm's Law"],
      completed: false,
    },
  ],
  Chemistry: [
    {
      step: 1,
      title: "Atoms & Molecules",
      subtopics: ["Elements", "Compounds", "Periodic Table"],
      completed: false,
    },
    {
      step: 2,
      title: "Acids & Bases",
      subtopics: ["pH", "Reactions", "Neutralization"],
      completed: false,
    },
    {
      step: 3,
      title: "Organic Chemistry",
      subtopics: ["Hydrocarbons", "Functional Groups", "Reactions"],
      completed: false,
    },
    {
      step: 4,
      title: "Physical Chemistry",
      subtopics: ["States of Matter", "Solutions", "Thermodynamics"],
      completed: false,
    },
  ],
  English: [
    {
      step: 1,
      title: "Grammar",
      subtopics: ["Parts of Speech", "Tenses", "Punctuation"],
      completed: false,
    },
    {
      step: 2,
      title: "Vocabulary",
      subtopics: ["Synonyms", "Antonyms", "Idioms"],
      completed: false,
    },
    {
      step: 3,
      title: "Reading Comprehension",
      subtopics: ["Inference", "Main Idea", "Tone"],
      completed: false,
    },
    {
      step: 4,
      title: "Writing",
      subtopics: ["Essays", "Letters", "Creative Writing"],
      completed: false,
    },
  ],
  Biology: [
    {
      step: 1,
      title: "Cell Biology",
      subtopics: ["Cell Structure", "Organelles", "Mitosis"],
      completed: false,
    },
    {
      step: 2,
      title: "Genetics",
      subtopics: ["DNA", "Genes", "Inheritance"],
      completed: false,
    },
    {
      step: 3,
      title: "Ecology",
      subtopics: ["Ecosystems", "Food Chains", "Biodiversity"],
      completed: false,
    },
    {
      step: 4,
      title: "Human Biology",
      subtopics: ["Systems", "Organs", "Homeostasis"],
      completed: false,
    },
  ],
  History: [
    {
      step: 1,
      title: "Ancient History",
      subtopics: ["Civilizations", "Empires", "Inventions"],
      completed: false,
    },
    {
      step: 2,
      title: "Medieval History",
      subtopics: ["Feudalism", "Crusades", "Renaissance"],
      completed: false,
    },
    {
      step: 3,
      title: "Modern History",
      subtopics: ["Industrial Revolution", "World Wars", "Cold War"],
      completed: false,
    },
    {
      step: 4,
      title: "Contemporary History",
      subtopics: ["Globalization", "Technology", "Current Events"],
      completed: false,
    },
  ],
};

function StudyPathGuide() {
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [path, setPath] = useState(studyPaths[subjects[0]]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStudyPath = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `/api/study-paths?subject=${selectedSubject}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
              "Content-Type": "application/json",
            },
          },
        );

        if (response.ok) {
          const data = await response.json();
          setPath(data.studyPath || data);
        } else {
          // Fallback to mock data if API fails
          setPath(studyPaths[selectedSubject]);
        }
      } catch (error) {
        console.error("Error fetching study path:", error);
        // Fallback to mock data
        setPath(studyPaths[selectedSubject]);
      } finally {
        setLoading(false);
      }
    };

    fetchStudyPath();
  }, [selectedSubject]);

  const handleSubjectChange = (e) => {
    const subj = e.target.value;
    setSelectedSubject(subj);
  };

  const toggleCompleted = (stepIdx) => {
    setPath((prev) =>
      prev.map((step, idx) =>
        idx === stepIdx ? { ...step, completed: !step.completed } : step,
      ),
    );
  };

  const completedSteps = path.filter((step) => step.completed).length;
  const progress = Math.round((completedSteps / path.length) * 100);

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
          Step-by-Step Study Path Guide
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
              Select Subject
            </label>
            <select
              value={selectedSubject}
              onChange={handleSubjectChange}
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
              {subjects.map((subj) => (
                <option key={subj} value={subj}>
                  {subj}
                </option>
              ))}
            </select>
          </div>
          {loading ? (
            <div>Loading study path...</div>
          ) : (
            <>
              <div style={{ marginBottom: 24 }}>
                <div
                  style={{
                    fontWeight: 700,
                    color: "#2b6cb0",
                    fontSize: 18,
                    marginBottom: 8,
                  }}
                >
                  Progress
                </div>
                <div
                  style={{
                    background: "#e3f0ff",
                    borderRadius: 8,
                    height: 20,
                    width: "100%",
                    marginBottom: 6,
                  }}
                >
                  <div
                    style={{
                      width: `${progress}%`,
                      background: "#38a169",
                      height: "100%",
                      borderRadius: 8,
                      transition: "width 0.5s",
                    }}
                  ></div>
                </div>
                <div
                  style={{
                    color: "#38a169",
                    fontWeight: 700,
                    textAlign: "center",
                  }}
                >
                  {progress}% Complete ({completedSteps}/{path.length} steps)
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontWeight: 700,
                    color: "#2b6cb0",
                    fontSize: 18,
                    marginBottom: 16,
                  }}
                >
                  Study Path
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                >
                  {path.map((step, idx) => (
                    <div
                      key={step._id || idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        padding: "16px",
                        borderRadius: 12,
                        background: step.completed ? "#e3f0ff" : "#fff",
                        border: "1.5px solid #e3f0ff",
                        boxShadow: step.completed
                          ? "0 2px 8px #2b6cb022"
                          : "none",
                        transition: "all 0.2s",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={step.completed}
                        onChange={() => toggleCompleted(idx)}
                        style={{
                          width: 20,
                          height: 20,
                          cursor: "pointer",
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontWeight: 700,
                            color: "#2b6cb0",
                            fontSize: 16,
                            marginBottom: 4,
                          }}
                        >
                          Step {step.step}: {step.title}
                        </div>
                        <ul
                          style={{
                            color: "#225080",
                            fontWeight: 500,
                            paddingLeft: 18,
                            margin: 0,
                          }}
                        >
                          {step.subtopics.map((sub, i) => (
                            <li key={i}>{sub}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default StudyPathGuide;
