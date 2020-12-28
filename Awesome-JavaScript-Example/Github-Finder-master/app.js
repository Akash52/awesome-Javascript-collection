//Init Github 
const github=new Github;
//Init UI
const ui=new UI;
 

// search input 

const searchUser=document.getElementById('searchUser');


//Search input event listener


searchUser.addEventListener('keyup',(e)=>{

    //Get input text
    const userText=e.target.value;
    

    if(userText !==''){
        //Make http call
        github.getUser(userText)
        .then(data=>{
            if(data.profile.message === 'Not Found'){
                //Show alert
                ui.showAlert('User not found','alert alert-danger');
            }
            else{
                ui.showProfile(data.profile);
            }
        }) 
    } else{
        //Clear profile
        ui.clearProfile();
    }

});
