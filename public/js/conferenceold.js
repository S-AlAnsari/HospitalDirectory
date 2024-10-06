const viewSwitcher = document.querySelector("#view-switcher");
const sessionsButton = document.querySelector("#sessions-button");
const scheduleButton = document.querySelector("#schedule-button");
const sessionsView = document.querySelector("#sessions-view");
const scheduleView = document.querySelector("#schedule-view");
const sessionForm = document.querySelector("#session-form");
const scheduleForm = document.querySelector("#schedule-form");
const titleInput = document.querySelector("#title");
const locationSelect = document.querySelector("#location");
const dateSelect = document.querySelector("#date");
const papersSelect = document.querySelector("#papers");
const cancelButton = document.querySelector("#cancel-button");
const scheduleList = document.querySelector("#schedule-list");
const sessionSelect = document.querySelector("#session-select");
const sessionsSelect = document.querySelector("#sessions");
const presenterInput = document.querySelector("#presenter");
const idInput = document.querySelector("#id");
let dates = [];
let papers = [];
sessionsButton.addEventListener("click", switchToSessionsView);
scheduleButton.addEventListener("click", switchToScheduleView);
cancelButton.addEventListener("click", () => {
  sessionForm.reset();
});
papersSelect.addEventListener("change", async () => {
  const selectedPaperId = papersSelect.value;
  let selectedPaper = await fetch(`/api/papers/${selectedPaperId}`);
  selectedPaper = await selectedPaper.json();
  selectedPaper = selectedPaper[0];
  console.log(selectedPaper);
  presenterInput.value = selectedPaper.presenter;
});

async function populateSessionsSelect() {
  const sessionsSelect = document.getElementById("sessions");
  sessionsSelect.innerHTML = "";
  await fetch("/api/sessions")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch sessions");
      }
      return response.json();
    })
    .then((sessions) => {
      // Populate the session select element with options
      for (const session of sessions) {
        const option = document.createElement("option");
        option.value = session.id;
        option.textContent = session.title;
        sessionSelect.appendChild(option);
        sessionsSelect.appendChild(option);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

sessionSelect.addEventListener("change", async () => {
  const selectedSession = sessionSelect.value;
  const fromTimeInput = document.querySelector("#from-time");
  const toTimeInput = document.querySelector("#to-time");

  if (selectedSession === "") {
    idInput.value = "";
    titleInput.value = "";
    locationSelect.value = 1;
    dateSelect.value = 1;
    papersSelect.value = 1;
  } else {
    let sessions = await fetch("/api/sessions");
    sessions = await sessions.json();
    const filtered = sessions.filter((s) => s.id == selectedSession);
    console.log(filtered[0]);
    console.log(selectedSession);
    titleInput.value = filtered[0].title;
    locationSelect.value = filtered[0].locationId; // Replace with the session's actual location
    dateSelect.value = filtered[0].dateId; // Replace with the session's actual date
    papersSelect.value = filtered[0].paperId; // Replace with the session's actual paper
    fromTimeInput.value = filtered[0].startTime;
    toTimeInput.value = filtered[0].endTime;
    idInput.value = filtered[0].id;
  }
});

function switchToSessionsView() {
  sessionsView.style.display = "block";
  scheduleView.style.display = "none";
}

function switchToScheduleView() {
  sessionsView.style.display = "none";
  scheduleView.style.display = "block";
}

const populateLocationSelect = async () => {
  try {
    const response = await fetch("/api/locations");

    if (!response.ok) {
      throw new Error("Failed to get locations");
    }

    const locations = await response.json();

    locations.forEach((location) => {
      const optionElement = document.createElement("option");
      optionElement.value = location.id;
      optionElement.textContent = location.name;
      locationSelect.appendChild(optionElement);
    });

    console.log("Locations:", locations);
  } catch (error) {
    console.error(error);
  }
};

const populateDateSelect = async () => {
  try {
    dates = await fetch("/api/dates");
    dates = await dates.json();
    dates.forEach((date) => {
      const optionElement = document.createElement("option");
      optionElement.value = date.id;
      optionElement.textContent = new Date(date.date).toLocaleDateString();
      dateSelect.appendChild(optionElement);
    });

    console.log("Dates:", dates);
  } catch (error) {
    console.error(error);
  }
};

// Get a reference to the existing schedules select element
const existingSchedulesSelect = document.getElementById("existing-schedules");

// Populate the existing schedules select element with options
async function populateExistingSchedulesSelect() {
  // Clear any existing options
  existingSchedulesSelect.innerHTML = "";

  // Create an option for each existing schedule
  const option = document.createElement("option");
  option.value = "";
  option.textContent = "--Create new Schedule--";
  existingSchedulesSelect.appendChild(option);
  let schedules = await fetch("/api/schedules");
  schedules = await schedules.json();
  for (const schedule of schedules) {
    const option = document.createElement("option");
    option.value = schedule.id;
    option.textContent = schedule.name;
    existingSchedulesSelect.appendChild(option);
  }
}

sessionForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(sessionForm);
  const session = Object.fromEntries(formData.entries());
  let newSession;
  if (!idInput.value) {
    newSession = {
      title: session.title,
      locationId: +session.location,
      dateId: +session.date,
      paperId: +session.papers,
      startTime: String(session["from-time"]),
      endTime: String(session["to-time"]),
      scheduleId: null,
    };
  } else {
    newSession = {
      id: +idInput.value,
      title: session.title,
      locationId: +session.location,
      dateId: +session.date,
      paperId: +session.papers,
      startTime: String(session["from-time"]),
      endTime: String(session["to-time"]),
      scheduleId: null,
    };
  }
  console.log(newSession);
  try {
    const response = await fetch("/api/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSession),
    });

    if (!response.ok) {
      throw new Error("Failed to create session");
    }

    const createdSession = await response.json();
    console.log("Session created:", createdSession);

    // ... other code to handle the created session
  } catch (error) {
    console.error(error);
  }
  alert("Session created successfully");
  location.reload();
});

scheduleForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(scheduleForm);
  const schedule = Object.fromEntries(formData.entries());
  console.log(schedule);
  const sessionsSelect = document.getElementById("sessions");
  let options = sessionsSelect.options;
  let selectedSessions = [];
  let response;
  for (let i = 0; i < options.length; i++) {
    if (options[i].selected) {
      selectedSessions.push(options[i].value);
    }
  }
  console.log(selectedSessions);
  let newSchedule = {
    name: schedule.name,
  };
  try {
    response = await fetch("/api/schedules", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSchedule),
    });
  } catch (error) {
    console.error(error);
  }
  try {
    response = await response.json();
    let session = await fetch("/api/sessions");
    session = await session.json();
    await Promise.all(
      selectedSessions.map(async (s) => {
        let newSession = session.find((session) => session.id === +s);
        newSession.scheduleId = response.id;
        await fetch("/api/sessions", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newSession),
        });

        console.log(newSession);
      })
    );
  } catch (error) {
    console.error(error);
  }

  alert("Schedule created successfully");
  // let newSession;
  // if (!idInput.value) {
  //   newSession = {
  //     title: schedule.title,
  //     locationId: +schedule.location,
  //     dateId: +schedule.date,
  //     paperId: +schedule.papers,
  //     startTime: String(schedule["from-time"]),
  //     endTime: String(schedule["to-time"]),
  //     scheduleId: null,
  //   };
  // } else {
  //   newSession = {
  //     id: +idInput.value,
  //     title: schedule.title,
  //     locationId: +schedule.location,
  //     dateId: +schedule.date,
  //     paperId: +schedule.papers,
  //     startTime: String(schedule["from-time"]),
  //     endTime: String(schedule["to-time"]),
  //     scheduleId: null,
  //   };
  // }
  // console.log(newSession);
  // try {
  //   const response = await fetch("/api/sessions", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newSession),
  //   });

  //   if (!response.ok) {
  //     throw new Error("Failed to create session");
  //   }

  //   const createdSession = await response.json();
  //   console.log("Session created:", createdSession);

  //   // ... other code to handle the created session
  // } catch (error) {
  //   console.error(error);
  // }
  // alert("Session created successfully");
  // location.reload();
});
// sessionForm.addEventListener("submit", (event) => {
//     event.preventDefault();
//     const date = dates.find((d) => d.id === dateSelect.value);
//     const session = {
//       title: titleInput.value,
//       location: locationSelect.value,
//       dateField: date.date,
//       paperId: papersSelect.value,
//     };
//     const existingSessionIndex = schedule.findIndex(
//       (s) => s.title === session.title
//     );
//     if (existingSessionIndex !== -1) {
//       schedule[existingSessionIndex] = session;
//     } else {
//       schedule.push(session);
//     }
//     loadSchedule();
//     sessionForm.reset();
//   });
const populatePapersSelect = async () => {
  try {
    const response = await fetch("/api/papers");

    if (!response.ok) {
      throw new Error("Failed to get papers");
    }

    papers = await response.json();

    papers.forEach((paper) => {
      const optionElement = document.createElement("option");
      optionElement.value = paper.id;
      optionElement.textContent = paper.title;
      papersSelect.appendChild(optionElement);
    });

    console.log("Papers:", papers);
  } catch (error) {
    console.error(error);
  }
  presenterInput.value = papers[0].presenter;
};

existingSchedulesSelect.addEventListener("change", async (event) => {
  const scheduleId = event.target.value;
  const nameInput = document.getElementById("name");
  if (scheduleId) {
    const schedule = await fetch(`/api/schedules/${scheduleId}`);
    const data = await schedule.json();
    let sch = data[0];
    console.log(data);
    console.log(sch);
    nameInput.value = sch.name;
    sessionsSelect.options = sch.sessions;
    // Populate other form fields with the data as needed
  }
});
populateSessionsSelect();
populateDateSelect();
populateLocationSelect();
switchToSessionsView();
populatePapersSelect();
populateExistingSchedulesSelect();
