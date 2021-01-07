//movement animation to happent

const card = document.querySelector('.card');
const container =document.querySelector('.container');

//itmes
const title =document.querySelector('.title');
const sneaker =document.querySelector('.sneaker img');
const purchase =document.querySelector('.purchase button');
const description =document.querySelector('.info h3');
const sizes =document.querySelector('.sizes');

//movint animation Event
container.addEventListener('mousemove', (e)=>{
    let xAxis = (window.innerWidth/2 - e.pageX) /25 ;
    let yAxis = (window.innerWidth/2 - e.pageY) /25 ;

    card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;

});
//animation in
container.addEventListener('mouseenter', e=> {
    card.style.transform = "none";
    title.style.transform= "translateZ(150px)";
    sneaker.style.transform= "translateZ(200px) rotateZ(-360deg)";
    purchase.style.transform= "translateZ(75px)";
    description.style.transform= "translateZ(125px)";
    sizes.style.transform= "translateZ(100px)";
});

//animate out
container.addEventListener('mouseleave', e=> {
    
    card.style.transition = "all  o.5s ease";
    card.style.transform = `rotateY(0deg) rotateX(0deg)`;
    title.style.transform= "translateZ(0px)";
    sneaker.style.transform= "translateZ(0px) rotateZ(0deg)";
    purchase.style.transform= "translateZ(0px)";
    description.style.transform= "translateZ(0px)";
    sizes.style.transform= "translateZ(0px)";    
});