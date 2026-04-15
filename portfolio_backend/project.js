const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// ✅ Project Schema
const ProjectSchema = new mongoose.Schema({
  name: String,          // Project name
  description: String,   // Project description
  videoUrl: String,      // YouTube embed link
  createdAt: { type: Date, default: Date.now }
});

const Project = mongoose.model('Project', ProjectSchema);

// ✅ Get all projects
router.get('/admin/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Error fetching projects", error: err });
  }
});

// ✅ Add new project
router.post('/admin/projects', async (req, res) => {
  const { name, description, videoUrl } = req.body;
  try {
    const newProject = new Project({ name, description, videoUrl });
    await newProject.save();
    res.json(newProject);
  } catch (err) {
    res.status(500).json({ message: "Error adding project", error: err });
  }
});

// ✅ Update project (flexible: update name, description, video link)
router.put('/admin/projects/:id', async (req, res) => {
  const { name, description, videoUrl } = req.body;
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { name, description, videoUrl },
      { new: true }   // important: return updated doc
    );
    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(updatedProject);
  } catch (err) {
    res.status(500).json({ message: "Error updating project", error: err });
  }
});

// ✅ Delete project
router.delete('/admin/projects/:id', async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting project", error: err });
  }
});

module.exports = router;
