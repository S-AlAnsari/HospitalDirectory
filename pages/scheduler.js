import Head from 'next/head';
import { useEffect, useState} from 'react';
import { useRouter } from 'next/router';

let users = [];
export async function getServerSideProps() {
  const response = await fetch('http://localhost:3000/api/schedules'); // Use your actual API endpoint
  const schedules = await response.json();
  const response2 = await fetch('http://localhost:3000/api/users'); // Fetch user data from your API
  const hospitalResponse = await fetch('http://localhost:3000/api/hospitals'); // Fetch hospitals
  const hospitals = await hospitalResponse.json();
  const departmentResponse = await fetch(`http://localhost:3000/api/departments`);
  const departments = await departmentResponse.json();
  const assignmentsResponse = await fetch(`http://localhost:3000/api/assignments`);
  const assignments = await assignmentsResponse.json();
    users = await response2.json(); // Parse the response as JSON
    console.log(users)

  return {
    props: {
      schedules, users, hospitals, departments, assignments
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
export default function Scheduler({ schedules, users, hospitals, departments, assignments}) {
    let scheduleId;
    const router = useRouter();
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
    const [ls, setLocalStorage] = useState(null);  // To store hospitals data
    const [filteredDepartments, setDepartments] = useState([]); // To store departments data
    const [selectedHospital, setSelectedHospital] = useState(''); // Selected hospital
    const [selectedSchedule, setSchedule] = useState(); // Selected hospital
    const [updatedSchedules, setSchedules] = useState(schedules); // Selected hospital
    const [updatedAssignemnts, setAssignments] = useState(assignments); // Selected hospital

   
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     // This ensures `localStorage` is accessed on the client side
  //     const savedValue = window.localStorage.getItem("user");
  //     setLocalStorage(savedValue ? JSON.parse(savedValue) : null);
  //   }
  // }, []);

  // useEffect(() => {
  //   // Check if `ls` is not null to handle redirection
  //     console.log("NOT NULL")
  //     console.log(ls);
  //     const user = ls;
  //     if (!ls || !user || user.first_name !== "John") {
  //       router.push("/hospitals");
  //     }
  // }, [ls, router]);

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
    const handleDataFill = (scheduleId) => {
      [1,2,3].forEach((num) =>{
        document.getElementById("employee-name-"+num).classList.value = "";
        document.getElementById("search-id-"+num).classList.value = "";
        document.getElementById("employee-name-"+num).value = "";

    });

      let deptId = document.getElementById("department").value;
      let dataFill = updatedAssignemnts.filter((assignment) => assignment.departmentId == deptId && assignment.scheduleId == (scheduleId ? scheduleId : selectedSchedule));
      dataFill.forEach((assignment) => {
          document.getElementById("employee-name-"+assignment.criteria).classList.value = (assignment.userId);
          document.getElementById("search-id-"+assignment.criteria).classList.value = assignment.id;
          document.getElementById("employee-name-"+assignment.criteria).value = "#"+assignment.userId+" | "+assignment.user.first_name + " " + assignment.user.last_name +" | " +"+974 "+assignment.user.phone;
    });
    console.log(scheduleId ? ("Sched")+scheduleId : ("Ule")+selectedSchedule);

    }
      const dateChecker = (date) => {
        console.log(`Function called with date: ${date}`);
        if(updatedSchedules.some(schedule => schedule.date === date)){
            setIsButtonDisabled(true); // Enable button if date exists
            setFormDisabled(false);
            scheduleId = updatedSchedules.filter(schedule => schedule.date === date)[0].id
            setSchedule(scheduleId)
            console.log(scheduleId);
            handleDataFill(scheduleId);
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
      let onCallOneId = document.getElementById("search-id-1").classList.value;
      let onCallTwoId = document.getElementById("search-id-2").classList.value;
      let consultantId = document.getElementById("search-id-3").classList.value;
      let deptId = document.getElementById("department").value;
      let dept = departments.filter((department) => department.id == deptId);
      let sched = updatedSchedules.filter((schedule) => schedule.id == selectedSchedule);
      console.log(deptId);
      console.log("Sched "+selectedSchedule);
      console.log(onCallOne);
      let dataOne, dataTwo, dataThree;
      if(onCallOneId){
        dataOne = {
          id: parseInt(onCallOneId),
          criteria: 1,
          userId: parseInt(onCallOne),
            departmentId: parseInt(deptId),
            scheduleId: parseInt(selectedSchedule)
        }
          dataTwo = {
            id: parseInt(onCallTwoId),
            criteria: 2,
            userId: parseInt(onCallTwo),
            departmentId: parseInt(deptId),
            scheduleId: parseInt(selectedSchedule)
    
          }
          dataThree = {
            id: parseInt(consultantId),
            criteria: 3,
            userId: parseInt(consultant),
            departmentId: parseInt(deptId),
            scheduleId: parseInt(selectedSchedule)
          }
      }else{
         dataOne = {
          criteria: 1,
          userId: parseInt(onCallOne),
            departmentId: parseInt(deptId),
            scheduleId: parseInt(selectedSchedule)
        }
           dataTwo = {
            criteria: 2,
            userId: parseInt(onCallTwo),
            departmentId: parseInt(deptId),
            scheduleId: parseInt(selectedSchedule)
    
          }
           dataThree = {
            criteria: 3,
            userId: parseInt(consultant),
            departmentId: parseInt(deptId),
            scheduleId: parseInt(selectedSchedule)
          }
      }
      
      updateSchedules([dataOne, dataTwo, dataThree]);

      }

      async function updateSchedules(putData) {
        try {
          const updatePromises = putData.map(doctor =>
            fetch('/api/assignments', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(doctor),
            })
          );
          
          // Execute all the requests concurrently
          await Promise.all(updatePromises);
          
          alert('Schedule Saved!');
        } catch (error) {
          console.error('Error:', error);
          alert('There was an error saving the schedule');
        }
      };
      

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
        const scheds = await fetch('http://129.151.142.208:3000/api/schedules');
        const responsed = await scheds.json();
        setSchedules(responsed);
    };
    useEffect(() => {
      console.log(updatedSchedules);
  }, [updatedSchedules]);
  useEffect(() => {
    console.log(selectedSchedule);
}, [selectedSchedule]);
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
    // if (ls === null) {
    //   // window.location = window.location.href.replace(
    //   //   "scheduler",
    //   //   "hospitals"
    //   // );
    // } else {
    //   const user = JSON.parse(ls);
    //   if (user.role != "admin") {
    //     // window.location = window.location.href.replace(
    //     //   "scheduler",
    //     //   "hospitals"
    //     // );
    //   } else {
    return (
      <>
        <Head>
          <title>Scheduler</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="stylesheet" href="./styles/scheduler.css" />
        </Head>
        <nav>
        <div class="nav">
          <ul class="main-nav">
          <li><a href="/hospitals">Hospital Directory</a></li>
          <li><a href="/scheduler">Scheduler</a></li>
          <li><a href="/profile">Edit Profile</a></li>
            <li><a href="login.html" class="log" onClick={() => logout()}>Logout</a></li>
          </ul>
        </div>
      </nav>
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
            <select id="department" disabled={isFormDisabled} onChange={handleDeptChange}>
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
        <footer style={{ }}>
    <div id="submit-paper" className="paper-container" style={{maxWidth:"20rem",padding:"0rem", bottom:"0px", position:"fixed"}}>
      <p>Copyright @ 2024 | Salem Al-Ansari</p>
</div>
    </footer>
      </>
    );
  }
