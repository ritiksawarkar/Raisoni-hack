import React, { useState } from "react";
import "../App.css";

const mockStudents = [
  {
    id: 1,
    name: "Aarav Sharma",
    grade: "10th",
    subjects: ["Mathematics", "Physics"],
    availability: "Evenings",
    interests: "Problem-solving, Science projects",
    profilePic: "https://via.placeholder.com/80x80?text=A",
  },
  {
    id: 2,
    name: "Priya Verma",
    grade: "9th",
    subjects: ["Chemistry", "English"],
    availability: "Weekends",
    interests: "Literature, Experiments",
    profilePic: "https://via.placeholder.com/80x80?text=P",
  },
  {
    id: 3,
    name: "Rahul Singh",
    grade: "11th",
    subjects: ["Mathematics", "Chemistry"],
    availability: "Evenings",
    interests: "Advanced math, Coding",
    profilePic: "https://via.placeholder.com/80x80?text=R",
  },
  {
    id: 4,
    name: "Sneha Patel",
    grade: "10th",
    subjects: ["Physics", "English"],
    availability: "Mornings",
    interests: "Writing, Physics simulations",
    profilePic: "https://via.placeholder.com/80x80?text=S",
  },
];

function StudyMatchmaker() {
  const [userGrade, setUserGrade] = useState("10th");
  const [userSubjects, setUserSubjects] = useState([]);
  const [userAvailability, setUserAvailability] = useState("Evenings");
  const [matches, setMatches] = useState([]);
  const [searched, setSearched] = useState(false);

  const subjects = ["Mathematics", "Physics", "Chemistry", "English"];

  const handleSubjectChange = (subject) => {
    setUserSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject],
    );
  };

  const handleFindMatches = () => {
    const filtered = mockStudents.filter(
      (student) =>
        student.grade === userGrade &&
        student.availability === userAvailability &&
        userSubjects.some((subj) => student.subjects.includes(subj)),
    );
    setMatches(filtered);
    setSearched(true);
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
          Student-to-Student Study Matchmaker
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
              Your Grade
            </label>
            <select
              value={userGrade}
              onChange={(e) => setUserGrade(e.target.value)}
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
              <option value="9th">9th</option>
              <option value="10th">10th</option>
              <option value="11th">11th</option>
              <option value="12th">12th</option>
            </select>
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontWeight: 600, color: "#2b6cb0", fontSize: 18 }}>
              Subjects of Interest
            </label>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                marginTop: 8,
              }}
            >
              {subjects.map((subject) => (
                <label
                  key={subject}
                  style={{ display: "flex", alignItems: "center", gap: 8 }}
                >
                  <input
                    type="checkbox"
                    checked={userSubjects.includes(subject)}
                    onChange={() => handleSubjectChange(subject)}
                    style={{ accentColor: "#2b6cb0" }}
                  />
                  <span style={{ fontWeight: 600, color: "#444" }}>
                    {subject}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontWeight: 600, color: "#2b6cb0", fontSize: 18 }}>
              Availability
            </label>
            <select
              value={userAvailability}
              onChange={(e) => setUserAvailability(e.target.value)}
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
              <option value="Mornings">Mornings</option>
              <option value="Evenings">Evenings</option>
              <option value="Weekends">Weekends</option>
            </select>
          </div>
          <button
            onClick={handleFindMatches}
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
            Find Study Matches
          </button>
        </div>
        {searched && (
          <div
            style={{
              background: "#fff",
              borderRadius: 18,
              border: "1.5px solid #e3f0ff",
              boxShadow: "0 4px 24px rgba(43,108,176,0.09)",
              padding: 32,
            }}
          >
            <h3
              style={{
                color: "#2b6cb0",
                fontWeight: 800,
                fontSize: 24,
                marginBottom: 24,
              }}
            >
              Study Matches ({matches.length})
            </h3>
            {matches.length === 0 ? (
              <p style={{ color: "#666", fontWeight: 600 }}>
                No matches found. Try adjusting your preferences.
              </p>
            ) : (
              <div
                style={{ display: "flex", flexDirection: "column", gap: 20 }}
              >
                {matches.map((match) => (
                  <div
                    key={match.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      padding: 16,
                      border: "1px solid #e3f0ff",
                      borderRadius: 12,
                      background: "#f8fbff",
                    }}
                  >
                    <img
                      src={match.profilePic}
                      alt={match.name}
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        border: "2px solid #2b6cb0",
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontWeight: 700,
                          color: "#2b6cb0",
                          fontSize: 18,
                        }}
                      >
                        {match.name}
                      </div>
                      <div style={{ color: "#444", fontWeight: 600 }}>
                        Grade: {match.grade}
                      </div>
                      <div style={{ color: "#444", fontWeight: 600 }}>
                        Subjects: {match.subjects.join(", ")}
                      </div>
                      <div style={{ color: "#444", fontWeight: 600 }}>
                        Availability: {match.availability}
                      </div>
                      <div style={{ color: "#666", fontSize: 14 }}>
                        Interests: {match.interests}
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        alert(`Connected with ${match.name}! (Mock)`)
                      }
                      style={{
                        padding: "10px 16px",
                        background: "#38a169",
                        color: "#fff",
                        border: "none",
                        borderRadius: 8,
                        fontWeight: 700,
                        cursor: "pointer",
                        boxShadow: "0 2px 8px #38a16933",
                        transition: "all 0.2s",
                      }}
                    >
                      Connect
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default StudyMatchmaker;
