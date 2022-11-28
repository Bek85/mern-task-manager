import { useState } from 'react';
import axios from 'axios';
import Task from './Task';
import TaskForm from './TaskForm';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(false);
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

  const getTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/tasks');
      setTasks(res.data);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, [name]);

  return (
    <div>
      <h2>Task Manager</h2>
      <TaskForm
        createTask={createTask}
        handleInputChange={handleInputChange}
        name={name}
      />
      <div className="--flex-between">
        <p>
          <b>Total Tasks:</b> {tasks.length}
        </p>
        <p>
          <b>Completed Tasks:</b> 0
        </p>
      </div>
      <hr className="--my1" />
      {loading && (
        <div className="--flex-center">
          <img src="./loader.gif" alt="" />
        </div>
      )}
      {!loading && tasks.length === 0 ? (
        <p className="--py">No task added. Please add a task</p>
      ) : (
        tasks.map((task, index) => {
          return <Task key={task._id} task={task} index={index} />;
        })
      )}
    </div>
  );
}
