const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

// ✅ Footer Schema
const footerSchema = new mongoose.Schema({
  type: String,   // e.g. "Email", "LinkedIn"
  link: String    // e.g. "vivek@example.com", "linkedin.com/in/vivek"
});

const Footer = mongoose.models.Footer || mongoose.model("Footer", footerSchema);

// ✅ GET all footer contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await Footer.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST new contact
router.post("/", async (req, res) => {
  try {
    const { type, link } = req.body;
    const newContact = new Footer({ type, link });
    await newContact.save();
    res.json(newContact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ PUT update contact
router.put("/:id", async (req, res) => {
  try {
    const { type, link } = req.body;
    const updatedContact = await Footer.findByIdAndUpdate(
      req.params.id,
      { type, link },
      { new: true }
    );
    res.json(updatedContact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE contact
router.delete("/:id", async (req, res) => {
  try {
    await Footer.findByIdAndDelete(req.params.id);
    res.json({ message: "Contact deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
