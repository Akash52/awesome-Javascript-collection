const searchBtn = document.getElementById('search-btn')
const mealList = document.getElementById('meal')
const mealDetailsContent = document.querySelector('.meal-details-content')
const recipeCloseBtn = document.getElementById('recipe-close-btn')

//console.log(recipeCloseBtn)

// Event Listener
searchBtn.addEventListener('click', getMealList)
mealList.addEventListener('click', getMealRecipe)

recipeCloseBtn.addEventListener('click', () => {
  mealDetailsContent.parentElement.classList.remove('showRecipe')
})

function getMealList() {
  //console.log('Search')
  let searchInput = document.getElementById('search-input').value.trim()
  //console.log(searchInput.length)
  fetch(`https://fake-server-appp.herokuapp.com/meals?q=${searchInput}`)
    .then((response) => response.json())
    .then((data) => {
      let html = ' '
      if (data) {
        data.forEach((meal) => {
          html += `
            <div class="meal-item" data-id="${meal.id}">
            <div class="meal-img">
              <img src="${meal.strMealThumb}" alt="food" />
            </div>
            <div class="meal-name">
              <h3>${meal.strMeal}</h3>
              <a href="#" class="recipe-btn">Get Recipe</a>
            </div>
          </div>
            `
        })
      } else {
        html = "Sorry, we didn't find any meal !"
        mealList.classList.add('notFound')
      }
      mealList.innerHTML = html
    })
}

// Get recipe of the meal

function getMealRecipe(e) {
  e.preventDefault()

  if (e.target.classList.contains('recipe-btn')) {
    let mealItem = e.target.parentElement.parentElement
    //console.log(mealItem)
    fetch(
      `https://fake-server-appp.herokuapp.com/meals?id=${mealItem.dataset.id}`
    )
      .then((response) => response.json())
      .then((data) => mealRecipeModal(data))
  }
}

// Create a Modal

function mealRecipeModal(meal) {
  //console.log(meal)
  meal = meal[0]

  let html = `
  <h2 class="recipe-title">${meal.strMeal}</h2>
            <p class="recipe-category">${meal.strCategory}</p>
            <div class="recipe-instruct">
              <h3>About :</h3>
              <p>
                ${meal.strDetail}
              </p>
            </div>
            <div class="recipe-meal-img">
              <img src="${meal.strMealThumb}" alt="" />
            </div>
            <div class="recipe-link">
              <a href="${meal.strLink}" target="_blank">Get Full Recipe</a>
            </div>
  `
  mealDetailsContent.innerHTML = html
  mealDetailsContent.parentElement.classList.add('showRecipe')
}
