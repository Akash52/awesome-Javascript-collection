const getBtn = document.getElementById('get-btn')
const mealList = document.getElementById('meal')

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
          <div class="px-6 pt-4">
          <div class=" pt-6 text-center text-lg">
              <span>${profile.handle}</span>
              <div class="w-6/12 sm:w-4/12 px-4">
              <img alt="..." src='${profile.image_link}' class="shadow-lg rounded max-w-full h-auto align-middle border-none" style="max-width:250px;max-height:400px" />
              </div>
              <div class="pt-6 text-center">
                  <span><i class="fas fa-globe"></i><a href="${profile.message}"  target="_blank" class="no-underline hover:underline text-blue-500 text-lg"> Live Demo</a></span>
                  <span> <i class="fab fa-github"></i><a href="${profile.message1}" target="_blank" class="no-underline  text-orange-500 text-lg hover:text-red-500"> Repository</a></span>
              </div>
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
