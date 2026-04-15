const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

// ✅ Schema
const homeSchema = new mongoose.Schema({
  heading: String,
  span: String,
  tagline: String,
  paras: [String],
});

const Home = mongoose.models.Home || mongoose.model("Home", homeSchema);

// ✅ GET route
router.get("/", async (req, res) => {
  try {
    let homeData = await Home.findOne();
    if (!homeData) {
      homeData = new Home({
        heading: "Hi, I'm Vivek",
        span: "MERN Stack Developer",
        tagline: "who loves building dynamic web applications and turning ideas into reality.",
        paras: [
          "Skilled in MongoDB, Express.js, React, and Node.js.",
          "I focus on creating seamless user experiences and efficient backend solutions."
        ]
      });
      await homeData.save();
    }
    res.json(homeData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ PUT route (update or create)
router.put("/", async (req, res) => {
  try {
    const { heading, span, tagline, paras } = req.body;

    // findOneAndUpdate → सीधे update कर दो
    const homeData = await Home.findOneAndUpdate(
      {}, // पहला document
      { heading, span, tagline, paras },
      { new: true, upsert: true } // नया data return करो, अगर नहीं है तो create कर दो
    );

    res.json(homeData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
