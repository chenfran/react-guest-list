import { useState } from 'react';

export default function TodoForm({ addTodo }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    addTodo(value);

    setValue('');
  };
  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <input
        className="todo-input"
        value={value}
        placeholder="What is the task today?"
        onChange={(event) => setValue(event.target.value)}
      />
      <button className="todo-btn">Add Task</button>
    </form>
  );
}
