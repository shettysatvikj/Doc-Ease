import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import { connectDB } from "./config/db.js";
import aiRoute from "./routes/aiRoutes.js";
import { startReminderJob } from "./jobs/reminderJob.js";

const app = express();

// ✅ CORS Configuration
app.use(
  cors({
    origin: "https://doc-ease-ikdv.vercel.app",
    credentials: true,
  })
);

// ✅ Middleware
app.use(express.json());

// ✅ Routes
app.use("/api/users", userRoutes);
app.use("/api/appointments", appointmentRoutes);

// ✅ Test Route
app.get("/", (req, res) => {
  res.json({
    app: "DocEase",
    status: "Backend running",
  });
});
app.use("/api/ai", aiRoute);

// ✅ Health Check Route
app.get("/health", (req, res) => {
  res.status(200).json({
    app: "DocEase",
    status: "healthy",
  });
});

// ✅ Start Server
const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ Database connected");

    // ✅ Start Reminder Job AFTER DB
    startReminderJob();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`✅ Server started on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
  }
};
startServer();
