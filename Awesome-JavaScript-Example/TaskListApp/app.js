//Define Ui variables

const form =document.querySelector('#task-form');
const taskList=document.querySelector('.collection');
const clearBtn=document.querySelector('.clear-task');
const filter=document.querySelector('#filter');
const taskInput=document.querySelector('#task');


// Load all event listener
loadEventListener();


    function loadEventListener(){
        //Add task Event
        form.addEventListener('submit',addTask);
        //Remove Task event 
        taskList.addEventListener('click',removeTask)
        //Clear Task Event 
        clearBtn.addEventListener('click',clearTask)
        //Filter task event
        filter.addEventListener('keyup',filterTasks)

    }
     //Add task
     function addTask(e){
        if(taskInput.value ==='')
        {
            alert('Add a Task');
        }

        //Create Li Element 

        const li=document.createElement('li');

        //Add class
        li.className='collection-item';

        //Create text node and append to li

        li.appendChild(document.createTextNode(taskInput.value));

        //Create new link element

        const link=document.createElement('a');

        //Add class 
        link.className='delete-item secondary-content';

        //Add icon html
        link.innerHTML='<i class="fa fa-remove"></i>';
        //Append the link to li
        
        li.appendChild(link);

        //Append li to ul
        taskList.appendChild(li)
        //clear Input
        taskInput.value='';
    e.preventDefault();
}
//Remove Task

function removeTask(e){

if(e.target.parentElement.classList.contains('delete-item'))
{
    if(confirm('Are you sure'))
    e.target.parentElement.parentElement.remove();
}
   
}

//Clear Task 
function clearTask(e){
   // taskList.innerHTML='';

   //Faster
while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
}

}

//filter task 

function filterTasks(e){
    const text=e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach

    (function(task){

        const item=task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text)!=-1){
            task.style.display='block';
        }
        else{
            task.style.display='none';
        }

    });

}
