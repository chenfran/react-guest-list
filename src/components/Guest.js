export default function Guest({ name, toggleAttended, deleteGuest }) {
  return (
    <div className="Todo">
      <p
        role="presentation"
        onClick={() => toggleAttended(name.id)}
        className={name.completed ? 'completed' : ''}
      >
        {name.name}
      </p>
      <div>
        <button onClick={() => deleteGuest(name.id)}>Remove</button>
      </div>
    </div>
  );
}
