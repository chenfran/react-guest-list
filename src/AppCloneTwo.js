import { useEffect, useState } from 'react';

const baseUrl = 'https://v7pqqz-4000.csb.app';

export default function AppCloneTwo() {
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

    const newGuests = [...guests];
    newGuests.push(createdGuest);
    setGuests(newGuests);
    console.log('createdGuest', createdGuest);
    console.log('newGuests', newGuests);

    setFirstName('');
    setLastName('');
  }

  // PUT Method to update information
  // async function putGuest(id) {
  //   const response = await fetch(`${baseUrl}/guests/${id}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ attending: true }),
  //   });
  //   const updatedGuest = await response.json();
  //   console.log('PUT', updatedGuest);
  // }

  function toggleAttended(id) {
    setGuests(
      guests.map((guest) =>
        guest.id === id ? { ...guest, attending: !guest.attending } : guest,
      ),
    );
    // putGuest(id).catch((error) => console.log(error));
  }

  // DELETE Method to delete information
  async function deleteGuest(id) {
    const response = await fetch(`${baseUrl}/guests/${id}`, {
      method: 'DELETE',
    });
    const deletedGuest = await response.json();
    console.log(deletedGuest);

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
        <div key={`guest-${guest.id}`}>
          <input
            aria-label={`${firstName} ${lastName} attending status`}
            type="checkbox"
            onClick={() => toggleAttended(guest.id)}
          />

          <span>{guest.attending ? 'attending' : 'not attending'} </span>
          <span>
            {guest.firstName} {guest.lastName}
          </span>

          <div>
            <button onClick={() => deleteGuest(guest.id)}>Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
}
