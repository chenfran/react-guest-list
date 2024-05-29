import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import library to create unique IDs
import Guest from './Guest';
import GuestForm from './GuestForm';

uuidv4();

export default function GuestList() {
  const [guests, setGuests] = useState([]);

  function addGuest(guest) {
    // Create a copy of guests with '...guests', and add id, name and the status completed
    setGuests([...guests, { id: uuidv4(), name: guest, completed: false }]);
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
      <GuestForm addGuest={addGuest} />
      {guests.map((guest) => (
        // Add component 'Guest' with the props name, key, toggleAttended, deleteGuest
        <Guest
          name={guest}
          key={`guest-${guest.id}`}
          toggleAttended={toggleAttended}
          deleteGuest={deleteGuest}
        />
      ))}
    </div>
  );
}
