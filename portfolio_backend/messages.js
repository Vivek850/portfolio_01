
// messages.js - Backend route for handling contact form messages
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const MessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', MessageSchema);

// ✅ Get All Messages Route
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
// ✅ Admin Route to Fetch Messages
app.get('/admin/messages', async (req, res) => {
  try {
    const msgs = await Message.find().sort({ createdAt: -1 });
    res.json(msgs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching messages", error: err });
  }
});


