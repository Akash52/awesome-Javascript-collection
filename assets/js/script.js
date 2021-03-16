const API_URL =
  'https://raw.githubusercontent.com/Akash52/awesome-Javascript-collection/master/data.json'
const main = document.getElementById('profile-cards')
const search = document.getElementById('search-bar')

getProjects(API_URL)

async function getProjects(url) {
  const res = await fetch(url)
  const data = await res.json()
  const { image_link, handle, message, message1 } = data
  main.innerHTML = ''
  data.forEach((main) => {
    main.innerHTML = `
    <div class="px-6 pt-4">
                    <div class=" pt-6 text-center text-lg">
                        <span>${profile.handle}</span>
                        <div class="w-6/12 sm:w-4/12 px-4">
                        <img alt="..." src='${profile.image_link}' class="shadow-lg rounded max-w-full h-auto align-middle border-none" style="max-width: 250px;max-height:400px" />
                        </div>
                        <div class="pt-6 text-center">
                            <span><i class="fas fa-globe"></i><a href="${profile.message}"  target="_blank" class="no-underline hover:underline text-blue-500 text-lg"> Live Demo</a></span>
                            <span> <i class="fab fa-github"></i><a href="${profile.message1}" target="_blank" class="no-underline  text-orange-500 text-lg hover:text-red-500"> Repository</a></span>
                        </div>
                    </div>  
                </div>
    `
    main.appendChild(project1)
  })
}
