const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/ai-learning")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Student Schema
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  grade: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // If tied to teacher/user
  createdAt: { type: Date, default: Date.now },
});

// Progress Schema
const progressSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  subject: { type: String, required: true },
  score: { type: Number, required: true },
  progress: { type: Number, required: true }, // percentage
  gaps: { type: [String], default: [] }, // learning gaps
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
const Student = mongoose.model("Student", studentSchema);
const Progress = mongoose.model("Progress", progressSchema);

// Lesson Schema
const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  currentLevel: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    default: "Medium",
  },
  recommendedLevel: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    default: "Medium",
  },
  lastScore: { type: Number, default: 0 },
  attempts: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

// Question Schema
const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  answer: { type: String, required: true },
  subject: { type: String, required: true },
  topic: { type: String, required: true },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    default: "Medium",
  },
  createdAt: { type: Date, default: Date.now },
});

// Study Path Schema
const studyPathSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  steps: [
    {
      step: { type: Number, required: true },
      title: { type: String, required: true },
      subtopics: [{ type: String }],
      completed: { type: Boolean, default: false },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

// Audit Log Schema
const auditLogSchema = new mongoose.Schema({
  action: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  user: { type: String, required: true },
  details: { type: String },
  ipAddress: { type: String },
});

// Privacy Settings Schema
const privacySettingsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  dataSharing: { type: Boolean, default: false },
  analytics: { type: Boolean, default: true },
  notifications: { type: Boolean, default: true },
  accessLevel: {
    type: String,
    enum: ["Public", "Restricted", "Private"],
    default: "Restricted",
  },
  createdAt: { type: Date, default: Date.now },
});

const Lesson = mongoose.model("Lesson", lessonSchema);
const Question = mongoose.model("Question", questionSchema);
const StudyPath = mongoose.model("StudyPath", studyPathSchema);
const AuditLog = mongoose.model("AuditLog", auditLogSchema);
const PrivacySettings = mongoose.model(
  "PrivacySettings",
  privacySettingsSchema,
);

// Routes
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    // Create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" },
    );

    res.status(201).json({
      message: "User created successfully",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" },
    );

    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Middleware to verify token
const auth = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

// Protected route example
app.get("/api/auth/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Student routes
app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students" });
  }
});

app.post("/api/students", async (req, res) => {
  const { name, grade } = req.body;
  try {
    const student = new Student({ name, grade });
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: "Error creating student" });
  }
});

// Progress routes
app.get("/api/students/:id/progress", async (req, res) => {
  try {
    const progress = await Progress.find({ studentId: req.params.id });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: "Error fetching progress" });
  }
});

app.post("/api/students/:id/progress", async (req, res) => {
  const { subject, score, progress: prog, gaps } = req.body;
  try {
    const newProgress = new Progress({
      studentId: req.params.id,
      subject,
      score,
      progress: prog,
      gaps,
    });
    await newProgress.save();
    res.status(201).json(newProgress);
  } catch (error) {
    res.status(500).json({ message: "Error updating progress" });
  }
});

app.post("/api/seed", async (req, res) => {
  try {
    // Create a sample user
    const user = new User({
      name: "Teacher One",
      email: "teacher@example.com",
      password: await bcrypt.hash("password", 10),
    });
    await user.save();

    // Create students
    const students = [
      { name: "Aarav Sharma", grade: "10th" },
      { name: "Priya Verma", grade: "9th" },
      { name: "Rahul Singh", grade: "11th" },
      { name: "Sara Khan", grade: "10th" },
    ];

    const createdStudents = [];
    for (const s of students) {
      const student = new Student({ ...s, userId: user._id });
      await student.save();
      createdStudents.push(student);
    }

    // Create progress
    const progressData = [
      {
        studentId: createdStudents[0]._id,
        subject: "Math",
        score: 80,
        progress: 82,
        gaps: ["Algebra: Quadratic Equations"],
      },
      {
        studentId: createdStudents[0]._id,
        subject: "Physics",
        score: 85,
        progress: 78,
        gaps: ["Newton's Laws"],
      },
      {
        studentId: createdStudents[1]._id,
        subject: "English",
        score: 65,
        progress: 68,
        gaps: ["Comprehension"],
      },
      {
        studentId: createdStudents[1]._id,
        subject: "Math",
        score: 70,
        progress: 60,
        gaps: ["Geometry"],
      },
      {
        studentId: createdStudents[2]._id,
        subject: "Science",
        score: 92,
        progress: 94,
        gaps: [],
      },
      {
        studentId: createdStudents[3]._id,
        subject: "Chemistry",
        score: 70,
        progress: 74,
        gaps: ["Acids & Bases"],
      },
    ];

    for (const p of progressData) {
      const progress = new Progress(p);
      await progress.save();
    }

    // Create lessons
    const lessonsData = [
      {
        title: "Algebra: Linear Equations",
        subject: "Mathematics",
        currentLevel: "Medium",
        recommendedLevel: "Hard",
        lastScore: 92,
        attempts: 3,
      },
      {
        title: "Physics: Motion & Forces",
        subject: "Physics",
        currentLevel: "Easy",
        recommendedLevel: "Medium",
        lastScore: 78,
        attempts: 2,
      },
      {
        title: "English: Reading Comprehension",
        subject: "English",
        currentLevel: "Hard",
        recommendedLevel: "Medium",
        lastScore: 61,
        attempts: 4,
      },
      {
        title: "Chemistry: Acids & Bases",
        subject: "Chemistry",
        currentLevel: "Medium",
        recommendedLevel: "Medium",
        lastScore: 80,
        attempts: 1,
      },
    ];

    for (const l of lessonsData) {
      const lesson = new Lesson(l);
      await lesson.save();
    }

    // Create questions
    const questionsData = [
      {
        question: "What is the value of x in the equation 2x + 3 = 11?",
        options: ["2", "3", "4", "5"],
        answer: "4",
        subject: "Mathematics",
        topic: "Algebra",
        difficulty: "Easy",
      },
      {
        question:
          "Which law explains the relationship between force, mass, and acceleration?",
        options: [
          "Newton's First Law",
          "Newton's Second Law",
          "Newton's Third Law",
          "Law of Gravitation",
        ],
        answer: "Newton's Second Law",
        subject: "Physics",
        topic: "Motion",
        difficulty: "Medium",
      },
      {
        question: "What is the chemical formula for water?",
        options: ["CO2", "H2O", "O2", "NaCl"],
        answer: "H2O",
        subject: "Chemistry",
        topic: "Acids & Bases",
        difficulty: "Easy",
      },
      {
        question: "Who wrote 'Romeo and Juliet'?",
        options: [
          "Charles Dickens",
          "William Shakespeare",
          "Jane Austen",
          "Mark Twain",
        ],
        answer: "William Shakespeare",
        subject: "English",
        topic: "Literature",
        difficulty: "Medium",
      },
      {
        question: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"],
        answer: "Mitochondria",
        subject: "Biology",
        topic: "Genetics",
        difficulty: "Medium",
      },
    ];

    for (const q of questionsData) {
      const question = new Question(q);
      await question.save();
    }

    // Create study paths
    const studyPathsData = [
      {
        subject: "Mathematics",
        steps: [
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
      },
      {
        subject: "Physics",
        steps: [
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
        ],
      },
    ];

    for (const sp of studyPathsData) {
      const studyPath = new StudyPath(sp);
      await studyPath.save();
    }

    // Create audit logs
    const auditLogsData = [
      {
        action: "Data accessed by teacher",
        user: "Teacher John",
        details: "Viewed student progress",
      },
      {
        action: "Privacy settings updated",
        user: "Student Aarav",
        details: "Changed notification preferences",
      },
      {
        action: "Report generated",
        user: "System",
        details: "Monthly progress report",
      },
      {
        action: "Data encrypted",
        user: "Admin",
        details: "Database backup completed",
      },
    ];

    for (const log of auditLogsData) {
      const auditLog = new AuditLog(log);
      await auditLog.save();
    }

    // Create privacy settings
    const privacySettings = new PrivacySettings({
      dataSharing: false,
      analytics: true,
      notifications: true,
      accessLevel: "Restricted",
    });
    await privacySettings.save();

    res.json({ message: "Data seeded successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error seeding data" });
  }
});

// Lesson routes
app.get("/api/lessons", async (req, res) => {
  try {
    const lessons = await Lesson.find();
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ message: "Error fetching lessons" });
  }
});

app.post("/api/lessons", async (req, res) => {
  const {
    title,
    subject,
    currentLevel,
    recommendedLevel,
    lastScore,
    attempts,
  } = req.body;
  try {
    const lesson = new Lesson({
      title,
      subject,
      currentLevel,
      recommendedLevel,
      lastScore,
      attempts,
    });
    await lesson.save();
    res.status(201).json(lesson);
  } catch (error) {
    res.status(500).json({ message: "Error creating lesson" });
  }
});

// Question routes
app.get("/api/questions", async (req, res) => {
  try {
    const { subject, topic, difficulty } = req.query;
    let query = {};
    if (subject) query.subject = subject;
    if (topic) query.topic = topic;
    if (difficulty) query.difficulty = difficulty;

    const questions = await Question.find(query);
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching questions" });
  }
});

app.post("/api/questions", async (req, res) => {
  const { question, options, answer, subject, topic, difficulty } = req.body;
  try {
    const newQuestion = new Question({
      question,
      options,
      answer,
      subject,
      topic,
      difficulty,
    });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ message: "Error creating question" });
  }
});

// Study Path routes
app.get("/api/study-paths", async (req, res) => {
  try {
    const { subject } = req.query;
    let query = {};
    if (subject) query.subject = subject;

    const studyPaths = await StudyPath.find(query);
    res.json(studyPaths);
  } catch (error) {
    res.status(500).json({ message: "Error fetching study paths" });
  }
});

app.post("/api/study-paths", async (req, res) => {
  const { subject, steps } = req.body;
  try {
    const studyPath = new StudyPath({ subject, steps });
    await studyPath.save();
    res.status(201).json(studyPath);
  } catch (error) {
    res.status(500).json({ message: "Error creating study path" });
  }
});

// Analytics routes
app.get("/api/analytics", async (req, res) => {
  try {
    const progressData = await Progress.find();

    if (progressData.length === 0) {
      return res.json({
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
      });
    }

    const subjectStats = {};
    progressData.forEach((p) => {
      if (!subjectStats[p.subject]) {
        subjectStats[p.subject] = { total: 0, count: 0 };
      }
      subjectStats[p.subject].total += p.score;
      subjectStats[p.subject].count += 1;
    });

    const subjectAverages = Object.entries(subjectStats).map(
      ([subject, stats]) => ({
        subject,
        average: Math.round(stats.total / stats.count),
      }),
    );

    const bestSubject = subjectAverages.reduce(
      (best, current) => (current.average > best.average ? current : best),
      subjectAverages[0],
    );

    const weakestSubject = subjectAverages.reduce(
      (weakest, current) =>
        current.average < weakest.average ? current : weakest,
      subjectAverages[0],
    );

    const averageScore = Math.round(
      subjectAverages.reduce((sum, s) => sum + s.average, 0) /
        subjectAverages.length,
    );

    res.json({
      averageScore,
      bestSubject: bestSubject.subject,
      weakestSubject: weakestSubject.subject,
      improvement: 12,
      scores: subjectAverages.map((s) => s.average),
      labels: subjectAverages.map((s) => s.subject),
      insights: [
        `Consistent improvement in ${bestSubject.subject}`,
        `${weakestSubject.subject} scores need attention`,
        "Overall upward trend in scores",
      ],
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching analytics" });
  }
});

// Audit Log routes
app.get("/api/audit-logs", async (req, res) => {
  try {
    const logs = await AuditLog.find().sort({ timestamp: -1 }).limit(50);
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching audit logs" });
  }
});

app.post("/api/audit-logs", async (req, res) => {
  const { action, user, details, ipAddress } = req.body;
  try {
    const log = new AuditLog({ action, user, details, ipAddress });
    await log.save();
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ message: "Error creating audit log" });
  }
});

// Privacy Settings routes
app.get("/api/privacy-settings", async (req, res) => {
  try {
    const settings = (await PrivacySettings.findOne()) || {
      dataSharing: false,
      analytics: true,
      notifications: true,
      accessLevel: "Restricted",
    };
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching privacy settings" });
  }
});

app.post("/api/privacy-settings", async (req, res) => {
  const { dataSharing, analytics, notifications, accessLevel } = req.body;
  try {
    let settings = await PrivacySettings.findOne();
    if (settings) {
      settings.dataSharing = dataSharing;
      settings.analytics = analytics;
      settings.notifications = notifications;
      settings.accessLevel = accessLevel;
      await settings.save();
    } else {
      settings = new PrivacySettings({
        dataSharing,
        analytics,
        notifications,
        accessLevel,
      });
      await settings.save();
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: "Error updating privacy settings" });
  }
});

// Report routes
app.get("/api/reports", async (req, res) => {
  try {
    const students = await Student.find();
    const reports = await Promise.all(
      students.map(async (student) => {
        const progress = await Progress.find({ studentId: student._id });

        const subjects = progress.map((p) => ({
          name: p.subject,
          score: p.score,
          progress: p.progress,
        }));

        const averageScore =
          subjects.length > 0
            ? Math.round(
                subjects.reduce((sum, s) => sum + s.score, 0) / subjects.length,
              )
            : 0;

        const overallProgress =
          subjects.length > 0
            ? Math.round(
                subjects.reduce((sum, s) => sum + s.progress, 0) /
                  subjects.length,
              )
            : 0;

        return {
          id: student._id,
          name: student.name,
          grade: student.grade,
          overallProgress,
          averageScore,
          subjects,
          strengths: ["Good performance"],
          weaknesses: ["Needs improvement"],
          recommendations: ["Keep up the good work"],
        };
      }),
    );

    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: "Error generating reports" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
