import express from "express";
import Otp from "../models/Otp.js";

const router = express.Router();

// SEND OTP
router.post("/send-otp", async (req, res) => {
  const { phone } = req.body;

  // ✅ NEW OTP (always 6 digit number)
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  console.log("OTP:", otp);

  await Otp.create({
    phone,
    otp,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000),
  });

  res.json({ success: true, message: "OTP Sent" });
});

router.post("/verify-otp", async (req, res) => {
  const { phone, otp } = req.body;

  console.log("Verify Request:", phone, otp); // 👈 DEBUG

  const record = await Otp.findOne({ phone, otp });

  if (!record) {
    return res.status(400).json({
      success: false,
      message: "Invalid OTP",
    });
  }

  if (record.expiresAt < new Date()) {
    return res.status(400).json({
      success: false,
      message: "OTP Expired",
    });
  }

  res.json({ success: true });
});

export default router;