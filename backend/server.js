import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import { connectDB } from "./config/db.js";
import startReminderJob from "./jobs/reminderJob.js";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/appointments", appointmentRoutes);

app.get("/", (req, res) => {
  res.json({
    app: "DocEase",
    status: "Backend running",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    app: "DocEase",
    status: "healthy",
  });
});

const startServer = async () => {
  try {
    await connectDB();
    console.log("Database connected");

    startReminderJob();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
  }
};

startServer();