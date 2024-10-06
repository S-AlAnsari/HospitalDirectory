const URL = "/api/papers";

async function load() {
  console.log(localStorage.user);
  if (localStorage.getItem("user") === null) {
    alert("UNAUTHORIZED ACCESS");
    window.location = window.location.href.replace(
      "review-paper.html",
      "login.html"
    );
  } else {
    const user = JSON.parse(localStorage.user);
    // if (user.role != "reviewer") {
    //   alert("UNAUTHORIZED ACCESS");
    //   window.location = window.location.href.replace(
    //     "review-paper.html",
    //     "index.html"
    //   );
    // } else {
      const col = document.querySelector(".column");

      let papers = await fetch(URL);
      papers = await papers.json();
      console.log(papers);
      papers = papers.filter((paper) => user.id == paper["reviewer_id"]);
      // console.log(papers);
      console.log(papers.length);
      console.log(papers);
      // console.log("Tester: ", papers[0].written[0].author);
      console.log(user);
      papers = papers.filter((e) => e.status == "pending");

      if (papers.length == 0) {
        col.innerHTML += `<div class="card">
        <h2> No Papers Found </h2>
        </div>
        `;
      } else {
        papers.forEach((paper) => {
          const card = document.createElement("div");
          card.classList.add("card");
          card.innerHTML = `
              <h2>${paper.title}</h2>
              <p>Status: ${paper.status}</p>
            `;
          card.addEventListener("click", () => {
            const overlay = document.createElement("div");
            overlay.classList.add("overlay");
            overlay.innerHTML = `
            <div class="card">
            <form id="paper${paper.id}">
            <h2>${paper.title}</h2>
            <input type="radio" id="accepted" name="status" value="accepted">
            <label for="accepted">Accepted</label><br>
            <input type="radio" id="rejected" name="status" value="rejected">
            <label for="rejected">Rejected</label><br>
            <button class="toggle-btn"  type="button">Show Abstract</button>
                   <p class="abstract hidden">${paper.abstract}</p>
            <div class="details hidden">
              <label for="eval${paper.id}"><b>Paper Evaluation</b></label>
              <input name="eval" id="eval${paper.id}" type="range" min="-2" max="2" value="${paper.eval}" step="1"
                  oninput="showValueEval(this.value,${paper.id})" onchange="showValueEval(this.value,${paper.id})">
              <span id="eval-range${paper.id}">0</span>
              <br>
              <label for="contr${paper.id}"><b>Contribution</b></label>
              <input name="contr" id="contr${paper.id}" class="contr" type="range" min="0" max="5" value="${paper.contr}" step="1"
                  oninput="showValueContr(this.value,${paper.id})" onchange="showValueContr(this.value,${paper.id})">
              <span id="contr-range${paper.id}">0</span>
              <br>
              <label for="strengths${paper.id}"><b>Paper Strengths</b></label>
              <textarea name="strengths" id="strengths${paper.id}" cols="40" rows="5"
                  placeholder="Paper Strengths"></textarea>
              <br>
              <label for="weaknesses${paper.id}"><b>Paper Weaknesses</b></label>
              <textarea name="weaknesses" id="weaknesses${paper.id}" cols="40" rows="5"
                  placeholder="Paper Weaknesses"></textarea>
              <button class="close-btn">X</button>
              <button onclick=save(${paper.id}) type="button">Save</button>
            </div>
            </form>
          </div>

              `;
            document.body.appendChild(overlay);
            const closeBtn = overlay.querySelector(".close-btn");
            closeBtn.addEventListener("click", () => {
              overlay.remove();
            });
            const toggleBtn = overlay.querySelector(".toggle-btn");
            const abstract = overlay.querySelector(".abstract");
            toggleBtn.addEventListener("click", () => {
              abstract.classList.toggle("hidden");
              toggleBtn.textContent = abstract.classList.contains("hidden")
                ? "Show Abstract"
                : "Hide Abstract";
            });
          });
          col.appendChild(card);
        });
      }
      //         } else {
      //             for (let paper in papers) {
      //                 let author = 1;
      //                 let paps = papers[paper];
      //                 col.innerHTML +=
      //                     `<div class="card">
      //     <details class="${paps.id}">
      //         <summary>
      //             <h2>${paps.id}. ${paps.title}</h2>
      //         </summary>
      //         <div class="card">
      //             <details>
      //                 <summary>
      //                     <h3>Abstract</h3>
      //                 </summary>
      //                 <p>${paps.abstract}</p>
      //             </details>
      //         </div>
      //         <div class="card">
      //             <details class="authors-${paper}">
      //                 <summary>
      //                     <h3>Authors</h3>
      //                 </summary>
      //             </details>
      //         </div>
      //         <form action="" id="paper${paps.id}">
      //         </form>
      //     </details>
      // </div>`
      //                 let check = true;
      //                 let authors = document.querySelector(`.authors-${paper}`);
      //                 while (check) {
      //                     if (`fname-author${author}` in paps) {
      //                         authors.innerHTML +=
      //                             `<fieldset class="author${author}-${paper}">
      //             <legend>
      //                 <h4>Author ${author}</h4>
      //             </legend>
      //             <p><b>First Name:</b> ${paps[`fname-author${author}`]}</p>
      //             <p><b>Last Name:</b> ${paps[`lname-author${author}`]}</p>
      //             <p><b>Affiliation:</b> ${paps[`affiliation-author${author}`]}</p>
      //         </fieldset> `
      //                         author++;
      //                     } else {
      //                         check = false;
      //                         console.log(author)
      //                     }

      //                 }
      //                 let authorFieldset = document.querySelector(`.${paps.presenter}-${paper}`)
      //                 authorFieldset.innerHTML += `<p class="presenter"><b>Presenter</b></p>`
      //                 const form = document.querySelector(`#paper${paps.id}`);
      //                 if ("eval" in paps) {
      //                     form.innerHTML += `
      //         <label for="eval${paps.id}"><b>Paper Evaluation</b> </label>
      //         <input name="eval" id="eval${paps.id}" type="range" min="-2" max="2" value="${paps.eval}" step="1"
      //             oninput="showValueEval(this.value,${paps.id})" onchange="showValueEval(this.value,${paps.id})">
      //         <span id="eval-range${paps.id}">${paps.eval}</span>
      //         <br>
      //         <label for="contr${paps.id}"><b>Paper Contribution</b> </label>
      //         <input name="contr" id="contr${paps.id}" class="contr" type="range" min="0" max="5" value="${paps.contr}" step="1"
      //             oninput="showValueContr(this.value,${paps.id})" onchange="showValueContr(this.value,${paps.id})">
      //         <span id="contr-range${paps.id}">${paps.contr}</span>
      //         <br>
      //         <label for="strengths${paps.id}"><b>Paper Strengths</b> </label>
      //         <textarea name="strengths" id="strengths${paps.id}" cols="40" rows="5"
      //             placeholder="Paper Strengths">${paps.strengths}</textarea>
      //             <label for="weak${paps.id}"><b>Paper Weaknesses</b> </label>
      //         <textarea name="weak" id="weak${paps.id}" cols="40" rows="5" placeholder="Paper Weaknesses">${paps.weak}</textarea>
      //         <button onclick=save(${paps.id}) type="button">Save</button>`
      //                 } else {
      //                     form.innerHTML += `
      //         <label for="eval${paps.id}"><b>Paper Evaluation</b> </label>
      //         <input name="eval" id="eval${paps.id}" type="range" min="-2" max="2" value="0" step="1"
      //             oninput="showValueEval(this.value,${paps.id})" onchange="showValueEval(this.value,${paps.id})">
      //         <span id="eval-range${paps.id}">0</span>
      //         <br>
      //         <label for="contr${paps.id}"><b>Paper Contribution</b> </label>
      //         <input name="contr" id="contr${paps.id}" class="contr" type="range" min="0" max="5" value="0" step="1"
      //             oninput="showValueContr(this.value,${paps.id})" onchange="showValueContr(this.value,${paps.id})">
      //         <span id="contr-range${paps.id}">0</span>
      //         <br>
      //         <label for="strengths${paps.id}"><b>Paper Strengths</b> </label>

      //         <textarea name="strengths" id="strengths${paps.id}" cols="40" rows="5"
      //             placeholder="Paper Strengths"></textarea>
      //             <label for="weak${paps.id}"><b>Paper Weaknesses</b> </label>
      //         <textarea name="weak" id="weak${paps.id}" cols="40" rows="5" placeholder="Paper Weaknesses"></textarea>
      //         <button onclick=save(${paps.id}) type="button">Save</button>`
      //                 }
      //             }

      //         }
    //}
  }
}

function showValueEval(newValue, id) {
  document.getElementById(`eval-range${id}`).innerHTML = newValue;
}
function showValueContr(newValue, id) {
  document.getElementById(`contr-range${id}`).innerHTML = newValue;
}

async function save(id) {
  const form = document.querySelector(`#paper${id}`);
  let formData = new FormData(form);
  formData = Object.fromEntries(formData);
  console.log(formData);
  let status = formData.status;
  console.log(status);
  let paper = await fetch(`../api/papers/${id}`);
  paper = await paper.json();
  // paper.status = status;
  let newPaper = paper[0];
  newPaper.status = status;
  delete newPaper.written;
  delete formData.status;
  console.log(formData);
  paper.status = status;
  console.log(newPaper);
  await fetch(`../api/papers/${id}`, {
    method: "PUT",
    body: JSON.stringify(newPaper),
  });

  await fetch(`../api/papers/${id}`, {
    method: "PUT",
    body: JSON.stringify(newPaper),
  });
  paper = await fetch(`../api/papers/${id}`);
  let newReview = {
    evaluation: +formData.eval,
    contribution: +formData.contr,
    strengths: formData.strengths,
    weaknesses: formData.weaknesses,
    paperId: id,
  };
  console.log(newReview);
  await fetch(`../api/review`, {
    method: "POST",
    body: JSON.stringify(newReview),
  });
  // let newPaper = {
  //   ...paper,
  //   ...formData,
  // };
  // await fetch(`../api/papers/${id}`, {
  //   method: "PUT",
  //   body: JSON.stringify(newPaper),
  // });
}

async function logout() {
  localStorage.clear();
}
