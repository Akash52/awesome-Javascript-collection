const getBtn = document.getElementById('get-btn')
const profileCards = document.getElementById('profile-cards')

// Event Listener
getBtn.addEventListener('click', profileCards)

function profileCards() {
  fetch(
    `https://raw.githubusercontent.com/Akash52/awesome-Javascript-collection/master/data.json`
  )
    .then((response) => response.json())
    .then((data) => {
      let html = ' '
      if (data) {
        data.forEach((profile) => {
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
        profileCards.classList.add('notFound')
      }
      profileCards.innerHTML = html
    })
}
