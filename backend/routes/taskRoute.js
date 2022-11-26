import express from 'express';
import {
  createTask,
  getTasks,
  getTaskById,
  deleteTaskById,
  updateTaskById,
} from '../controllers/taskController.js';
const router = express.Router();

router.route('/').get(getTasks).post(createTask);
router
  .route('/:id')
  .get(getTaskById)
  .put(updateTaskById)
  .delete(deleteTaskById);

export default router;
