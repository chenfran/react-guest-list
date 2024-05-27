import { useState } from 'react';
import styles from './App.module.scss';

const guestList = [
  {
    id: 1,
    first: 'Franziska',
    last: 'Chen',
  },
  {
    id: 2,
    first: 'Maria',
    last: 'Meier',
  },
  {
    id: 3,
    first: 'Jon',
    last: 'Doe',
  },
];

export default function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [users, setUsers] = useState(guestList);
  const [attendanceStatus, setAttendanceStatus] = useState(false);

  return (
    <body>
      <main>
        <header>
          <section>
            <h1>Header</h1>
          </section>
        </header>

        <section>
          <h1>Add guests</h1>
          <label htmlFor="First name">First name</label>
          <input
            label="First name"
            id="First name"
            value={firstName}
            placeholder="First name"
            onChange={(event) => setFirstName(event.currentTarget.value)}
          />
          {firstName}
          <br />
          <label htmlFor="Last name">Last name</label>
          {/* ❤️‍🩹 HOW-TO: Read more about onKeyPress event for React */}
          <input
            label="Last name"
            id="Last name"
            value={lastName}
            placeholder="Last name"
            onChange={(event) => setLastName(event.currentTarget.value)}
          />
          {lastName}
          <br />
          <span>
            Click <kbd>RETURN</kbd> or <kbd>ENTER</kbd> on your keyboard to add
            a guest.
          </span>
        </section>

        <section>
          <h1>Guest list</h1>
          <table>
            <thead>
              <tr>
                <th>Attending</th>
                <th>Guest name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {guestList.map((guest) => {
                return (
                  <tr key={`guest-${guest.id}`}>
                    <td>
                      {/* ❤️‍🩹 HOW-TO: This input field are all the same */}
                      <input
                        type="checkbox"
                        checked={attendanceStatus}
                        onChange={(event) =>
                          setAttendanceStatus(event.currentTarget.checked)
                        }
                      />
                    </td>
                    <td>
                      {guest.first} {guest.last}
                    </td>
                    <td>
                      <button>Remove</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        <section>
          <h1>Footer</h1>
          <div>A guest list App</div>
          <div>Created by Franziska Chen</div>
        </section>
      </main>
    </body>
  );
}
