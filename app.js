const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function loadTasks() {
  const data = fs.readFileSync(path.join(__dirname, 'task.json'), 'utf-8');
  return JSON.parse(data).tasks;
}

function saveTasks() {
  fs.writeFileSync(path.join(__dirname, 'task.json'), JSON.stringify({ tasks }, null, 2));
}

// Helper: parse boolean from query
function parseBool(val) {
  if (val === undefined) return undefined;
  if (val === 'true') return true;
  if (val === 'false') return false;
  return undefined;
}

let tasks = loadTasks();
let nextId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;

// Create Task
app.post("/tasks", (req, res) => {
  const { title, description, completed, priority } = req.body;
  if (!title || !description || typeof completed !== "boolean" || (priority && !["low","medium","high"].includes(priority))) {
    return res.status(400).json({ error: "Invalid task data" });
  }
  const newTask = { id: nextId++, title, description, completed, priority, createdAt: new Date().toISOString() };
  tasks.push(newTask);
  saveTasks();
  res.status(201).json(newTask);
});

// Get All Tasks (filter & sort)
app.get("/tasks", (req, res) => {
  let result = [...tasks];
  const completed = parseBool(req.query.completed);
  if (completed !== undefined) {
    result = result.filter(t => t.completed === completed);
  }
  // Sort by creation date
  result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  res.json(result);
});

// Get Tasks by Priority
app.get("/tasks/priority/:level", (req, res) => {
  const level = req.params.level;
  if (!["low","medium","high"].includes(level)) {
    return res.status(400).json({ error: "Invalid priority level" });
  }
  const result = tasks.filter(t => t.priority === level);
  res.json(result);
});

// Get Task by ID
app.get("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
});

// Update Task
app.put("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description, completed, priority } = req.body;
  if (!title || !description || typeof completed !== "boolean" || (priority && !["low","medium","high"].includes(priority))) {
    return res.status(400).json({ error: "Invalid task data" });
  }
  const task = tasks.find((t) => t.id === id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  task.title = title;
  task.description = description;
  task.completed = completed;
  task.priority = priority;
  saveTasks();
  res.json(task);
});

// Delete Task
app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return res.status(404).json({ error: "Task not found" });
  tasks.splice(index, 1);
  res.status(200).json({ message: "Task deleted" });
});

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;