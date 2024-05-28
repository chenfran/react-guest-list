export default function Guest({ name, toggleAttended, deleteGuest }) {
  return (
    <div>
      <input
        aria-label={`${name} attending status`}
        type="checkbox"
        onClick={() => toggleAttended(name.id)}
      />
      <p role="presentation" className={name.completed ? 'completed' : ''}>
        {name.name}
      </p>
      <div>
        <button onClick={() => deleteGuest(name.id)}>Remove</button>
      </div>
    </div>
  );
}
