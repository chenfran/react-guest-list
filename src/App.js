import { useEffect, useState } from 'react';
import styles from './App.module.scss';
import { ReactComponent as CocktailSvg } from './svg/cocktail-svgrepo-com.svg';

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
      <CocktailSvg className={styles.cocktailSvg} />
      <div className={styles.container}>
        <section className={styles.headerSection}>
          <div>
            <div>
              <h1>Registration</h1>
            </div>
          </div>
        </section>
        <div className={styles.formContainer}>
          <form
            className={styles.form}
            onSubmit={(event) => event.preventDefault()}
          >
            <label htmlFor="First name">First name</label>
            <input
              className={styles.inputFields}
              id="First name"
              name="First name"
              value={firstName}
              disabled={isLoading}
              placeholder="First name"
              onChange={(event) => setFirstName(event.target.value)}
            />
            <label htmlFor="Last name">Last name</label>
            <input
              className={styles.inputFields}
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
            <button className={styles.addGuestButton}>Add Guest</button>
          </form>
        </div>
        <div className={styles.guestListContainer}>
          {guests.map((guest) => (
            <div
              className={styles.guestList}
              data-test-id="guest"
              key={`guest-${guest.id}`}
            >
              <input
                aria-label={`${firstName} ${lastName} attending status`}
                type="checkbox"
                checked={guest.attending}
                onChange={() => attendingStatus(guest.id, guest.attending)}
              />
              <span
                className={`${guest.attending ? styles.attending : styles.notAttending}`}
              >
                {guest.attending ? 'ATTENDING' : 'NOT ATTENDING'}
              </span>
              <p className={styles.item}>
                {guest.firstName} {guest.lastName}
              </p>
              <button
                className={styles.removeButton}
                aria-label={`Remove ${guest.firstName} ${guest.lastName}`}
                onClick={() => deleteGuest(guest.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
      <footer>Created by Franziska Chen, Vienna 2024</footer>
    </div>
  );
}
