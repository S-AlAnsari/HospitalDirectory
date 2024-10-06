const BASE_URL = "../api/users";
// import * as loginServices from "";
// import LoginServices from "./services/login-services";
// const loginServices = new LoginServices();
// const loginServices = require("./services/login-services.js");
// import { getUsers } from "./services/login-services.js";
// let users = []
if (localStorage.getItem("user") != null) {
  alert("ALREADY LOGGED IN");
  window.location = window.location.href.replace("login.html", "index.html");
}

async function checkLogin() {
  let login = document.querySelector("#login-form");
  let spinner = document.querySelector(".spin");
  let emailField = document.querySelector("#email");
  let emailLabel = document.querySelector("#email-label");
  let passwordLabel = document.querySelector("#password-label");
  if (!emailLabel.classList.contains("hidden")) {
    emailLabel.classList.add("hidden");
  }
  if (!passwordLabel.classList.contains("hidden")) {
    passwordLabel.classList.add("hidden");
  }

  login.classList.toggle("hidden");
  spinner.classList.toggle("hidden");

  let email = document.getElementById("email").value;
  let response = await fetch(`${BASE_URL}?email=${email}`);
  response = await response.json();
  let users = response;
  let password = document.getElementById("password").value;
  if (!users || email == "") {
    setTimeout(function () {
      login.classList.toggle("hidden");
      spinner.classList.toggle("hidden");
      console.log(emailLabel.classList.contains("hidden"));
      if (emailLabel.classList.contains("hidden")) {
        emailLabel.classList.remove("hidden");
      }
    }, 1250);
  } else {
    console.log(users);
    if (users.password == password) {
      localStorage.setItem("user", JSON.stringify(users));
      redirecting();
    } else {
      setTimeout(function () {
        login.classList.toggle("hidden");
        spinner.classList.toggle("hidden");
        // emailLabel.classList.toggle("hidden");
        if (passwordLabel.classList.contains("hidden")) {
          passwordLabel.classList.remove("hidden");
        }
      }, 1250);
    }
  }
}

async function redirecting() {
  const user = JSON.parse(localStorage.user);
  console.log(user.role);
  if (user.role == "author") {
    window.location = window.location.href.replace(
      "login.html",
      "submit-paper.html"
    );
  }
  if (user.role == "reviewer") {
    window.location = window.location.href.replace(
      "login.html",
      "review-paper.html"
    );
  }
}
