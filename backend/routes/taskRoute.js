import express from 'express';
import {
  createTask,
  getTasks,
  getTaskById,
} from '../controllers/taskController.js';
const router = express.Router();

router.route('/').post(createTask);
router.route('/').get(getTasks);
router.route('/:id').get(getTaskById);

export default router;
