import React from "react";
import "../App.css";

const mockAnalytics = {
  averageScore: 81,
  bestSubject: "Mathematics",
  weakestSubject: "English",
  improvement: 12,
  scores: [65, 72, 78, 81, 85, 90, 92],
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  insights: [
    "Consistent improvement in Mathematics.",
    "English scores need attention.",
    "Best performance in June and July.",
    "Overall upward trend in scores.",
  ],
};

function SimpleBarChart({ data, labels }) {
  const max = Math.max(...data, 100);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        height: 140,
        gap: 18,
        margin: "1.5rem 0 0.5rem 0",
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
              width: 28,
              background: "linear-gradient(180deg,#2b6cb0 60%,#e3f0ff 100%)",
              borderRadius: 8,
              marginBottom: 6,
              transition: "height 0.5s",
              boxShadow: "0 2px 8px #2b6cb022",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 700,
              fontSize: 15,
            }}
            title={val}
          >
            <span
              style={{
                position: "relative",
                top: -22,
                color: "#2b6cb0",
                fontWeight: 700,
              }}
            >
              {val}
            </span>
          </div>
          <div style={{ fontSize: 13, color: "#225080", fontWeight: 600 }}>
            {labels[idx]}
          </div>
        </div>
      ))}
    </div>
  );
}

function PerformanceAnalytics() {
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
          Automated Performance Analytics & Insight Generator
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
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 32,
              justifyContent: "space-between",
            }}
          >
            <div style={{ flex: 1, minWidth: 220 }}>
              <div
                style={{
                  fontWeight: 700,
                  color: "#2b6cb0",
                  fontSize: 18,
                  marginBottom: 8,
                }}
              >
                Average Score
              </div>
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  color: "#38a169",
                  marginBottom: 10,
                }}
              >
                {mockAnalytics.averageScore}
              </div>
              <div style={{ fontWeight: 600, color: "#444", marginBottom: 6 }}>
                Best Subject:{" "}
                <span style={{ color: "#2b6cb0" }}>
                  {mockAnalytics.bestSubject}
                </span>
              </div>
              <div style={{ fontWeight: 600, color: "#444" }}>
                Weakest Subject:{" "}
                <span style={{ color: "#e53e3e" }}>
                  {mockAnalytics.weakestSubject}
                </span>
              </div>
              <div style={{ fontWeight: 600, color: "#444", marginTop: 10 }}>
                Improvement:{" "}
                <span style={{ color: "#2b6cb0" }}>
                  +{mockAnalytics.improvement}%
                </span>
              </div>
            </div>
            <div style={{ flex: 2, minWidth: 260 }}>
              <div
                style={{
                  fontWeight: 700,
                  color: "#2b6cb0",
                  fontSize: 18,
                  marginBottom: 8,
                }}
              >
                Score Trend
              </div>
              <SimpleBarChart
                data={mockAnalytics.scores}
                labels={mockAnalytics.labels}
              />
            </div>
          </div>
          <div style={{ marginTop: 18 }}>
            <div
              style={{
                fontWeight: 700,
                color: "#2b6cb0",
                fontSize: 18,
                marginBottom: 8,
              }}
            >
              Insights
            </div>
            <ul
              style={{
                color: "#225080",
                fontWeight: 600,
                fontSize: 16,
                paddingLeft: 22,
                margin: 0,
              }}
            >
              {mockAnalytics.insights.map((insight, idx) => (
                <li key={idx} style={{ marginBottom: 6 }}>
                  {insight}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PerformanceAnalytics;
