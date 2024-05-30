import { useState } from 'react';

export default function GuestForm({ addGuest }) {
  // Use prop addGuest

  // Create state variables they are called firstName and lastName
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // Create a function to add a user
  function handleSubmit(event) {
    event.preventDefault();
    addGuest(firstName + ' ' + lastName); // Call the addGuest function

    // Clear input fields
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
