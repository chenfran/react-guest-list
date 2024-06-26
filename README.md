# React Guest List

Create a guest list app using React that allows for:

- [ ] Adding a guest using separate first name and last name fields
  - [ ] The first name input needs to have a related label containing `First name`
  - [ ] The last name input needs to have a related label containing `Last name`
  - [ ] A guest should be created upon pressing <kbd>Return</kbd> in the last name input
  - [ ] After a guest is created, both fields need to be cleared again
  - [ ] Newly created guests should be set as **not attending** by default
  - [ ] Each guest (all content and form fields) should be contained inside a div element with the attribute `data-test-id="guest"`
- [ ] Deleting a guest with a button that **either**:
  - [ ] **Take a look at the recording from Lukas from the 24th of May**
  - [ ] Contains the text `Remove`
  - [ ] Has an `aria-label` attribute which starts with `Remove` (eg. `Remove <first name> <last name>`)
- [ ] Setting a guest as "attending" by clicking on a checkbox
  - [ ] The checkbox needs to have an `aria-label` which contains the text `attending` (eg. `<first name> <last name> attending status`) - the text can be uppercase or lowercase
  - [ ] On the first click of the attending checkbox, the guest needs to be set to attending (the checkbox needs to be checked)
  - [ ] On the second click of the attending checkbox, the guest needs to be set to not attending (the checkbox needs to be unchecked)
- [ ] Set up [this API](https://github.com/upleveled/express-guest-list-api-memory-data-store) and read the docs to understand how you can use it to store and retrieve data:
  - [ ] Save any changes to the API
  - [ ] Load the guest list from this API
- [ ] While the guest list is first loaded from the API (on page load):
  - [ ] Show a loading message containing the text `Loading...`
  - [ ] **Take a look at the recording from Lukas from the 24th of May**
  - [ ] Disable the form fields

The default view should show all guests in the list.

Some features are similar to [this example](https://todomvc.com/examples/react/dist/) - check this out to see how the app should generally behave.

## Audience & Need

This chapter answers the following questions regarding this project:

- Who are the people you are trying to reach or provide services for?
  The client is called 'Drone'. It is a large company with many and high expectations. Their products are high quality in (semantic) coding and design. Therefore, it is crucial to meet their quality standards.

  Drone is looking for an app for their event managers who organise a lot of events and need an app to manage their guest list in a quick and easy way.

  - As an event manager who receives email registrations from guests, I want to add a guest's first and last name to a guest list so that I always have an updated guest list. The added guest will appear in a guest list with all other guests.
  - As an event manager, I want to be able to change the status of the guest between attending and not attending, so that I have an overview of all guests who have or have not attended an event.
  - As an event manager I want to be able to remove a guest from the guest list regardless of their status, so that I always have an updated guest list.

- What problem are you solving for them?
  Drone wants a digital guest list. For now, they use pencil and paper to create a guest list.

## Additional comments on the code

### 3 Steps to manipulate / update an existing array

1. Create a copy of the current state
2. Update the copy created in step 1
3. Set the state to the copy of the old state

```
const [users, setUsers] = useState(initialUsers);

const newUser = {};

// Add new User:
const newUsers = [...users];
newUsers.push(newUser);
setUsers(newUsers);

OR
setUsers([...users, newUser]);

OR

// Delete last user
const newUsers = [...users];
newGuests.pop();
setUsers(newUsers);

OR

// Change user name to Antje
const newUsers = [...users];
newUsers[0].name.first = 'Antje';
setUsers(newUsers);
```

### Difference between e.target vs e.currentTarget

e. target contains a reference to the element that triggered the event, while e. currentTarget contains a reference to the element that the event handler is attached to.

One of the key differences between e.currentTarget and e.target is that the value of e.target can change during event propagation, while the value of e.currentTarget remains the same.

### Delete Functionality in React

- In the Delete function, the filter method is used to iterate through the list of guests and retain only those guests whose ID does not match the passed ID, i.e., removing the guest to be deleted.

- Return: The filter method returns a new list containing only the remaining guests after the guest with the specified ID has been removed.

### Function "attendingStatus"

- Parameter: The function expects an id, which is the unique identifier of the guest whose attendance status is to be changed.

- Finding the guest: First, the guest with the specified ID is found from the guests list to determine their current attendance status.

- Toggling the attendance status: The current attendance status of the guest is reversed. If the guest was previously present, they are marked as absent, and vice versa.

- Updating the state: The guest's attendance status is updated locally in the application by using the setGuests function to update the guests list. This changes the attendance status of the selected guest while leaving the other guests unchanged.

- Updating data on the server: After the local state has been updated, a PUT request is sent to the API to save the changed attendance status of the guest on the server.

## TODOs

- [x] Create a mockup on figma
- [ ] Watch the recordings from Lukas' class from 24th of May (useful information is creating a checkbox, adding user, useEffect)
- [x] Create input fields for the first and last name
  - [ ] Create a onKeyPress or onKeyDown event for the input field of the last name, so user can press <kdb>Return</kdb> and the guest will be added to the guest list below
  - [ ] Research for the kdb tag from the description
- [ ] Create checkboxes next to every guest that can be checked and unchecked
- [ ] Create a remove button that deletes the guest
  - [ ] Create a function to delete guests
- [ ] Create a table
  - [ ] All guests should be displayed in this table
- [ ] Research for the useEffect to fetch data from an API
- [ ] Research for the useEffect to store date into an API
- [ ] Add styling

## Stretch TODOs

- [ ] Button to delete all attending guests
- [ ] Filters:
  - [ ] Filter to show only non-attending guests
  - [ ] Filter to show only attending guests
  - [ ] Button to reset filters to again show all of the guests
- [ ] Allow editing first and last names of existing guests
- [ ] Store the guest list permanently
  - [ ] Set up a database with either ElephantSQL (PostgreSQL) or Firebase Cloud Firestore (NoSQL)
  - [ ] Fork the API repo and change it to use the database
- [ ] Allow for saving an "attending deadline" with each guest and if the current date is later than that deadline (and the guest hasn't been set to "attending"), display the guest differently
- [ ] Change the frontend and the API to allow for creating multiple events, each with their own name, location, and guest list
- [ ] Convert your frontend code to TypeScript (see [Adding TypeScript](https://create-react-app.dev/docs/adding-typescript/))
- [ ] Create a favicon that identifies your app: (see [Generating and Adding Favicons](https://learn.upleveled.io/pern-extensive-immersive/modules/cheatsheet-design-ux/#generating-and-adding-favicons))
- [ ] Right after [creating your first (empty) Git commit](https://learn.upleveled.io/pern-extensive-immersive/modules/cheatsheet-command-line/#5-create-and-push-an-initial-commit), create a new branch. Use this branch to [open a pull request on GitHub](https://learn.upleveled.io/pern-extensive-immersive/modules/cheatsheet-git-github/#opening-pull-requests)

## Acceptance Criteria

- [ ] Preflight runs without errors in your project
- [ ] [Drone bot](https://learn.upleveled.io/pern-extensive-immersive/modules/cheatsheet-tasks/#upleveled-drone) has been tagged and responded with a passing message
- [ ] Correct GitHub commit message format (see [Writing Commit Messages](https://learn.upleveled.io/pern-extensive-immersive/modules/cheatsheet-git-github/#writing-commit-messages))

```

```
