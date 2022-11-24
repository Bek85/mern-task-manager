import mongoose from 'mongoose';

const TaskSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a task'],
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', TaskSchema);

export default Task;
