const addBook = document.querySelector('.header-buttons > button');
const closeForm = document.querySelector(".form-cancel");
const submitForm = document.querySelector(".form-submit");

const newBookTitle = document.querySelector('input[id="title"');
const newBookAuthor = document.querySelector('input[id="author"');
const newBookPages = document.querySelector('input[id="pages"');
const newBookRead = document.querySelector('input[id="read"');

const booksWrapper = document.querySelector('#books-wrapper');


const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {
  myLibrary.push(new Book(newBookTitle.value, newBookAuthor.value, newBookPages.value, newBookRead.checked));
}

function drawBook(book) {
    const newBook = booksWrapper.appendChild(document.createElement('div'));
    newBook.classList.add('book');

    const titleDiv = newBook.appendChild(document.createElement('div'));
    titleDiv.classList.add('book-title');
    titleDiv.textContent = book.title;

    const authorDiv = newBook.appendChild(document.createElement('div'));
    authorDiv.classList.add('book-author');
    authorDiv.textContent = book.author;

    const pagesDiv = newBook.appendChild(document.createElement('div'));
    pagesDiv.classList.add('book-pages');
    pagesDiv.textContent = book.pages;

    const bookActionsDiv = newBook.appendChild(document.createElement('div'));
    bookActionsDiv.classList.add('book-actions');

    const deleteDiv = bookActionsDiv.appendChild(document.createElement('div'));
    deleteDiv.classList.add('book-delete');
    const deleteButton = deleteDiv.appendChild(document.createElement('button'));
    deleteButton.innerText = 'X';

    const readDiv = bookActionsDiv.appendChild(document.createElement('div'));
    readDiv.classList.add('book-read');
    if (book.read) {
      readDiv.classList.add('book-read');
    } else {
      readDiv.classList.add('book-unread');
    }
    const readButton = readDiv.appendChild(document.createElement('button'));
    readButton.innerText = 'Read';
  }

  function removeAllChildren (element) {
    while (element.firstChild) {
      element.removeChild(element.lastChild);
    }
  }

  function makeButtonsWork(){
    const bookReadButtons = document.querySelectorAll('.book-actions :last-child > button');
    console.log(bookReadButtons);
    
    for (let i = 0; i < bookReadButtons.length; i ++) {
      bookReadButtons[i].addEventListener("click", (event) => {
        event.preventDefault();
        if(bookReadButtons[i].parentElement.classList.contains('book-read')){
          bookReadButtons[i].parentElement.classList.remove('book-read');
          bookReadButtons[i].parentElement.classList.add('book-unread');
        } else {
          bookReadButtons[i].parentElement.classList.remove('book-unread');
          bookReadButtons[i].parentElement.classList.add('book-read');
        }
      });
    }

    const bookDeleteButtons = document.querySelectorAll('.book-actions :first-child > button');
    for (let i = 0; i < bookDeleteButtons.length; i ++) {
      bookDeleteButtons[i].addEventListener("click", (event) => {
        event.preventDefault();
        const divToDelete = bookDeleteButtons[i].closest('.book');
        removeAllChildren(divToDelete);
        divToDelete.parentElement.removeChild(divToDelete);
      });
    }
  }
  
function clearForm() {
  newBookAuthor.value = '';
  newBookTitle.value = '';
  newBookPages.value = '';
  newBookRead.checked = false;
}

function pressCloseForm(){
  document.querySelector("#form").classList.remove("active");
}

addBook.addEventListener("click", (event) => {
  event.preventDefault();
  document.querySelector("#form").classList.add("active");
});

closeForm.addEventListener("click", (event) => {
  event.preventDefault();
pressCloseForm();
clearForm();
});

submitForm.addEventListener("click", (event) => {
  event.preventDefault();
  addBookToLibrary();
  drawBook(myLibrary[myLibrary.length-1]);
  makeButtonsWork();
  clearForm();
  pressCloseForm();
});

makeButtonsWork();

  