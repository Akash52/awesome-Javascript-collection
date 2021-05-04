const textDisplay = document.querySelector('#text')
const speedBtn = document.querySelector('#speed')
const readBtn = document.querySelector('.read')
const pauseBtn = document.querySelector('.pause')
const stopBtn = document.querySelector('.stop')

// Reading Functionality

readBtn.addEventListener('click', function () {
  readText(textDisplay.value)
})

const uttrance = new SpeechSynthesisUtterance()

// readText Function

function readText(tesText) {
  uttrance.text = tesText
  uttrance.rate = speedBtn.value || 1
  textDisplay.disabled = true
  speechSynthesis.speak(uttrance)
}
