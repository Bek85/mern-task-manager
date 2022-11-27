import { useState } from 'react';
import axios from 'axios';
import Task from './Task';
import TaskForm from './TaskForm';
import { toast } from 'react-toastify';

export default function TaskList() {
  const [formData, setFormData] = useState({
    name: '',
    completed: false,
  });

  const { name } = formData;

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  };

  const createTask = async (evt) => {
    evt.preventDefault();
    if (name === '') {
      return toast.error('Input field cannot be empty');
    }
    try {
      await axios.post('/api/tasks', formData);
      toast.success('New task has been added successfully');
      setFormData({ ...formData, name: '' });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h2>Task Manager</h2>
      <TaskForm
        createTask={createTask}
        handleInputChange={handleInputChange}
        name={name}
      />
      <div className="--flex-between --pb">
        <p>
          <b>Total Tasks:</b> 0
        </p>
        <p>
          <b>Completed Tasks:</b> 0
        </p>
      </div>
      <hr />
      <Task />
    </div>
  );
}
