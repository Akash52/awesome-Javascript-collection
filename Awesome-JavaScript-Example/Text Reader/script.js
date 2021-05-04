const textDisplay = document.querySelector('#text')
const speedBtn = document.querySelector('#speed')
const readBtn = document.querySelector('.read')
const pauseBtn = document.querySelector('.pause')
const stopBtn = document.querySelector('.stop')

// Reading Functionality

readBtn.addEventListener('click', function () {
  readText(textDisplay.value)
})

// Pausing funtionality

pauseBtn.addEventListener('click', pauseText)

const uttrance = new SpeechSynthesisUtterance()

uttrance.addEventListener('end', function () {
  textDisplay.disabled = false
})

// readText Function

function readText(testText) {
  uttrance.text = testText
  uttrance.rate = speedBtn.value || 1
  textDisplay.disabled = true
  speechSynthesis.speak(uttrance)
}

// pauseText Function

function pauseText() {
  if (speechSynthesis.speaking) speechSynthesis.pause()
}
