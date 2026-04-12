import dotenv from "dotenv";
dotenv.config(); // ✅ First line

import express from "express";
import cors from "cors";

import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import protectedRoutes from "./src/routes/protectedRoutes.js";
import otpRoutes from "./src/routes/otpRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import visitorRoutes from "./src/routes/visitorRoutes.js";

connectDB();

const app = express();

app.use(cors({
  origin: "*", // ✅ All origins allow — Vercel + ngrok + any
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false // ✅ * use பண்ணும்போது false வேணும்
}));

app.options(/.*/, cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/users", userRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/visitor", visitorRoutes);

const port = process.env.PORT || 8000;

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});