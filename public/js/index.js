// import * as services from './services/paper-services.js';
const dropdownBtn = document.querySelector(".dropbtn");
const dropdownContent = document.querySelector(".dropdown-content");

dropdownBtn.addEventListener("mouseover", () => {
  dropdownContent.style.display = "block";
});

dropdownBtn.addEventListener("mouseout", () => {
  dropdownContent.style.display = "none";
});
// This function will be called when the page is loaded
document.addEventListener("DOMContentLoaded", async () => {
  window.loadPage = loadPage;
  window.deleteRecipe = deleteRecipe;
  window.addRecipe = addRecipe;
  await loadRecipes();
});
// We will use this variable to store all recipes
let recipes = [];

// We will use this variable to store all dom elements that we will use in our app
const mainContent = document.querySelector("#main-content");

let recipesCards;
let form;

// This will help us to load the page dynamically
// and also to pass the id of the recipe to be updated
async function loadPage(pageUrl, id) {
  const page = await fetch(pageUrl);
  const pageHTMLContent = await page.text();
  mainContent.innerHTML = pageHTMLContent;
  // check if we are in the recipes page or the form page

  if (pageUrl == "pages/recipes.html") {
    recipesCards = document.querySelector("#recipe-cards");
    displayRecipes();
  } else if (pageUrl == "pages/form.html") {
    form = document.querySelector("#recipe-form");

    // check if we are in add mode or edit mode
    if (!id) {
      form.addEventListener("submit", addRecipe);
    } else {
      // get the recipe from the service
      const recipe = await services.getRecipe(id);

      // fill the form with the recipe data
      for (const key in recipe) form[key].value = recipe[key];

      // change the button text
      form.querySelector("#submit-recipe-btn").value = "Update Recipe";

      // add the event listener to the form
      form.addEventListener("submit", (e) => updateRecipe(e, id));
    }
  }
}

// This function will be called when the user clicks on the delete button
// or when the app is loaded for the first time
async function loadRecipes() {
  await loadPage("pages/recipes.html");
  recipes = await services.getRecipes();
  displayRecipes();
}

async function displayRecipes() {
  const pageHTMLContent = recipes
    .map((recipe) => recipeToCard(recipe))
    .join(" ");
  recipesCards.innerHTML = pageHTMLContent;
}

function recipeToCard(recipe) {
  return `<div class="recipe-card">
                    <img src="${recipe.image}" class="card-img" />
                    <div class="description">
                        <h1>${recipe.name}</h1>
                        <h3>${recipe.region}</h3>
                        <hr>
                        <h2>Instructions for ${recipe.id}</h2>
                        <p class="instructions">${recipe.instructions}
                        </p>
                    </div>
                    <div class="action-btns">
                        <button class="btn-update" onclick="loadPage('pages/form.html', ${recipe.id})"> <i class="fa fa-pencil">Update</i></button>
                        <button class="btn-delete" onclick="deleteRecipe(${recipe.id})"> <i class="fa fa-trash"> Delete </i></button>
                    </div>
                </div>
        `;
}

async function deleteRecipe(id) {
  await services.deleteRecipe(id);
  await loadRecipes();
}

async function addRecipe(e) {
  e.preventDefault();
  const recipe = formToObject(e.target);
  await services.addRecipe(recipe);
  await loadRecipes();
}
async function updateRecipe(e, id) {
  e.preventDefault();
  const recipe = formToObject(e.target);
  await services.updateRecipe(id, recipe);
  await loadRecipes();
}
function toggleDropdown() {
  document.querySelector(".dropdown-content").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    const dropdowns = document.querySelectorAll(".dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      const dropdown = dropdowns[i];
      if (dropdown.classList.contains("show")) {
        dropdown.classList.remove("show");
      }
    }
  }
};

function formToObject(form) {
  const formData = new FormData(form);
  const data = {};

  for (const [key, value] of formData) data[key] = value;

  return data;
}
