import Task from '../models/taskModel.js';

//* @desc Create a new task
//* @route POST /api/tasks
//* @access Public
const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//* @desc Get all tasks
//* @route GET /api/tasks
//* @access Public
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createTask, getTasks };