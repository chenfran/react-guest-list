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
      console.log('GET', data);

      setGuests(data);

      setIsLoading(false);
    }
    getGuests().catch((error) => console.log(error));
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  // POST Method to send information to an API
  async function addGuest() {
    const dataGuest = {
      firstName: firstName,
      lastName: lastName,
      attending: false,
    };

    const response = await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataGuest),
    });
    const createdGuest = await response.json();
    console.log('createdGuest', createdGuest);

    const newGuests = [...guests];
    newGuests.push(createdGuest);
    setGuests(newGuests);
    console.log('newGuests', newGuests);

    setFirstName('');
    setLastName('');
  }

  // PUT Method to update information
  async function putGuest(id, attending) {
    const response = await fetch(`${baseUrl}/guests/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending }),
    });
    const updatedGuest = await response.json();
    console.log('updatedGuest', updatedGuest);
  }

  function attendingStatus(id) {
    const people = guests.find((person) => person.id === id);
    const newAttendingStatus = !people.attending;

    setGuests(
      guests.map((guest) =>
        guest.id === id ? { ...guest, attending: newAttendingStatus } : guest,
      ),
    );
    putGuest(id, newAttendingStatus).catch((error) => console.log(error));
  }

  // DELETE Method to delete information
  async function deleteGuest(id) {
    const response = await fetch(`${baseUrl}/guests/${id}`, {
      method: 'DELETE',
    });
    const deletedGuest = await response.json();
    console.log('deletedGuest', deletedGuest);

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
            disabled={isLoading}
            placeholder="First name"
            onChange={(event) => setFirstName(event.target.value)}
          />
          <label htmlFor="Last name">Last name</label>
          <input
            id="Last name"
            name="Last name"
            value={lastName}
            disabled={isLoading}
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
      <div data-test-id="guest">
        <table>
          <tbody>
            <tr>
              <th>Attending Status</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
            {guests.map((guest) => (
              <tr key={`guest-${guest.id}`}>
                <td>
                  <input
                    aria-label={`${firstName} ${lastName} attending status`}
                    type="checkbox"
                    checked={guest.attending}
                    onChange={() => attendingStatus(guest.id, guest.attending)}
                  />
                  <span>
                    {guest.attending ? 'attending' : 'not attending'}{' '}
                  </span>
                </td>
                <td>
                  <span>
                    {guest.firstName} {guest.lastName}
                  </span>
                </td>
                <td>
                  <button
                    aria-label={`Remove ${guest.firstName} ${guest.lastName}`}
                    onClick={() => deleteGuest(guest.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
