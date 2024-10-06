
const sessionTemplate = document.querySelector("#session-template");
const sessionContainer = document.querySelector("#session-container");
const sessionAddBtn = document.querySelector("#add-session-btn");
const saveScheduleBtn = document.querySelector("#save-schedule-btn");
const dateSelect = document.querySelector("#session-date");
const locationSelect = document.querySelector("#session-location");
const sessionUpdateForm = document.querySelector("#session-update-form");
const sessionSelect = document.querySelector("#session-select");
const sessionSelect2 = document.querySelector("#session-select2");
const sessionSelect3 = document.querySelector("#session-select3");
const sessionTitle = document.querySelector("#session-title-update");
const sessionLocation = document.querySelector("#session-location-update");
const sessionDate = document.querySelector("#session-date-update");
const paperSelect=  document.querySelector("#paper-select");
const updateSessionBtn = document.querySelector("#update-session-btn");
const deleteSessionBtn = document.querySelector("#delete-session-btn");
const presenterSelect = document.querySelector("#presenter-select");
const addpaperbtn = document.querySelector("#add-paper-btn");
const totime = document.querySelector("#to-time");
const fromtime = document.querySelector("#from-time");
const scheduleSelect = document.querySelector("#schedule-select");
const dateeSelect = document.querySelector("#date-select");




const SCHEDULE_BASE_URL = "/api/schedule";
let sessions=[];
let index=0;
let papers=null;
let schedules=null;
let number=0;

// Load conference dates and locations
async function loadData() {
  let BASE_URL = "/api/locations"
let locations = await fetch(BASE_URL);
locations = await locations.json() ;

let BASE_URL2 = "/api/confrence-dates"
let dates = await fetch(BASE_URL2);
dates = await dates.json() ;

let BASE_URL3 = "/api/papers"
 papers = await fetch(BASE_URL3);
papers = await papers.json() ;

let BASE_URL4 = "/api/schedule"
 schedules = await fetch(BASE_URL4);
schedules = await schedules.json() ;

  locations.forEach((location) => {
    const option = document.createElement("option");
    const option2 = document.createElement("option");
    option.text = location.location;
    option.value = location.location;
    option2.text = location.location;
    option2.value = location.location;
    locationSelect.add(option);
    sessionLocation.add(option2);
  });
  dates.forEach((date) => {
    const option = document.createElement("option");
    const option2 = document.createElement("option");
    const option3 = document.createElement("option");
    option.text = date.date;
    option.value = date.date;
    option2.text = date.date;
    option2.value = date.date;
    option3.text = date.date;
    option3.value = date.date;
    dateSelect.add(option);
    sessionDate.add(option2);
    dateeSelect.add(option3);
  });
  papers.forEach((paper) => {
    const option = document.createElement("option");
    option.text = paper.title;
    option.value = paper.title;
    paperSelect.add(option);
  });
  displaySchedules();

}

// Load existing schedule if available
// async function loadSchedule() {
//   const schedule = await scheduleRepo.getSchedule();
//   if (schedule) {
//     schedule.sessions.forEach((session) => {
//       addSession(session);
//       addSessionToUpdateForm(session);
//     });
//   }
// }

// // Add session to UI
function displaySessions(){
  document.getElementById("session-select3").innerHTML = "";
  document.getElementById("session-select").innerHTML = "";
  document.getElementById("session-select2").innerHTML = "";
  sessions.forEach((session) => {
    const option = document.createElement("option");
    option.text = session.title + " - " + session.location + " - " + session.date;
    option.value =`${session.title} ${session.location} ${session.date}` ;
    const option2 = document.createElement("option");
    option2.text = session.title + " - " + session.location + " - " + session.date;
    option2.value =`${session.title} ${session.location} ${session.date}` ;
    const option3 = document.createElement("option");
    option3.text = session.title + " - " + session.location + " - " + session.date;
    option3.value =`${session.title} ${session.location} ${session.date}` ;
    sessionSelect.add(option);
    sessionSelect3.add(option3);
    sessionSelect2.add(option2);
})}
 function addSession(session) {
   sessions[index]=session;
   index++;
}
function displaySchedules(){
  document.getElementById("schedule-select").innerHTML = "";
  document.getElementById("schedule-select").innerText = "";
  
  schedules.forEach((schedule) => {
    let option = document.createElement("option");
    option.innerHTML = "Schedule:"+schedule.id+"=>"+schedule.session;
    console.log(schedule.session)
    option.value =schedule.name ;
    scheduleSelect.add(option);
})}

// // Handle add session button click
 

// // Handle update session button click
 
// // Load existing schedule if available
// async function loadSchedule() {
//   const schedule = await api.getSchedule();
//   if (schedule) {
//     schedule.sessions.forEach((session) => {
//       addSession(session);
//     });
//   }
// }

// // Add session to UI
// function addSession(session) {
//   const sessionEl = sessionTemplate.content.cloneNode(true).querySelector(".session");
//   sessionEl.querySelector(".session-title").textContent = session.title;
//   sessionEl.querySelector(".session-location").textContent = session.location;
//   sessionEl.querySelector(".session-date").textContent = session.date;
//   sessionEl.querySelector(".session-delete-btn").addEventListener("click", () => {
//     sessionEl.remove();
//   });
//   sessionEl.querySelector(".session-edit-btn").addEventListener("click", () => {
//     populateUpdateForm(session);
//   });
//   sessionContainer.appendChild(sessionEl);
// }

// // Handle add session button click
// sessionAddBtn.addEventListener("click", () => {
//   addSession({
//     title: "",
//     location: "",
//     date: dateSelect.value,
//   });
// });

// // Handle save schedule button click
// saveScheduleBtn.addEventListener("click", async () => {
//   const sessions = [...sessionContainer.querySelectorAll(".session")].map((sessionEl) => {
//     return {
//       title: sessionEl.querySelector(".session-title").textContent,
//       location: sessionEl.querySelector(".session-location").textContent,
//       date: sessionEl.querySelector(".session-date").textContent,
//     };
//   });

//   const result = await api.saveSchedule({ sessions });
//   console.log(result);
// });

// // Populate update session form with selected session's details
// function populateUpdateForm(session) {
//   const updateTitleInput = document.querySelector("#update-session-title");
//   const updateLocationInput = document.querySelector("#update-session-location");
//   const updateDateInput = document.querySelector("#update-session-date");

//   updateTitleInput.value = session.title;
//   updateLocationInput.value = session.location;
//   updateDateInput.value = session.date;

//   const updateSessionBtn = document.querySelector("#update-session-btn");
//   updateSessionBtn.addEventListener("click", () => {
//     const sessionEl = sessionContainer.querySelector(`[data-session="${session.id}"]`);
//     sessionEl.querySelector(".session-title").textContent = updateTitleInput.value;
//     sessionEl.querySelector(".session-location").textContent = updateLocationInput.value;
//     sessionEl.querySelector(".session-date").textContent = updateDateInput.value;

//     // Remove update form and reset inputs
//     const updateForm = document.querySelector("#update-session-form");
//     updateForm.reset();
//     updateForm.style.display = "none";
//   });

//   const deleteSessionBtn = document.querySelector("#delete-session-btn");
//   deleteSessionBtn.addEventListener("click", () => {
//     const sessionEl = sessionContainer.querySelector(`[data-session="${session.id}"]`);
//     sessionEl.remove();

//     // Remove update form and reset inputs
//     const updateForm = document.querySelector("#update-session-form");
//     updateForm.reset();
//     updateForm.style.display = "none";
//   });

//   const updateForm = document.querySelector("#update-session-form");
//   updateForm.style.display = "block";
// }

// // Hide update session form when cancel button is clicked
// const cancelUpdateBtn = document.querySelector("#cancel-update-btn");
// cancelUpdateBtn.addEventListener("click", () => {
//   const updateForm = document.querySelector("#update-session-form");
//   updateForm.reset();
//   updateForm.style.display = "none";
// });

loadData();
sessionAddBtn.addEventListener("click", () => {
  const title = document.querySelector("#session-title").value;
  const location = document.querySelector("#session-location").value;
  const date = document.querySelector("#session-date").value;
  const session = { title:title, location:location, date:date, paper:null, fromTime:null, toTime:null};
  addSession(session);
  displaySessions();
});

updateSessionBtn.addEventListener("click", () => {
  let session_Title =sessionSelect.value;
  sessions.forEach((session) => {
   if (session.title==session_Title){
     session.title=sessionTitle.value;
     session.location=sessionLocation.value;
     session.date=sessionDate.value;
   }
})
displaySessions();
displaySchedules();
});

deleteSessionBtn.addEventListener("click", () => {
  let session_Title =sessionSelect.value;
  sessions.forEach((session) => {
    if (session.title==session_Title){
      sessions.splice(session)
    }})
    displaySessions();
});
paperSelect.addEventListener("change", () =>{
  let paper_Title =paperSelect.value;
  papers.forEach((paper) => {
    if (paper.title==paper_Title){
     document.getElementById("presenter-select").innerHTML = "";
     const option = document.createElement("option");
     option.text = paper.presenter;
     option.value =paper.presenter ;
    presenterSelect.add(option);
    }
})
})
addpaperbtn.addEventListener("click", ()=>{
  let paper_Title =paperSelect.value;
  let found_paper=null;
  papers.forEach((paper) => {
    if (paper.title==paper_Title){
     found_paper=paper;
    }
})
let session_Title =sessionSelect2.value;
sessions.forEach((session) => {
 if (session.title==session_Title){
   session.paper=found_paper;
   session.toTime=totime.value;
   session.fromTime=fromtime.value;
   
   alert("paper added to session successfully ")
 }
})
})
saveScheduleBtn.addEventListener("click", ()=>{
  
  const newSchedule = {
    id: number,
    session: sessionSelect3.value
}
console.log(sessionSelect3.value)
number++;
addNewSchedule(newSchedule);
document.getElementById("schedule-select").innerHTML = "";
displaySchedules();
});
async function addNewSchedule(newSchedule) {
  try {
      const response = await fetch(SCHEDULE_BASE_URL, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(newSchedule),
      });
     

      if (response.ok) {
          console.log('schedule added successfully');
          alert('schedule added successfully');
      } else {
          console.error('Error:', response.statusText);
      }
  } catch (error) {
      console.error('Error:', error);
  }
}
dateeSelect.addEventListener("change", () =>{
  let date =dateeSelect.value;
  document.getElementById("schedule-select").innerHTML = "";
  schedules.forEach((schedule) => {
    let tt= schedule.session
    console.log(schedule)
    if (tt.includes(date)){
     const option = document.createElement("option");
     option.text = schedule;
     option.value =schedule ;
     scheduleSelect.add(option)
    }
})
})
//loadSchedule();