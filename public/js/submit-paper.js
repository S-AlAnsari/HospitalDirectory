const BASE_URL = '/api/papers';
let counter = 1;
let tab = 0;
createSection(tab);
populate();



function buttons(number) {
    let sections = document.querySelectorAll(".tab");
    let condition = false;
    if (number == 1 && !checkForm()) {
        return condition;
    }
    sections[tab].style.display = "none";
    tab += number;
    if (tab >= sections.length) {
        finish();
        return condition;
    }
    createSection(tab);
}

function createSection(number) {
    let sections = document.querySelectorAll(".tab");
    let none = 0;
    // if (localStorage.getItem("user") === null) {
    //     alert("UNAUTHORIZED ACCESS");
    //     window.location = window.location.href.replace("submit-paper.html", "login.html");

    // } else {
    //     const user = JSON.parse(localStorage.user);
    //     if (user.role != "author") {
    //         alert("UNAUTHORIZED ACCESS");
    //         window.location = window.location.href.replace("submit-paper.html", "index.html");
    //     }
    // }
    sections[number].style.display = "block";

    if (number == none) {
        document.querySelector("#prev").style.display = "none";
    } else {
        document.querySelector("#prev").style.display = "inline";
    }
    Step(number);
    sections[number].classList.toggle("animate");
    if (number == sections.length - 1) {
        document.querySelector("#next").innerHTML = "Submit";
    } else {
        document.querySelector("#next").innerHTML = "Next";
    }
    setTimeout(
        function () {
            if (sections[number].classList.contains("animate"))
                sections[number].classList.toggle("animate");
        },

        500
    );
}


function checkForm() {
    let check = true;
    let sections = document.querySelectorAll(".tab");
    let tAreas = sections[tab].querySelectorAll("textarea");
    let inputs = sections[tab].querySelectorAll("input");
    inputs = [...inputs].map((input) => input.value == "" ? (input.classList.add("invalid"), check = false) : input.classList.remove("invalid"));
    tAreas = [...tAreas].map((tArea) => tArea.value == "" ? (tArea.classList.add("invalid"), check = false) : tArea.classList.remove("invalid"));
    if (check) {
        document.getElementsByClassName("step")[tab].className +=
            " finish";
    }
    return check;
}

function Step(n) {
    var i,
        x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    x[n].className += " active";
}

function addAuthor() {
    const authors = document.querySelector("#authors");
    const inputs = authors.querySelectorAll("input");

    authors.innerHTML += `
    <fieldset id="${++counter}">
                <br>
                <legend>Author</legend>
        <label for="fname-author${counter}">First Name:</label>
        <input
          type="name"
          id="fname"
          name="fname-author${counter}"
          onchange="change()"
        />
        <label for="lname-author${counter}">Last Name:</label>
        <input
          type="name"
          id="lname"
          name="lname-author${counter}"
          onchange="change()"
        />
        <label for="email-author${counter}">Email:</label>
        <input
          type="email"
          id="email"
          name="email-author${counter}"
          onchange="change()"
        />
        <label for="affiliation">Affiliation:</label>
        <select name="affiliation-author${counter}" class="affiliation${counter}"></select>
        <br>
        <br>
        <label for="author${counter}" style="margin-left:46%">Presenter</label>

        <input type="radio" id="author${counter}" name="presenter" value="author${counter}"/>
            </fieldset>

`;
    populate();
    const affil = authors.querySelectorAll("select");
    console.log(affil[0].value);
}

function deleteAuthor() {
    if (counter > 1) {
        const element = document.getElementById(counter);
        element.remove();
        counter--;
    }
}

function change() {
    let sections = document.querySelectorAll(".tab");
    let tAreas = sections[tab].querySelectorAll("textarea");
    let inputs = sections[tab].querySelectorAll("input");
    inputs = [...inputs].map((input) => input.value == "" ? (input.classList.remove("invalid"), check = false) : input.classList.remove("invalid"));
    tAreas = [...tAreas].map((tArea) => tArea.value == "" ? (tArea.classList.remove("invalid"), check = false) : tArea.classList.remove("invalid"));
}

async function populate() {
    const selectField = document.querySelector(`.affiliation${counter}`);
    const jsonFile = await fetch("../api/institutions");
    const places = await jsonFile.json();
    places.forEach(
        (ob) =>
        (selectField.innerHTML += `
        <option value="${ob.id}">${ob.name}</option>`)
    );
    let exist = await fetch(`../api/authors?email=a`,{
        method: 'GET'
    });
    exist = await exist.json();
    // if(exist){
    //     exist = 1
    // }
    // else{
    //     exist = 0
    // }
    console.log(exist);
}

async function finish() {
    let spinner = document.querySelector(".spin");
    let next = document.querySelector(".next");
    let prev = document.querySelector(".prev");
    let check = document.querySelector(".check");
    const authors = document.querySelector("#authors");
    const inputs = authors.querySelectorAll("input");
    const affil = authors.querySelectorAll("select");

    const form = document.querySelector("#submit-paper");
    // const form_inputs = form.querySelectorAll("input");
    var formData = new FormData(form);
    console.log(Object.fromEntries(formData))
    const form_object = Object.fromEntries(formData);

    let response = await fetch(`../api/users?role=reviewer`);
    response = await response.json();
    console.log(response);
    let users = response;
    let max = users.reduce((a, b) => b.id > 0 ? a += 1 : a, 0)
    let reviewer = Math.floor(Math.random() * max);
    console.log(users);
    let email = document.getElementsByName(`email-${form_object.presenter}`);
    const paper = {
        "title": form_object.title,
        "abstract": form_object.abstract,
        "presenter": email[0].value,
        "user_id": JSON.parse(localStorage.user).id,
        "reviewer_id": users.at(reviewer).id,
        "status": "pending",
    };
    let newPaper = await fetch('../api/papers', {
        method: 'POST',
        body: JSON.stringify(paper)
    })
    newPaper = await newPaper.json();
    for (let i = 0; i < inputs.length; i += 4) {
        console.log(affil[i].value)
        let author = {
            "email": inputs[i + 2].value,
            "first_name": inputs[i].value,
            "last_name": inputs[i + 1].value,
            "affiliation": parseInt(affil[i].value)
        }
        let email = inputs[i + 2].value;
        let exist = await fetch(`../api/authors?email=${email}`,{
            method: 'GET'
        })
        let written;
        exist = await exist.json();
        if(exist){
            written = {
                "paperId": newPaper.id,
                "authorId": exist.id
            }
        }else{
        await fetch('../api/authors', {
            method: 'POST',
            body: JSON.stringify(author)
        })
    }
        exist = await fetch(`../api/authors?email=${email}`,{
            method: 'GET'
        })
        exist = await exist.json();
        written = {
            "paperId": newPaper.id,
            "authorId": exist.id
        }
        await fetch('../api/written',{
            method: 'POST',
            body:   JSON.stringify(written)
        })


    }
    next.classList.toggle("hidden");
    prev.classList.toggle("hidden");
    spinner.classList.toggle("hidden");
    setTimeout(function () {
        spinner.classList.toggle("hidden");
        check.classList.toggle("hidden");
    }, 1250)
    window.location.href = "my-papers.html";

}
async function logout() {
    localStorage.clear();
}