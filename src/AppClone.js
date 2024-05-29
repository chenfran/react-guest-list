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
      const response = await fetch(`${baseUrl}/guests`); // Send GET Request
      const data = await response.json(); // Read the response and create a JS object with the data from the body
      console.log(data);

      setGuests(data);

      setIsLoading(false); // After fetch is finished isLoading is false
    }
    getGuests().catch((error) => console.log(error));
  }, []);

  // POST Method to send information to the API
  async function addGuest() {
    // Daten für den POST-Request vorbereiten
    const newGuestInfo = {
      firstName: firstName,
      lastName: lastName,
      attending: false,
    };

    // POST-Request senden
    const response = await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newGuestInfo),
    });

    // Serverantwort verarbeiten
    const createdGuest = await response.json();
    console.log(createdGuest);

    // Daten fürs Aktualisieren der Gästeliste vorbereiten
    const newGuestList = [...guests, createdGuest];

    const newGuestList = [...guests];
    newGuestList.push(createdGuest);
    setGuests(newGuestList);

    // Die Gästeliste aktualisieren
    setGuests(newGuestList); // Auch möglich: setGuests([...guests, createdGuest])

    setFirstName('');
    setLastName('');
  }

  function toggleAttended(id) {
    // Map through guests and check if the guest ID equals the ID that will be passed in then create a copy of the guest and update the attending value else return the guest
    const updatedGuests = guests.map((guest) =>
      guest.id === id ? { ...guest, attending: !guest.attending } : guest,
    );
    setGuests(updatedGuests);
  }

  // PUT Method to update information
  async function updateGuests(id) {
    const updatedGuest = toggleAttended(id);
    const response = await fetch(`${baseUrl}/guests/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedGuest),
    });
    const result = await response.json();
    console.log(result);
  }

  // DELETE Method to delete information
  async function deleteGuestFromList(id) {
    if (id.length > 0) {
      const response = await fetch(`${baseUrl}/guests/${id}`, {
        method: 'DELETE',
      });
      const deletedGuest = await response.json();
      const currentGuestList = [...guests];
      const newGuestList = currentGuestList.filter(
        (guest) => guest.id !== deletedGuest.id,
      );
      setGuests(newGuestList);
    }
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
        <div key={`guest-${guest.id}`}>
          <input
            aria-label={`${firstName} ${lastName} attending status`}
            type="checkbox"
            onClick={() => updateGuests(guest.id)}
          />
          <p>{guest.attending ? 'attending' : 'not attending'}</p>
          <p>
            {guest.firstName} {guest.lastName}
          </p>
          <div>
            <button onClick={() => deleteGuestFromList(guest.id)}>
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
