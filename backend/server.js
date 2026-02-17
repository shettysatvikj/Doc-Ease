import dotenv from "dotenv";
dotenv.config();
import express from "express"
import cors from "cors";



import userRoutes from "./routes/userRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import { connectDB } from "./config/db.js";


const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://doc-ease-1.onrender.com"
  ],
  credentials: true
}));

app.use(express.json());
app.use("/api/users",userRoutes);
app.use("/api/appointments", appointmentRoutes);


app.get("/", (req, res) => {
    console.log(req.method)
   res.json({
    app: "DocEase",
    status: "Backend running",
  });
});
connectDB();
app.listen(5000, () => {
  console.log("Server started on port 5000");
});

// patient tokken eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NGU4ZDIzMWU2YWRjZjFjMmM2MWE2NSIsInJvbGUiOiJwYXRpZW50IiwiaWF0IjoxNzY2ODI5OTY3LCJleHAiOjE3Njc0MzQ3Njd9.nIjLNNCmGbVGKvwCrD0ni_PwXdGDg-pJ2g4skpSrd2o
// patient id 694e8d231e6adcf1c2c61a65
// doctor token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NGZhY2QyMzM2ZmJmNDQzMGI1ZDI4ZCIsInJvbGUiOiJkb2N0b3IiLCJpYXQiOjE3NjY4MzAwNDcsImV4cCI6MTc2NzQzNDg0N30.Jt8dJfvRl9QtQyS_NTI9Ew2ITch_ca6fWUr4GOdN_i8
//doctor id 694facd2336fbf4430b5d28d

//patient 2 token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NGZiNmZiOGI3YzhjM2JlMThhMjcyYiIsInJvbGUiOiJwYXRpZW50IiwiaWF0IjoxNzY2ODMxODgzLCJleHAiOjE3Njc0MzY2ODN9.Op-y7HErGCr0On5rYmZzFoGFc6Aulkvivja4F-oHAQM
// patient 2 id 694fb6fb8b7c8c3be18a272b
