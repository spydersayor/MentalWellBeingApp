import express from "express";
import Survey from "../models/Survey.js";
import User from "../models/User.js";

const router = express.Router();

// Submit survey
router.post("/", async (req, res) => {
  try {
    const { userId, answers } = req.body;
    const survey = await Survey.create({ userId, answers });
    res.json({ msg: "Survey submitted successfully", survey });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Get all surveys
router.get("/", async (req, res) => {
  try {
    const surveys = await Survey.findAll({
      include: { model: User, attributes: ["name", "email"] },
    });
    res.json(surveys);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
