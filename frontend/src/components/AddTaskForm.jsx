import { useState } from 'react';

export default function AddTaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [error, setError] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim().length === 0) {
      setError('Title cannot be empty or only spaces.');
      return;
    }
    setError('');
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim(), priority }),
      });
      if (!response.ok) throw new Error('Failed to save task');
      setTitle('');
      setPriority('Medium');
      onTaskAdded(); // Refresh the list
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New task..." />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit">Add</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
