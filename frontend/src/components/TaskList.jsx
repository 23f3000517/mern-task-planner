export default function TaskList({ tasks, onToggleComplete }) {
  if (tasks.length === 0) return <p>No tasks found.</p>;

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {tasks.map((task) => (
        <li key={task._id} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <input 
            type="checkbox" 
            checked={task.isCompleted} 
            onChange={() => onToggleComplete(task._id)} 
          />
          <span style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
            {task.title} ({task.priority})
          </span>
        </li>
      ))}
    </ul>
  );
}
