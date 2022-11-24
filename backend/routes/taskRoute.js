import express from 'express';
import { createTask, getTasks } from '../controllers/taskController.js';
const router = express.Router();

router.route('/').post(createTask);
router.route('/').get(getTasks);

export default router;
