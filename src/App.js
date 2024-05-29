import { useEffect, useState } from 'react';

const baseUrl = 'https://v7pqqz-4000.csb.app';

export default function App() {
  const [guests, setGuests] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // GET Method to get information from API
  useEffect(() => {
    async function getGuests() {
      const response = await fetch(`${baseUrl}/guests`);
      const data = await response.json();
      console.log(data);

      setGuests(data);

      setIsLoading(false);
    }
    getGuests().catch((error) => console.log(error));
  }, []);

  // POST Method to send information to the API
  async function addGuest() {
    const newGuestInfo = {
      firstName: firstName,
      lastName: lastName,
      attending: false,
    };

    const response = await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newGuestInfo),
    });

    const createdGuest = await response.json();
    console.log(createdGuest);

    const newGuestList = [...guests, createdGuest];

    setGuests(newGuestList);

    setFirstName('');
    setLastName('');
  }

  // PUT Method to update information

  // DELETE Method to delete information

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   addGuest(firstName + ' ' + lastName).catch((error) => console.log(error));
  //   setFirstName('');
  //   setLastName('');
  // }

  function toggleAttended(id) {
    setGuests(
      // Map through guests and check if the guest ID equals the ID that will be passed in then create a copy of the guest and update the attending value else return the guest
      guests.map((guest) =>
        guest.id === id ? { ...guest, attending: !guest.attending } : guest,
      ),
    );
  }

  function deleteGuest(id) {
    // Filter each guest that is not equal to the ID that is passed in and return the guest
    // Remove the guest with the ID equal to the ID that is passed in
    setGuests(guests.filter((guest) => guest.id !== id));
  }

  return (
    <div>
      <h1>Add guests to your PARTEY!</h1>
      <div>
        <form onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="First name">First name</label>
          <input
            id="First name"
            name="First name"
            value={firstName}
            placeholder="First name"
            onChange={(event) => setFirstName(event.target.value)}
          />
          <label htmlFor="Last name">Last name</label>
          <input
            id="Last name"
            name="Last name"
            value={lastName}
            placeholder="Last name"
            onChange={(event) => setLastName(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                addGuest().catch((error) => console.log(error));
              }
            }}
          />
          <button>Add Guest</button>
        </form>
      </div>
      {guests.map((guest) => (
        // Add component 'Guest' with the props name, key, toggleAttended, deleteGuest
        <div key={`guest-${guest.id}`}>
          <input
            aria-label={`${firstName} ${lastName} attending status`}
            type="checkbox"
            onClick={() => toggleAttended(guest.id)}
          />
          <p>{guest.attending ? 'attending' : 'not attending'}</p>
          <p>{guest.guest}</p>
          <div>
            <button onClick={() => deleteGuest(guest.id)}>Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
}
