import { useEffect, useState } from 'react';

export default function GuestForm({ addGuest }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // const baseUrl = 'http://localhost:4000';

  // useEffect(() => {
  //   async function creatingNewGuests() {
  //     const response = await fetch(`${baseUrl}/guests`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ firstName: 'Franziska', lastName: 'Chen' }),
  //     });
  //     const createdGuest = await response.json();
  //     console.log('created Guest', createdGuest);
  //   }
  //   creatingNewGuests().catch((error) => {
  //     console.log(error);
  //   });
  // }, []);

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
