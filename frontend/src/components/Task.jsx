import { FaCheckDouble, FaEdit, FaRegTrashAlt } from 'react-icons/fa';

export default function Task({
  task,
  index,
  deleteTask,
  getSingleTask,
  setToComplete,
}) {
  return (
    <div className={task.completed ? 'task completed' : 'task '}>
      <p>
        <b>{index + 1}. </b>
        {task.name}
      </p>
      <div className="task-icons">
        <FaCheckDouble
          color={task.completed ? 'green' : 'gray'}
          onClick={() => setToComplete(task)}
        />
        <FaEdit color="purpled" onClick={() => getSingleTask(task)} />
        <FaRegTrashAlt color="red" onClick={() => deleteTask(task._id)} />
      </div>
    </div>
  );
}
