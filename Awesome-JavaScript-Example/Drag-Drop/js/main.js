const fill = document.querySelector('.fill');
const empties = document.querySelectorAll('.empty');

//Fill Listener
fill.addEventListener('dragstart', dragStart);
fill.addEventListener('dragend', dragEnd);

//loop through
for(const empty of empties)
{
    empty.addEventListener('dragover', dragOver);
    empty.addEventListener('dragenter', dragEnter);
    empty.addEventListener('dragleave', dragLeave);
    empty.addEventListener('drop', dragDrop);

}

// Drage Fuction
function dragStart(){
 this.className += ' hold';
 setTimeout(() => (this.className = 'invisible'), 0);
 //console.log('start');
}

function dragEnd()
{
   this.className ='fill';
   //console.log('end');
}


function dragOver(e)
{
    e.preventDefault();
}

function dragEnter (e)
{
e.preventDefault();
this.className += ' hovered';  
}

function dragLeave ()
{
    this.className ='empty';

}

function dragDrop ()
{
    this.className ='empty';
    this.append(fill);
}

