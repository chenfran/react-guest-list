import TodoWrapper from './components/GuestList';

export default function App() {
  return <TodoWrapper />;
}

// const guestList = [
//   {
//     id: 1,
//     first: 'Franziska',
//     last: 'Chen',
//   },
//   {
//     id: 2,
//     first: 'Maria',
//     last: 'Meier',
//   },
//   {
//     id: 3,
//     first: 'Jon',
//     last: 'Doe',
//   },
// ];

// export default function App() {
//   const [attendanceStatus, setAttendanceStatus] = useState(false);

//   return (
//     <main>
//       <header>
//         <section>
//           <h1>Header</h1>
//         </section>
//       </header>

//       <GuestList />

//       <section>
//         <h1>Guest list</h1>
//         <table>
//           <thead>
//             <tr>
//               <th>Attending</th>
//               <th>Guest name</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {guestList.map((guest) => {
//               return (
//                 <tr key={`guest-${guest.id}`}>
//                   <td>
//                     {/* ❤️‍🩹 HOW-TO: This input field are all the same */}
//                     <input
//                       type="checkbox"
//                       checked={attendanceStatus}
//                       onChange={(event) =>
//                         setAttendanceStatus(event.currentTarget.checked)
//                       }
//                     />
//                   </td>
//                   <td>
//                     {guest.first} {guest.last}
//                   </td>
//                   <td>
//                     <button>Remove</button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </section>

//       <section>
//         <h1>Footer</h1>
//         <div>A guest list App</div>
//         <div>Created by Franziska Chen</div>
//       </section>
//     </main>
//   );
// }
