import Head from 'next/head';
import { useEffect, useState} from 'react';
let users = [];
export async function getServerSideProps() {
  const response = await fetch('http://localhost:3000/api/schedules'); // Use your actual API endpoint
  const schedules = await response.json();
  const response2 = await fetch('http://localhost:3000/api/users'); // Fetch user data from your API
  const hospitalResponse = await fetch('http://localhost:3000/api/hospitals'); // Fetch hospitals
  const hospitals = await hospitalResponse.json();
  const departmentResponse = await fetch(`http://localhost:3000/api/departments`);
  const departments = await departmentResponse.json();

    users = await response2.json(); // Parse the response as JSON
    console.log(users)

  return {
    props: {
      schedules, users, hospitals, departments
    },
  };
}




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
export default function Scheduler({ schedules, users, hospitals, departments}) {
    let scheduleId;
    // Optional: Add any JavaScript logic (e.g., handling dates, input)
    
    // Update minimum date for the date picker dynamically
    useEffect(() => {
      const dateInput = document.getElementById('schedule-date');
      const today = new Date().toISOString().split('T')[0];
      dateInput.min = today; 
    }, []);
    const [selectedDate, setSelectedDate] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true); 
    const [isFormDisabled, setFormDisabled] = useState(true);
    const [oldH, setHospitals] = useState([]);  // To store hospitals data
    const [filteredDepartments, setDepartments] = useState([]); // To store departments data
    const [selectedHospital, setSelectedHospital] = useState(''); // Selected hospital
    const [selectedSchedule, setSchedule] = useState(); // Selected hospital

    useEffect(() => {
        async function fetchHospitalsAndDepartments() {
          try {
    
            if (hospitals.length > 0) {
              // Automatically set the departments for the first hospital
              fetchDepartments(hospitals[0].id);
              setSelectedHospital(hospitals[0].id);
            }
          } catch (error) {
            console.error('Error fetching hospitals or departments:', error);
          }
        }
    
        fetchHospitalsAndDepartments();
      }, []);
    
      // Fetch departments based on the selected hospital
      const fetchDepartments = async (hospitalId) => {
        try {
          let departmentData = departments.filter((department) => department.hospitalId == hospitalId);
          console.log(departmentData)
          setDepartments(departmentData);
          console.log(scheduleId);
          if(scheduleId != undefined){
            console.log("Hello!!!!");
          }
        } catch (error) {
          console.error('Error fetching departments:', error);
        }
      };
    
      // Handle hospital selection change
      const handleHospitalChange = (event) => {
        const hospitalId = event.target.value;
        setSelectedHospital(hospitalId);
        // Fetch and populate departments for the selected hospital
        fetchDepartments(hospitalId);
      };
    
    const handleDateChange = (event) => {
        const selectedDateValue = event.target.value;
        console.log(event.target);
        let d = new Date(selectedDateValue);
        setSelectedDate(d.toISOString());
        // Your function logic here
        console.log('Date selected:', d.toISOString());
        // Call any function when date is selected
        dateChecker(d.toISOString());
      };
    
      const dateChecker = (date) => {
        console.log(`Function called with date: ${date}`);
        if(schedules.some(schedule => schedule.date === date)){
            setIsButtonDisabled(true); // Enable button if date exists
            setFormDisabled(false);
            scheduleId = schedules.filter(schedule => schedule.date === date)[0].id
            setSchedule(scheduleId)
            console.log(scheduleId);
        } else {
          setIsButtonDisabled(false); // Disable button if date does not exist
          setFormDisabled(true);

        }
        // Your logic here
      };
    const saveSchedule = () => {
      let onCallOne = document.getElementById("employee-name-1").classList.value;
      let onCallTwo = document.getElementById("employee-name-2").classList.value;
      let consultant = document.getElementById("employee-name-3").classList.value;
      let deptId = document.getElementById("department").value;
      let dept = departments.filter((department) => department.id == deptId);
      let sched = schedules.filter((schedule) => schedule.id == selectedSchedule);
      console.log(deptId);
      console.log("Sched "+selectedSchedule);
      console.log(onCallOne);
      let dataOne = {
        criteria: 1,
        userId: parseInt(onCallOne),
          departmentId: parseInt(deptId),
          scheduleId: parseInt(selectedSchedule)
      }
        let dataTwo = {
          criteria: 2,
          userId: parseInt(onCallTwo),
          departmentId: parseInt(deptId),
          scheduleId: parseInt(selectedSchedule)
  
        }
        let dataThree = {
          criteria: 3,
          userId: parseInt(consultant),
          departmentId: parseInt(deptId),
          scheduleId: parseInt(selectedSchedule)
        }
        let putData = [dataOne,dataTwo,dataThree];
        putData.forEach((doctor) => 
          fetch('/api/assignments', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(doctor),
          })
          .then(response => response.json())
          .then(data => {
    
          })
          .catch((error) => {
            console.error('Error:', error);
            alert('There was an error saving the schedule');
          })
        )
        alert('Schedule Saved!');

      }

     

    const createSchedule = () => {
        setIsButtonDisabled(true); 
        setFormDisabled(false);
        console.log(selectedDate);

        const scheduleData = {
          date:  selectedDate ,
        };
      
        fetch('/api/schedules', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(scheduleData),
        })
        .then(response => response.json())
        .then(data => {
          alert('Schedule saved successfully');
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('There was an error saving the schedule');
        });
    }

    const [filteredUsers, setFilteredUsers] = useState([]);

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
        item.textContent = user.id + " | "+ user.first_name + " " + user.last_name;
        item.classList.add('autocomplete-item');
  
        // Add click event to autocomplete item
        item.addEventListener('click', function () {
            employeeField.value = user.id + " | "+ user.first_name + " " + user.last_name + " | +974 " + user.phone; // Set input value to the selected user
            employeeField.classList.add(user.id);      
            console.log(employeeField.classList.value); 
            autocompleteList.innerHTML = ''; // Clear the autocomplete list
        });
  
        // Append the item to the autocomplete list
        autocompleteList.appendChild(item);
      });
    };
    return (
      <>
        <Head>
          <title>Scheduler</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="stylesheet" href="./styles/scheduler.css" />
        </Head>
        <div style={{height:"100%"}}>
        <div className="container" style={{minWidth:"30rem"}}>
        <form id="submit-paper" action="">
          <h2>Schedule Creator</h2>
          <label htmlFor="schedule-date">Select Date:</label>

          <div className="form-group" style={{display:"flex",flexDirection:"row",gap:"1.5rem"}}>
            <input type="date" id="schedule-date" min="" onChange={handleDateChange} style={{minWidth:"8rem"}}/> <button disabled={isButtonDisabled} onClick={createSchedule} style={{height:"2.5rem"}}>Create</button>
          </div>
          <div style={{display:"flex",flexDirection:"row", justifyContent:"center", alignItems:"stretch",gap:"2rem",flexWrap:"wrap"}}>
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
            <select id="department" disabled={isFormDisabled}>
              {filteredDepartments.map(department => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>
          </div>
          <div className="holder" style={{display:"flex", flexDirection:"row", flexWrap:"wrap", alignContent:"space-between", gap:"2rem"}}>
          <div className="container" style={{minWidth:"25rem", padding:"2rem", flex:1}}>
           
          <div className="doctor">
          <h2 className="assignment-title" style={{color:"rgba(159, 183, 222)", textAlign:"center"}}>1st On Call</h2>
          <div className="form-group">
            <label htmlFor="search-id-1">Search by ID:</label>
            <input type="text" id="search-id-1" placeholder="Enter employee ID" onInput={() => filterUsers('search-id-1', 'autocomplete-list-1','employee-name-1')} disabled={isFormDisabled}/>
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
             <input type="text" id="search-id-2" placeholder="Enter employee ID" onInput={() => filterUsers('search-id-2', 'autocomplete-list-2','employee-name-2')} disabled={isFormDisabled}/>
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
             <input type="text" id="search-id-3" placeholder="Enter employee ID" onInput={() => filterUsers('search-id-3', 'autocomplete-list-3','employee-name-3')} disabled={isFormDisabled}/>
             <div id="autocomplete-list-3" className="autocomplete-list"></div>
           </div>
   
           <div className="form-group">
             <input type="text" id="employee-name-3" placeholder="Employee Information" className="" disabled />
           </div>
           </div>
           
           </div>
          </div>
  
          <button id="save-button" type="button" onClick={saveSchedule} style={{width:"100%", marginTop:"2rem"}}>Save</button>
          </form>
        </div>
        
        </div>
      </>
    );
  }