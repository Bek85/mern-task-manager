import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
import Task from './models/taskModel.js';
const PORT = process.env.PORT || 8000;

const app = express();

// Middleware setup
dotenv.config();
app.use(express.json());

// Create a task
app.post('/api/tasks', async (req, res) => {
  try {
    const task = await Task.create(req.body);

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(
      PORT,
      console.log(
        `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
          .yellow.bold
      )
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
