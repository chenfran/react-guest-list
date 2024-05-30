import { useEffect, useState } from 'react';
import styles from './App.module.scss';
import { ReactComponent as CocktailSvg } from './svg/cocktail-svgrepo-com.svg';

const baseUrl = 'https://v7pqqz-4000.csb.app';

export default function App() {
  const [guests, setGuests] = useState([]); // Create a state variable that contains the guests as an array of objects
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Create a state variable to display a loading message before fetching is done

  // GET request to get information from API
  useEffect(() => {
    async function getGuests() {
      const response = await fetch(`${baseUrl}/guests`);
      const data = await response.json();
      console.log('GET data', data);

      setGuests(data);

      setIsLoading(false); // Set setIsLoading to false when fetching is done, so the Loading... message should not be displayed
    }
    getGuests().catch((error) => console.log(error));
  }, []);

  // Create a Loading... message
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  // POST request to send information to an API
  async function addGuest() {
    // Prepare the POST request with the type of information to be sent to
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

    // Update an existing array in react
    const newGuests = [...guests];
    newGuests.push(createdGuest);
    setGuests(newGuests);
    console.log('newGuests', newGuests);

    // Clear input fields
    setFirstName('');
    setLastName('');
  }

  // PUT request to update information
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

  // Create function to update guest's attendance status from guest from true to false and vis versa
  function attendanceStatus(id) {
    const people = guests.find((person) => person.id === id); // Find all IDs that match the ID being sent
    const newAttendanceStatus = !people.attending; // Reverse the attendance status of person.id found

    setGuests(
      guests.map((guest) =>
        guest.id === id ? { ...guest, attending: newAttendanceStatus } : guest,
      ),
    );
    // Call the putGuest function to update the information in the API
    putGuest(id, newAttendanceStatus).catch((error) => console.log(error));
  }

  // DELETE request to delete information
  async function deleteGuest(id) {
    const response = await fetch(`${baseUrl}/guests/${id}`, {
      method: 'DELETE',
    });
    const deletedGuest = await response.json();
    console.log('deletedGuest', deletedGuest);

    setGuests(guests.filter((guest) => guest.id !== id)); // Delete the ID if it does not match the ID being sent
  }

  return (
    <div>
      <CocktailSvg className={styles.cocktailSvg} />

      <div className={styles.container}>
        <section className={styles.headerSection}>
          <h1>Registration</h1>
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

        {guests.map((guest) => (
          <div
            className={styles.guestList}
            key={`guest-${guest.id}`}
            data-test-id="guest"
          >
            <input
              aria-label={`${firstName} ${lastName} attending status`}
              type="checkbox"
              checked={guest.attending}
              onChange={() => attendanceStatus(guest.id, guest.attending)}
            />
            <span
              className={`${guest.attending ? styles.attending : styles.notAttending}`}
            >
              {guest.attending ? 'ATTENDING' : 'NOT ATTENDING'}
            </span>

            <p className={styles.item}>
              {guest.firstName} {guest.lastName}
            </p>

            <div>
              <button
                className={styles.removeButton}
                aria-label={`Remove ${guest.firstName} ${guest.lastName}`}
                onClick={() => deleteGuest(guest.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <footer>Created by Franziska Chen, Vienna 2024</footer>
    </div>
  );
}
