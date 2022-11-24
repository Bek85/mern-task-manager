import Task from '../models/taskModel.js';

//* @desc Create a new task
//* @route POST /api/tasks
//* @access Public

// Create a task
const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createTask };
