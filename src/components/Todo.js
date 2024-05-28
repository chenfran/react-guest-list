export default function Todo({ task, toggleComplete, deleteTodo }) {
  return (
    <div className="Todo">
      <p
        role="presentation"
        onClick={() => toggleComplete(task.id)}
        className={task.completed ? 'completed' : ''}
      >
        {task.task}
      </p>
      <div>
        <span>🖊️ </span>
        <span role="presentation" onClick={() => deleteTodo(task.id)}>
          🗑️
        </span>
      </div>
    </div>
  );
}
