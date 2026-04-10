import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import protectedRoutes from "./src/routes/protectedRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import otpRoutes from "./src/routes/otpRoutes.js";
import visitorRoutes from "./src/routes/visitorRoutes.js";
dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/users", userRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/visitor", visitorRoutes);


const port = process.env.PORT || 5001;

app.listen(port, () => console.log("Server running", port));