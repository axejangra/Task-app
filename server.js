const express = require('express');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const mongoURI = "mongodb://127.0.0.1:27017/"
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
main().catch((err)=>console.log(err))
async function main(){
 await mongoose.connect(mongoURI)
  console.log("connected to database");;
}


// Create a task schema
const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status:{ type: String, default: 'Pending' },
});

const Task = mongoose.model('Task', TaskSchema);

// API routes
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const { title, description } = req.body;
  const newTask = new Task({ title, description });
  await newTask.save();
  res.json(newTask);
});

app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  await Task.findByIdAndUpdate(id, { title, description });
  res.json({ message: 'Task updated successfully' });
});

app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndRemove(id);
  res.json({ message: 'Task deleted successfully' });
});

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
