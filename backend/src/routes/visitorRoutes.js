import express from "express";
import Visitor from "../models/VisitorModule.js";

const router = express.Router();

// 🔹 SAVE VISITOR (CHECK-IN)
router.post("/", async (req, res) => {
  try {
    const { name, phone, purpose } = req.body;

    const visitor = await Visitor.create({
      name,
      phone,
      purpose,
      checkInTime: new Date(),
      status: "Checked-In",
    });

    res.json(visitor);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// 🔹 GET ALL VISITORS
router.get("/", async (req, res) => {
  try {
    const visitors = await Visitor.find().sort({ createdAt: -1 });
    res.json(visitors);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// 🔹 CHECKOUT VISITOR
router.put("/:id/checkout", async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);

    visitor.checkOutTime = new Date();
    visitor.status = "Checked-Out";

    await visitor.save();

    res.json(visitor);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

export default router;