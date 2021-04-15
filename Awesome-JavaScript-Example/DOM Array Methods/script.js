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

// Double everyone money

function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 }
  })
  updateDOM()
}

// Sort users By Richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money)
  updateDOM()
}

// Filter only Millionaris

function showMillionaris() {
  data = data.filter((user) => user.money > 1000000)

  updateDOM()
}

// Caculate the total wealth

function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0)

  const wealthEl = document.createElement('div')
  wealthEl.innerHTML = `<h3>Total Wealth : <strong>${wealth}</strong></h3>`

  main.appendChild(wealthEl)
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

// Event Listener

addUserBtn.addEventListener('click', getRandom)

doubleBtn.addEventListener('click', doubleMoney)

sortBtn.addEventListener('click', sortByRichest)

showMillionarisBtn.addEventListener('click', showMillionaris)

calculateWealthBtn.addEventListener('click', calculateWealth)
