import Head from 'next/head';
import { useEffect, useState} from 'react';
let users = [];
export async function getServerSideProps() {
  const response2 = await fetch('http://localhost:3000/api/users'); // Fetch user data from your API
  users = await response2.json(); // Parse the response as JSON

  return {
    props: {
      users
    },
  };
}



export default function Profiler({users}) {
  const [ls, setLocalStorage] = useState(null);
  const [user, setUser] = useState(null);

    useEffect(() => {
    if (typeof window !== "undefined") {
      // This ensures `localStorage` is accessed on the client side
      const savedValue = window.localStorage.getItem("user");
      setLocalStorage(savedValue ? JSON.parse(savedValue) : null);
      setUser(users.filter((user) => user.id ==  JSON.parse(savedValue).id)[0]);
      handleDataFill(users.filter((user) => user.id ==  JSON.parse(savedValue).id)[0]);

    }
  }, []);

function filterUsers() {
  const input = document.getElementById('search-id').value.toLowerCase();
  const autocompleteList = document.getElementById('autocomplete-list');
  console.log("Went through");
  console.log(users)
  // Clear previous autocomplete results
  autocompleteList.innerHTML = '';

  // Filter users based on the input
  const filteredUsers = users.filter(user => 
    user.first_name.toLowerCase().includes(input) || user.last_name.toLowerCase().includes(input) || user.id.toLowerCase().includes(input)
  );

  // Display filtered users in the autocomplete list
  filteredUsers.forEach(user => {
    const item = document.createElement('div');
    item.textContent = user.id + " | "+ user.first_name + " " + user.last_name;
    item.classList.add('autocomplete-item');

    // Add click event to autocomplete item
    item.addEventListener('click', function() {
      document.getElementById('employee-name').value = user.id + " | "+ user.first_name + " " + user.last_name; // Set input value to the selected user
      autocompleteList.innerHTML = ''; // Clear the autocomplete list
    });

    // Append the item to the autocomplete list
    autocompleteList.appendChild(item);
  });
}
    const saveUser = () => {
      let phone = document.getElementById("emp-phone").value.replace(/\(\+974\)\s?/g, '').replace(/\s/g, '');
      const newUser = user;
      console.log(user);
      newUser.phone = phone;
      updateUser(newUser);

      }
      async function updateUser(user) {
        try {
            // Clean the user object by explicitly listing fields
            const cleanedUser = {
                id: user.id ?? null,  // Make sure id is either a valid number or null
                email: user.email || '',
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                password: user.password || '',
                phone: user.phone || '',
                scheduleAssignments: user.scheduleAssignments || []
            };
    
            console.log("Sending User Data:", cleanedUser);
    
            const response = await fetch('/api/users', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cleanedUser),  // Only send cleaned data
            });
    
            if (response.ok) {
                alert('User updated successfully!');
            } else {
                console.error('Server error:', await response.text());
                alert('There was an error updating the user.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error saving the user.');
        }
    }

      async function createSchedule() {
        setIsButtonDisabled(true); 
        setFormDisabled(false);
        console.log(selectedDate);

        const scheduleData = {
          date:  selectedDate ,
        };
      
        await fetch('/api/schedules', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(scheduleData),
        })
        .then(response => response.json())
        .then(data => {
          alert('Schedule saved successfully');
          setSchedule(data.id);
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('There was an error saving the schedule');
        });
        const scheds = await fetch('http://localhost:3000/api/schedules');
        const responsed = await scheds.json();
        setSchedules(responsed);
    };
    const [filteredUsers, setFilteredUsers] = useState([]);
    const handleDeptChange = () => handleDataFill(selectedSchedule);
    function filterUsers(inputElementId, autocompleteListId, employeeFieldId) {
        const input = document.getElementById(inputElementId).value.toLowerCase();
        const autocompleteList = document.getElementById(autocompleteListId);
        const employeeField = document.getElementById(employeeFieldId);

  
      // Clear previous autocomplete results
      autocompleteList.innerHTML = '';
  
      // Filter users based on the input
      const matchedUsers = users.filter(user =>
        user.first_name.toLowerCase().includes(input) || user.last_name.toLowerCase().includes(input) || user.id.toString().includes(input)
      );
  
      // Set filtered users to state
      setFilteredUsers(matchedUsers);
  
      // Display filtered users in the autocomplete list
      matchedUsers.forEach(user => {
        const item = document.createElement('div');
        item.textContent = "#"+user.id + " | "+ user.first_name + " " + user.last_name;
        item.classList.value = ('autocomplete-item');
  
        // Add click event to autocomplete item
        item.addEventListener('click', function () {
            employeeField.value = "#"+user.id + " | "+ user.first_name + " " + user.last_name + " | +974 " + user.phone; // Set input value to the selected user
            employeeField.classList.value = (user.id);      
            console.log(employeeField.classList.value); 
            autocompleteList.innerHTML = ''; // Clear the autocomplete list
        });
  
        // Append the item to the autocomplete list
        autocompleteList.appendChild(item);
      });
    };
    function formatPhoneNumber(value) {
      if (!value) return value;
      // Remove any non-digit characters
      const phoneNumber = value.replace(/[^\d]/g, '');
      // Limit to 8 digits
      const limitedPhoneNumber = phoneNumber.slice(0, 8);
      const phoneNumberLength = limitedPhoneNumber.length;
    
      // Format based on length
      if (phoneNumberLength < 5) return `(+974) ${limitedPhoneNumber}`;
      return `(+974) ${limitedPhoneNumber.slice(0, 4)} ${limitedPhoneNumber.slice(4)}`;
    }
    const phoneFormat = () => {
      const inputField = document.getElementById('emp-phone');
      const formattedInputValue = formatPhoneNumber(inputField.value.replace(/\(\+974\)\s?/g, '').replace(/\s/g, ''));
      inputField.value = formattedInputValue;
      // console.log(inputField.value.replace(/\(\+974\)\s?/g, '').replace(/\s/g, ''));
    }

    const handleDataFill = (user) => { 
      document.getElementById("emp-id").value = "#"+user.id;
        document.getElementById("emp-name").value = user.first_name+" "+user.last_name;
        document.getElementById("emp-phone").value = "(+974) "+user.phone;

    };
    return (
      <>
        <Head>
          <title>Profile</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="stylesheet" href="./styles/scheduler.css" />
        </Head>
        <div style={{height:"100%"}}>
        <div className="container" style={{minWidth:"30rem"}}>
        <form id="submit-paper" action="">
          <h2>Profile</h2>
          <div className="form-group">
            <label htmlFor="emp-id">Employee ID:</label>
            <input type="text" id="emp-id" placeholder="Employee ID" disabled />
          </div>
  
          <div className="form-group">
          <label htmlFor="emp-name">Employee Name:</label>

            <input type="text" id="emp-name" placeholder="Employee Name" disabled />
          </div>
          <div className="form-group">
          <label htmlFor="emp-phone">Phone Number:</label>

            <input type="tel" id="emp-phone" placeholder="+974-xxxx-xxxx" onInput={phoneFormat} />
          </div>
          {/* <label htmlFor="schedule-date">Select Date:</label>

          <div className="form-group" style={{display:"flex",flexDirection:"row",gap:"1.5rem"}}>
            <input type="date" id="schedule-date" min="" onChange={handleDateChange} style={{minWidth:"8rem"}}/> <button disabled={isButtonDisabled} onClick={createSchedule} style={{height:"2.5rem"}}>Create</button>
          </div> */}
          {/* <div style={{display:"flex",flexDirection:"row", justifyContent:"center", alignItems:"stretch",gap:"2rem",flexWrap:"wrap"}}>
          <div className="form-group" style={{flex:1, minWidth:"20rem"}}>
          <label htmlFor="location">Select Hospital:</label>
            <select id="location" value={selectedHospital} onChange={handleHospitalChange} disabled={isFormDisabled}>
              {hospitals.map(hospital => (
                <option key={hospital.id} value={hospital.id}>
                  {hospital.name}
                </option>
              ))}
            </select>
          </div>
  
          <div className="form-group"style={{flex:1, minWidth:"20rem"}} >
          <label htmlFor="department">Select Department:</label>
            <select id="department" disabled={isFormDisabled} onChange={handleDeptChange}>
              {filteredDepartments.map(department => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>
          </div> */}
          {/* <div className="holder" style={{display:"flex", flexDirection:"row", flexWrap:"wrap", alignContent:"space-between", gap:"2rem"}}>
          <div className="container" style={{minWidth:"25rem", padding:"2rem", flex:1}}> */}
           
          {/* <div className="doctor">
          <h2 className="assignment-title" style={{color:"rgba(159, 183, 222)", textAlign:"center"}}>1st On Call</h2>
          <div className="form-group">
            <label htmlFor="search-id-1">Search by ID:</label>
            <input type="text" id="search-id-1" placeholder="Enter employee ID" onInput={() => filterUsers('search-id-1', 'autocomplete-list-1','employee-name-1')} disabled="true"/>
            <div id="autocomplete-list-1" className="autocomplete-list"></div>
          </div>
  
          <div className="form-group">
            <input type="text" id="employee-name-1" placeholder="Employee Information" disabled />
          </div>
          </div>
          
          </div>
          <div className="container" style={{minWidth:"25rem", padding:"2rem", flex:1}}>
           
           <div className="doctor">
           <h2 className="assignment-title" style={{color:"rgba(159, 183, 222)", textAlign:"center"}}>2nd On Call</h2>
           <div className="form-group">
             <label htmlFor="search-id-2">Search by ID:</label>
             <input type="text" id="search-id-2" placeholder="Enter employee ID" onInput={() => filterUsers('search-id-2', 'autocomplete-list-2','employee-name-2')} disabled="true"/>
             <div id="autocomplete-list-2" className="autocomplete-list"></div>
           </div>
   
           <div className="form-group">
             <input type="text" id="employee-name-2" placeholder="Employee Information" disabled />
           </div>
           </div>
           
           </div>
           <div className="container" style={{minWidth:"25rem", padding:"2rem", flex:1}}>
           
           <div className="doctor">
           <h2 className="assignment-title" style={{color:"rgba(159, 183, 222)", textAlign:"center"}}>Consultant</h2>
           <div className="form-group">
             <label htmlFor="search-id">Search by ID:</label>
             <input type="text" id="search-id-3" placeholder="Enter employee ID" onInput={() => filterUsers('search-id-3', 'autocomplete-list-3','employee-name-3')} disabled="true"/>
             <div id="autocomplete-list-3" className="autocomplete-list"></div>
           </div>
   
           <div className="form-group">
             <input type="text" id="employee-name-3" placeholder="Employee Information" className="" disabled />
           </div>
           </div>
            */}
           {/* </div>
          </div> */}
  
          <button id="save-button" type="button" onClick={saveUser} style={{width:"100%", marginTop:"2rem"}}>Save</button>
          </form>
        </div>
        
        </div>
      </>
    );
  }