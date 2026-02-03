import React, { useState } from "react";
import "../App.css";

const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "English",
  "Biology",
  "History",
];

const topics = {
  Mathematics: ["Algebra", "Geometry", "Trigonometry", "Calculus"],
  Physics: ["Motion", "Forces", "Optics", "Electricity"],
  Chemistry: ["Acids & Bases", "Organic", "Inorganic", "Physical"],
  English: ["Grammar", "Comprehension", "Writing", "Vocabulary"],
  Biology: ["Genetics", "Ecology", "Anatomy", "Botany"],
  History: ["Ancient", "Medieval", "Modern", "World Wars"],
};

const mockQuestions = [
  {
    q: "What is the value of x in the equation 2x + 3 = 11?",
    options: ["2", "3", "4", "5"],
    answer: "4",
  },
  {
    q: "Which law explains the relationship between force, mass, and acceleration?",
    options: [
      "Newton's First Law",
      "Newton's Second Law",
      "Newton's Third Law",
      "Law of Gravitation",
    ],
    answer: "Newton's Second Law",
  },
  {
    q: "What is the chemical formula for water?",
    options: ["CO2", "H2O", "O2", "NaCl"],
    answer: "H2O",
  },
  {
    q: "Who wrote 'Romeo and Juliet'?",
    options: [
      "Charles Dickens",
      "William Shakespeare",
      "Jane Austen",
      "Mark Twain",
    ],
    answer: "William Shakespeare",
  },
  {
    q: "What is the powerhouse of the cell?",
    options: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"],
    answer: "Mitochondria",
  },
];

function MockTestCreator() {
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [selectedTopic, setSelectedTopic] = useState(topics[subjects[0]][0]);
  const [questionCount, setQuestionCount] = useState(3);
  const [showTest, setShowTest] = useState(false);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
    setSelectedTopic(topics[e.target.value][0]);
  };

  const handleTopicChange = (e) => {
    setSelectedTopic(e.target.value);
  };

  const handleCountChange = (e) => {
    setQuestionCount(Number(e.target.value));
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    setShowTest(true);
    setAnswers({});
    setScore(null);
  };

  const handleAnswerChange = (qIdx, answer) => {
    setAnswers((prev) => ({ ...prev, [qIdx]: answer }));
  };

  const handleSubmitQuiz = () => {
    const questions = mockQuestions.slice(0, questionCount);
    let correct = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.answer) correct++;
    });
    setScore(correct);
  };

  const questions = mockQuestions.slice(0, questionCount);

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
          maxWidth: 700,
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
            fontSize: 28,
            marginBottom: 24,
            letterSpacing: 1,
          }}
        >
          AI-Generated Personalized Mock Test Creator
        </h2>
        <form
          onSubmit={handleGenerate}
          style={{
            background: "#fff",
            borderRadius: 18,
            border: "1.5px solid #e3f0ff",
            boxShadow: "0 4px 24px rgba(43,108,176,0.09)",
            padding: 32,
            marginBottom: 32,
            display: "flex",
            flexDirection: "column",
            gap: 22,
          }}
        >
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 160 }}>
              <label style={{ fontWeight: 600, color: "#2b6cb0" }}>
                Subject
              </label>
              <select
                value={selectedSubject}
                onChange={handleSubjectChange}
                style={{
                  width: "100%",
                  padding: "8px 10px",
                  borderRadius: 8,
                  border: "1.5px solid #e3f0ff",
                  fontWeight: 600,
                  color: "#225080",
                  marginTop: 6,
                }}
              >
                {subjects.map((subj) => (
                  <option key={subj} value={subj}>
                    {subj}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ flex: 1, minWidth: 160 }}>
              <label style={{ fontWeight: 600, color: "#2b6cb0" }}>Topic</label>
              <select
                value={selectedTopic}
                onChange={handleTopicChange}
                style={{
                  width: "100%",
                  padding: "8px 10px",
                  borderRadius: 8,
                  border: "1.5px solid #e3f0ff",
                  fontWeight: 600,
                  color: "#225080",
                  marginTop: 6,
                }}
              >
                {topics[selectedSubject].map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ flex: 1, minWidth: 120 }}>
              <label style={{ fontWeight: 600, color: "#2b6cb0" }}>
                Questions
              </label>
              <input
                type="number"
                min={1}
                max={5}
                value={questionCount}
                onChange={handleCountChange}
                style={{
                  width: "100%",
                  padding: "8px 10px",
                  borderRadius: 8,
                  border: "1.5px solid #e3f0ff",
                  fontWeight: 600,
                  color: "#225080",
                  marginTop: 6,
                }}
              />
            </div>
          </div>
          <button
            type="submit"
            style={{
              background: "#2b6cb0",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "12px 0",
              fontWeight: 700,
              fontSize: 16,
              marginTop: 10,
              cursor: "pointer",
              boxShadow: "0 2px 8px #2b6cb033",
              transition: "all 0.2s",
            }}
          >
            Generate Mock Test
          </button>
        </form>
        {showTest && (
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
            <div
              style={{
                fontWeight: 700,
                color: "#2b6cb0",
                fontSize: 20,
                marginBottom: 18,
              }}
            >
              Mock Test Quiz
            </div>
            <div style={{ color: "#444", fontWeight: 600, marginBottom: 10 }}>
              Subject:{" "}
              <span style={{ color: "#2b6cb0" }}>{selectedSubject}</span> |
              Topic: <span style={{ color: "#2b6cb0" }}>{selectedTopic}</span>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmitQuiz();
              }}
            >
              <ol
                style={{
                  paddingLeft: 22,
                  color: "#225080",
                  fontWeight: 600,
                  fontSize: 16,
                }}
              >
                {questions.map((q, idx) => (
                  <li key={idx} style={{ marginBottom: 18 }}>
                    <div style={{ marginBottom: 6 }}>{q.q}</div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 4,
                      }}
                    >
                      {q.options.map((opt, i) => (
                        <label
                          key={i}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
                          <input
                            type="radio"
                            name={`q${idx}`}
                            value={opt}
                            onChange={() => handleAnswerChange(idx, opt)}
                            checked={answers[idx] === opt}
                            style={{ margin: 0 }}
                          />
                          <span style={{ color: "#2b6cb0", fontWeight: 500 }}>
                            {opt}
                          </span>
                        </label>
                      ))}
                    </div>
                  </li>
                ))}
              </ol>
              <button
                type="submit"
                style={{
                  background: "#2b6cb0",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "12px 24px",
                  fontWeight: 700,
                  fontSize: 16,
                  marginTop: 18,
                  cursor: "pointer",
                  boxShadow: "0 2px 8px #2b6cb033",
                  transition: "all 0.2s",
                }}
              >
                Submit Quiz
              </button>
            </form>
            {score !== null && (
              <div
                style={{
                  marginTop: 18,
                  padding: 16,
                  background: "#e3f0ff",
                  borderRadius: 8,
                  fontWeight: 700,
                  color: "#2b6cb0",
                  textAlign: "center",
                }}
              >
                Your Score: {score} / {questionCount} (
                {Math.round((score / questionCount) * 100)}%)
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default MockTestCreator;
