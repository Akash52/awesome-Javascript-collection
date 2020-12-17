const todoInput =document.querySelector('.todo-input');
const todoButton =document.querySelector('.todo-button');
const todoList =document.querySelector('.todo-list');
const filterOption=document.querySelector(".filter-todo");

document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deletecheck);
filterOption.addEventListener('click',filterTodo);

function addTodo(event)
{
    event.preventDefault();

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo =document.createElement("li");
    newTodo.innerHTML = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    
    saveLocaTodos(todoInput.value);
    // check mark button 
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class ="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // check trash button 
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //appent to list
    todoList.appendChild(todoDiv);
    //clear input values
    todoInput.value="";


}

function deletecheck(e)
{
    const item = e.target;

    if(item.classList[0] === "trash-btn"){
        const todo =item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend',function(){
            todo.remove();
        });

    }

    //check mark
    if(item.classList[0] === "complete-btn"){
        const todo =item.parentElement;
        todo.classList.toggle("completed");

    }

}


function filterTodo(e){

    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value)
        {
            case "all":
                todo.style.display="flex";
            break;
            
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display="flex";
                }else{
                    todo.style.display = "none";
                }
                break;
                case "Uncompleted":
                    {
                        if(!todo.classList.contains("completed")){
                            todo.style.display="flex";
                        }else{
                            todo.style.display = "none";
                        }
                    }
                    break;
        }
    });
}

function saveLocaTodos(todo){
//chacke hey do i already have thing in there
let todos;
if(localStorage.getItem('todos') === null){
    todos = [];

}else{
    todos = JSON.parse(localStorage.getItem('todos'));
}
todos.push(todo);
localStorage.setItem("todos",JSON.stringify(todos));
}
function getTodos()
{
    let todos; 

    if(localStorage.getItem('todos')===null){
        todos = [];
    
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
       
        const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo =document.createElement("li");
    newTodo.innerHTML = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class ="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // check trash button 
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //appent to list
    todoList.appendChild(todoDiv);
    //clear input values
 
    });

    }

    function removeLocalTodos(todo)
    {
        let todos;
        if(localStorage.getItem("todos")===null){
            todos = [];
        
        }else{
            todos = JSON.parse(localStorage.getItem("todos"));
        }
       const todoIndex =todo.children[0].innerText;
        todos.splice(todos.indexOf('todoIndex'), 1);
        localStorage.setItem('todos', JSON.stringify(todos));
    }