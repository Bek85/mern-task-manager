import express from 'express';
import {
  createTask,
  getTasks,
  getTaskById,
  deleteTaskById,
  updateTaskById,
} from '../controllers/taskController.js';
const router = express.Router();

router.route('/').post(createTask);
router.route('/').get(getTasks);
router.route('/:id').get(getTaskById);
router.route('/:id').delete(deleteTaskById);
router.route('/:id').put(updateTaskById);

export default router;
