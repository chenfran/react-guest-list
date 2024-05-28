// Use props: name, toggleAttended, deleteGuest
export default function Guest({ name, toggleAttended, deleteGuest }) {
  return (
    <div>
      {/* Create a checkbox */}
      <input
        aria-label={`${name} attending status`}
        type="checkbox"
        onClick={() => toggleAttended(name.id)}
      />
      {/* Create a p with user input */}
      {/* ClassName stands for a conditional: If the name is completed (means guest attended) then the paragraph should have a class of 'completed' otherwise it should be an empty string. The class will be used if the input field above is clicked because of the onClick function */}
      <p role="presentation" className={name.completed ? 'completed' : ''}>
        {name.name}
      </p>
      <div>
        {/* Create a button to delete a guest */}
        <button onClick={() => deleteGuest(name.id)}>Remove</button>
      </div>
    </div>
  );
}
