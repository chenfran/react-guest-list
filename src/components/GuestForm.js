import { useState } from 'react';

export default function GuestForm({ addGuest }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    addGuest(firstName + ' ' + lastName);

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
