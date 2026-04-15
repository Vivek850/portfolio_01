const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// ✅ Skill Category Schema
const SkillSchema = new mongoose.Schema({
  name: String,          // Category name (Frontend, Backend, etc.)
  skills: [String],      // Array of skills
  createdAt: { type: Date, default: Date.now }
});
const SkillCategory = mongoose.model('SkillCategory', SkillSchema);

// ✅ Get all skill categories
router.get('/admin/skills', async (req, res) => {
  try {
    const categories = await SkillCategory.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Error fetching skills", error: err });
  }
});

// ✅ Add new category
router.post('/admin/skills', async (req, res) => {
  const { name } = req.body;
  try {
    const newCat = new SkillCategory({ name, skills: [] });
    await newCat.save();
    res.json(newCat);
  } catch (err) {
    res.status(500).json({ message: "Error adding category", error: err });
  }
});

// ✅ Add skill to category
router.put('/admin/skills/:id', async (req, res) => {
  const { skill } = req.body;
  try {
    const category = await SkillCategory.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    category.skills.push(skill);
    await category.save();
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: "Error adding skill", error: err });
  }
});

// ✅ Delete category
router.delete('/admin/skills/:id', async (req, res) => {
  try {
    const deletedCat = await SkillCategory.findByIdAndDelete(req.params.id);
    if (!deletedCat) return res.status(404).json({ message: "Category not found" });

    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting category", error: err });
  }
});

// ✅ Delete skill
router.delete('/admin/skills/:id/:skill', async (req, res) => {
  try {
    const category = await SkillCategory.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    category.skills = category.skills.filter(s => s !== req.params.skill);
    await category.save();
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: "Error deleting skill", error: err });
  }
});

module.exports = router;
