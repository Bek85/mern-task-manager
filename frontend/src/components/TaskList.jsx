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
  const [isEditing, setIsEditing] = useState(false);
  const [taskId, setTaskId] = useState('');

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
      getTasks();
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
  }, []);

  useEffect(() => {
    const completedTask = tasks.filter((task) => task.completed === true);
    setCompletedTasks(completedTask);
  }, [tasks]);

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      getTasks();
      toast.success('Task has been deleted successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getSingleTask = async (task) => {
    setFormData({
      name: task.name,
      completed: false,
    });
    setTaskId(task._id);
    setIsEditing(true);
  };

  const updateTask = async (evt) => {
    evt.preventDefault();
    if (name === '') {
      return toast.error('Input field cannot be empty');
    }
    try {
      await axios.put(`/api/tasks/${taskId}`, formData);
      toast.success('Task has been updated');
      setFormData({
        ...formData,
        name: '',
      });
      setIsEditing(false);
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const setToComplete = async (task) => {
    const newFormData = {
      name: task.name,
      completed: !task.completed,
    };
    try {
      const { data } = await axios.put(`/api/tasks/${task._id}`, newFormData);
      getTasks();
      if (data.completed) {
        toast.success('Task set to completed');
      } else {
        toast.warn('Task set to uncompleted');
      }
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
        isEditing={isEditing}
        updateTask={updateTask}
      />
      {tasks.length > 0 && (
        <div className="--flex-between">
          <p>
            <b>Total Tasks:</b> {tasks.length}
          </p>
          <p>
            <b>Completed Tasks:</b> {completedTasks.length}
          </p>
        </div>
      )}

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
          return (
            <Task
              key={task._id}
              task={task}
              index={index}
              deleteTask={deleteTask}
              getSingleTask={getSingleTask}
              setToComplete={setToComplete}
            />
          );
        })
      )}
    </div>
  );
}
