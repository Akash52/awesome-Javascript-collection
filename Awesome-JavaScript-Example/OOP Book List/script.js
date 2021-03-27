//Book Constructor

function Book(title, author, isbn) {
  this.title = title
  this.author = author
  this.isbn = isbn
}

//UI Constructor

function UI() {
  UI.prototype.addBookToList = function (book) {
    const list = document.getElementById('book-list')
    //Create tr element

    const row = document.createElement('tr')
    //Insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `
    list.appendChild(row)
  }
}

// Clear Fields

UI.prototype.clearFields = function () {
  document.getElementById('title').value = ''
  document.getElementById('author').value = ''
  document.getElementById('isbn').value = ''
}

//Event Listener

document.getElementById('book-form').addEventListener('submit', function (e) {
  //GET FORM VALUE
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value

  //INSTANTIATE BOOK
  const book = new Book(title, author, isbn)
  //INSTANTIATE UI

  const ui = new UI()

  //ADD book to list

  ui.addBookToList(book)
  ui.clearFields()

  e.preventDefault()
})
