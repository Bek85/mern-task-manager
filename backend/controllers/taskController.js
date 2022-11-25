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

//* @desc Get a single task by id
//* @route GET /api/tasks/:id
//* @access Public
const getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//* @desc Delete a single task by id
//* @route DELETE /api/tasks/:id
//* @access Public
const deleteTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndDelete(id);
    if (task) {
      res.status(200).json('Task has been deleted');
    } else {
      res.status(404).json('Task not found');
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createTask, getTasks, getTaskById, deleteTaskById };
