const list = document.querySelectorAll('.list')
const listItems = document.querySelectorAll('.list-item')

let draggedItem = null

for (let a = 0; a < listItems.length; a++) {
  const item = listItems[a]
  console.log(item)

  item.addEventListener('dragstart', function () {
    draggedItem = item

    setTimeout(function () {
      item.style.display = none
    }, 50)
  })

  item.addEventListener(
    'dragged',
    function () {
      item.style.display = 'block'
      draggedItem = null
    },
    50
  )
}
