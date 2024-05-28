import { useState } from 'react';

export default function GuestForm({ addGuest }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // A function that allows the user to press RETURN on their keyboard and have their input submitted and displayed.
  function handleSubmit(event) {
    event.preventDefault(); // To prevent page reloading
    addGuest(firstName + ' ' + lastName); // 'addGuest' is used as a prop from the GuestList function
    // This clears the input fields
    setFirstName('');
    setLastName('');
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="First name">First name</label>
        <input
          value={firstName}
          placeholder="First name"
          onChange={(event) => setFirstName(event.target.value)}
        />
        <label htmlFor="Last name">Last name</label>
        <input
          value={lastName}
          placeholder="Last name"
          onChange={(event) => setLastName(event.target.value)}
        />
        <button>Add Guest</button>
      </form>
    </div>
  );
}
