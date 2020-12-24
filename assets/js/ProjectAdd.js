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
                <div class="px-6 pt-4">
                    <div class=" pt-6 text-center text-lg">
                        <span>${profile.handle}</span>
                        <img alt="..." src='${profile.image_link}' class="object-cover shadow-2xl rounded max-w-full mx-auto " style="max-width: 250px;max-height:400px" />
                        <div class="pt-6 text-center">
                            <span><i class="fas fa-globe"></i><a href="${profile.message}"  target="_blank" class="no-underline hover:underline text-blue-500 text-lg"> Live Demo</a></span>
                            <span> <i class="fab fa-github"></i><a href="${profile.message1}" target="_blank" class="no-underline  text-orange-500 text-lg hover:text-red-500"> Repository</a></span>
                        </div>
                    </div>  
                </div>
        `
      cardParent.appendChild(card)
    }
  }
)
