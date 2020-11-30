$.getJSON(
  'https://raw.githubusercontent.com/Akash52/JS-Project-Display/master/data.json',
  (data) => {
    // console.log(data); // this will show the info it in firebug console
    let profileKeys = ['handle', 'image_link', 'message', 'message1'];
    /**
     * Check if a profile has handle image_link and message properties
     */
    let isProfileValid = (profile) => profileKeys.every((k) => k in profile);

    /**
     * Given an array of profiles, keep only one for handle (handle is the id of the profile)
     */
    let getUniqueProfiles = (profiles) =>
      Array.from(new Set(profiles.map((p) => p.handle))).map((id) => {
        let profile = {};
        profileKeys.forEach((k) => {
          profile[k] = profiles.find((p) => p.handle === id)[k];
        });
        return profile;
      });

    // get only unique and valid profiles
    let profiles = getUniqueProfiles(data.profiles.filter(isProfileValid));

    let cardParent = document.getElementById('profile-cards');
    for (let index = 0; index < profiles.length; index += 1) {
      let card = document.createElement('div');

      let = profile = profiles[index];
      card.innerHTML = `
                <div class="px-6 pt-4">
                    <div class="pt-6 text-center text-lg">
                        <span></i>${profile.handle}</span>
                        <img alt="..." src='${profile.image_link}' class="shadow-lg rounded max-w-full mx-auto" style="max-width: 300px;" />
                        <div class="pt-6 text-center">
                            <span><i class="fas fa-eye"></i><a href="${profile.message}"  target="_blank" class="no-underline hover:underline text-blue-500 text-lg"> Live Demo</a></span>
                            <span> <i class="fab fa-github"></i><a href="${profile.message1}" target="_blank" class="no-underline hover:underline text-orange-500 text-lg"> Repository</a></span>
                        </div>
                    </div>  
                </div>
       


        `;
      cardParent.appendChild(card);
    }
  }
);
