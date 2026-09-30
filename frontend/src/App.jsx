import { useState, useEffect } from 'react';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const fetchTasks = async () => {
    const res = await fetch(`${API_URL}/tasks`);
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const toggleComplete = async (id) => {
    await fetch(`${API_URL}/tasks/${id}/complete`, { method: 'PUT' });
    fetchTasks();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>Task Planner</h2>
      <AddTaskForm onTaskAdded={fetchTasks} />
      <TaskList tasks={tasks} onToggleComplete={toggleComplete} />
    </div>
  );
}
