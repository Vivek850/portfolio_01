// server.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());

// ✅ MongoDB connect
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));


// ✅ User Schema (for admin login)
const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String
});
const User = mongoose.model('User', UserSchema);

// ✅ Message Schema (for contact form submissions)
const MessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', MessageSchema);

const SECRET_KEY = "mysecretkey";

// ✅ Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// ✅ Update Admin Credentials Route
app.put('/update-admin', async (req, res) => {
  const { email, newPassword } = req.body;
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  try {
    await User.updateOne({ email }, { password: hashedPassword });
    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(400).json({ message: "Error updating password", error: err });
  }
});

// ✅ Protected Admin Route
app.get('/admin', (req, res) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(403).json({ message: "No token provided" });

  const token = authHeader.split(' ')[1];
  try {
    jwt.verify(token, SECRET_KEY);
    res.json({ message: "Welcome to Admin Panel" });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

// ✅ Contact Form Submit Route
app.post('/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  try {
    const newMsg = new Message({ name, email, subject, message });
    await newMsg.save();
    res.json({ message: "Message saved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error saving message", error: err });
  }
});

// ✅ Admin Messages Route
app.get('/admin/messages', async (req, res) => {
  try {
    const msgs = await Message.find().sort({ createdAt: -1 });
    res.json(msgs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching messages", error: err });
  }
});

app.delete('/admin/messages/:id', async (req, res) => {
  try {
    console.log("Deleting ID:", req.params.id); // Debugging
    const deletedMsg = await Message.findByIdAndDelete(req.params.id);
    if (!deletedMsg) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.json({ message: "Message deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting message", error: err });
  }
});
// ✅ Skill Routes
const skillRoutes = require('./skill');
app.use(skillRoutes);
// ✅ Project Routes
const projectRoutes = require('./project');
app.use(projectRoutes);

// Import Home Routes
const homeRoutes = require("./home");
app.use("/api/home", homeRoutes);

// Import Footer Routes
const footerRoutes = require("./footer");
app.use("/api/footer", footerRoutes);

// ✅ Start Server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

