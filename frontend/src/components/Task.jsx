import { FaCheckDouble, FaEdit, FaRegTrashAlt } from 'react-icons/fa';

export default function Task({ task, index }) {
  return (
    <div className="task">
      <p>
        <b>{index + 1}. </b>
        {task.name}
      </p>
      <div className="task-icons">
        <FaCheckDouble color="green" />
        <FaEdit color="purpled" />
        <FaRegTrashAlt color="red" />
      </div>
    </div>
  );
}
