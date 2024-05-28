import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Guest from './Guest';
import GuestForm from './GuestForm';

uuidv4();

export default function TodoWrapper() {
  const [guests, setGuests] = useState([]);

  function addGuest(guest) {
    setGuests([...guests, { id: uuidv4(), name: guest, completed: false }]);
    console.log(guests);
  }

  function toggleAttended(id) {
    setGuests(
      guests.map((guest) =>
        guest.id === id ? { ...guest, completed: !guest.completed } : guest,
      ),
    );
  }

  function deleteGuest(id) {
    setGuests(guests.filter((guest) => guest.id !== id));
  }

  return (
    <div>
      <h1>Add guests to your PARTEY!</h1>
      <GuestForm addGuest={addGuest} />
      {guests.map((guest) => (
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
