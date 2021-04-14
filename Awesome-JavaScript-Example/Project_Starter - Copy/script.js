const main = document.getElementById('main')
const addUserBtn = document.getElementById('add-user')
const doubleBtn = document.getElementById('double')
const showMillionarisBtn = document.getElementById('show-millionaris')
const sortBtn = document.getElementById('sort')
const calculateWealthBtn = document.getElementById('calculate-wealth')

let data = []

// Fetch random user and add money

getRandom()
getRandom()
getRandom()
getRandom()
async function getRandom() {
  const res = await fetch('https://randomuser.me/api')
  const data = await res.json()
  const user = data.results[0]

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  }
  //console.log(newUser)
  addData(newUser)
}

// Add new obj to Data arr

function addData(obj) {
  data.push(obj)

  updateDOM()
}

// Update DOM

function updateDOM(providedData = data) {
  //Clear main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>'

  providedData.forEach((item) => {
    const element = document.createElement('div')
    element.classList.add('person')
    element.innerHTML = `<strong>${item.name}</strong> ${item.money}`
    main.appendChild(element)
  })
}

addUserBtn.addEventListener('click', getRandom)
