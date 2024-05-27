import { useState } from 'react';
import styles from './App.module.scss';

const guest = [];

export default function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  return (
    <div>
      <div>
        <div className={styles.center}>GUESTLIST IS COMING SOON ...</div>
      </div>
      <div data-test-id="guest">
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
        <input
          label="Last name"
          id="Last name"
          value={lastName}
          placeholder="Last name"
          onChange={(event) => setLastName(event.currentTarget.value)}
        />
        {lastName}
        <br />
        <kbd>Return</kbd>
      </div>
    </div>
  );
}
