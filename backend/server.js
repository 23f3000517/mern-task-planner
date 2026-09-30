require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require('./models/Task');

const app = express();
app.use(cors()); 
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB Error:', err.message));

// GET /api/tasks (Supports filtering: /api/tasks?priority=High)
app.get('/api/tasks', async (req, res) => {
  try {
    const { priority } = req.query;
    const filter = priority ? { priority } : {};
    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/tasks
app.post('/api/tasks', async (req, res) => {
  try {
    const { title, priority } = req.body;
    if (!title || title.trim().length === 0) {
      return res.status(400).json({ error: 'Title cannot be empty or only spaces.' });
    }
    const newTask = new Task({ title: title.trim(), priority: priority || 'Medium' });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/tasks/:id/complete
app.put('/api/tasks/:id/complete', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    
    task.isCompleted = !task.isCompleted;
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
