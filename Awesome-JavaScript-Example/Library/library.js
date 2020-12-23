console.log('Welcome to library')

function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}


function Display() {

}

Display.prototype.add = function (book) {
    let ui_string = `
                        <tr>
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.type}</td>
                    </tr>`
    tbody = document.getElementById('tbody');
    tbody.innerHTML += ui_string;
}

Display.prototype.clear = function () {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}

let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormsubmit);

function libraryFormsubmit(e) {
    // console.log("Your Form is submited");
    let name = document.getElementById('bookname').value;
    let author = document.getElementById('author').value;
    let type;

    let Fiction = document.getElementById('Fiction');
    let CP = document.getElementById('CP');
    let DSA = document.getElementById('DSA');

    if (Fiction.checked) {
        type = Fiction.value;
    }
    else if (CP.checked) {
        type = CP.value;
    }
    else if (DSA.checked) {
        type = DSA.value;
    }
    let book = new Book(name, author, type);

    let display = new Display();
    display.add(book);
    display.clear();
    e.preventDefault();
}
