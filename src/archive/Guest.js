export default function Guest({ name, toggleAttended, deleteGuest }) {
  // Use props: name, toggleAttended, deleteGuest
  return (
    <div>
      <input
        aria-label={`${name} attending status`}
        type="checkbox"
        onClick={() => toggleAttended(name.id)} // Call toggleAttended function with the argument 'name.id'
      />

      <p
        className={name.completed ? 'completed' : ''} // A conditional for className
      >
        {name.name}
      </p>

      <div>
        <button
          onClick={() => deleteGuest(name.id)} // Call deleteGuest function with the argument 'name.id'
        >
          Remove
        </button>
      </div>
    </div>
  );
}
