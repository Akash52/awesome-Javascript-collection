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

Display.prototype.validate = function (book) {
    if (book.name.length <= 2 || book.author.length <= 2) {
        return false;
    }
    else {
        return true;
    }
}

Display.prototype.show = function (type, dismsg) {
    let message = document.getElementById('message');
    if (type == 'success') {
        boldtext = 'Success:';
    }
    else {
        boldtext = "Error!"
    }
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
            <strong>${boldtext}</strong> ${dismsg}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
    setTimeout(function () {
        message.innerHTML = '';
    }, 2000);

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

    if (display.validate(book)) {
        display.add(book);
        display.show('success', 'Your Book is successfully added');
        display.clear();
    }
    else {
        display.show('danger', 'Sorry You can not add this book');
    }
    e.preventDefault();
}