$.getJSON(
  'https://raw.githubusercontent.com/Akash52/JS-Project-Display/master/data.json',
  (data) => {
    let profileKeys = ['handle', 'image_link', 'message', 'message1']

    let isProfileValid = (profile) => profileKeys.every((k) => k in profile)
    let getUniqueProfiles = (profiles) =>
      Array.from(new Set(profiles.map((p) => p.handle))).map((id) => {
        let profile = {}
        profileKeys.forEach((k) => {
          profile[k] = profiles.find((p) => p.handle === id)[k]
        })
        return profile
      })
    // get only unique and valid profiles
    let profiles = getUniqueProfiles(data.profiles.filter(isProfileValid))

    let cardParent = document.getElementById('profile-cards')
    for (let index = 0; index < profiles.length; index += 1) {
      let card = document.createElement('div')
      let = profile = profiles[index]
      card.innerHTML = `
      <div className="max-w-md py-4 px-8  shadow-lg rounded-lg my-2">
                    <div class=" pt-6 text-center text-xl">
                        <span class="text-xl hover:text-orange-500">${profile.handle}</span>
                        <div class="w-6/12 sm:w-4/12 px-4">
                        <img alt="..." src='${profile.image_link}' class="shadow-lg rounded max-w-full  h-auto " style="max-width:250px;max-height:400px" />
                        </div>
                        <div class="p-5 text-center">
                            <span><i class="fas fa-globe"></i><a href="${profile.message}"  target="_blank" class="no-underline  text-blue-500 text-xl"> Live Demo</a></span>
                            <span><i class="fab fa-github"></i><a href="${profile.message1}" target="_blank" class="no-underline  text-orange-500 text-xl hover:text-red-500"> Repository</a></span>
                        </div>
                    </div>  
                  </div>     
        `
      cardParent.appendChild(card)
    }
  }
)
