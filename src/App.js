import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import library to create unique IDs

uuidv4(); // Call the function

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

  function handleSubmit(event) {
    event.preventDefault();
    addGuest(firstName + ' ' + lastName);
    setFirstName('');
    setLastName('');
  }

  function addGuest(guest) {
    // Create a copy of guests with '...guests', and add id, name and the status completed
    setGuests([...guests, { id: uuidv4(), guest: guest, completed: false }]);
    console.log(guests);
  }

  function toggleAttended(id) {
    setGuests(
      // Map through guests and check if the guest ID equals the ID that will be passed in then create a copy of the guest and update the completed value else return the guest
      guests.map((guest) =>
        guest.id === id ? { ...guest, completed: !guest.completed } : guest,
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
      {guests.map((guest) => (
        // Add component 'Guest' with the props name, key, toggleAttended, deleteGuest
        <div key={`guest-${guest.id}`}>
          <input
            aria-label={`${firstName} ${lastName} attending status`}
            type="checkbox"
            onClick={() => toggleAttended(guest.id)}
          />
          <p className={guest.completed ? 'completed' : ''}>{guest.guest}</p>
          <div>
            <button onClick={() => deleteGuest(guest.id)}>Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
}
