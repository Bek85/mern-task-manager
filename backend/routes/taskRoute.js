import express from 'express';
import { createTask } from '../controllers/taskController.js';
const router = express.Router();

router.route('/').post(createTask);

export default router;
