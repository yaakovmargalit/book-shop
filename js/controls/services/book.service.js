var gBooks;
var gFilterBy = 'title'
const PAGE_SIZE = 4;
var gPageIdx = 0;


function nextPage(pageIdx) {
    gPageIdx = pageIdx
    if (gPageIdx * PAGE_SIZE >= gBooks.length) {
        gPageIdx = 0;
    }
    renderBooks()
}

function _createBooks() {
    gBooks = loadFromStorage('books');
    if (!gBooks || !gBooks.length) {
        gBooks = [
            _createBook('book1', 25, 'img/book1.png'),
            _createBook('book2', 32, 'img/book2.png'),
            _createBook('book3', 11, 'img/book3.png'),
            _createBook('book4', 8, 'img/book4.png'),
            _createBook('book4', 8, 'img/book4.png'),
            _createBook('book4', 8, 'img/book4.png'),
            _createBook('book4', 8, 'img/book4.png'),
            _createBook('book4', 8, 'img/book4.png'),
            _createBook('book4', 8, 'img/book4.png'),
            _createBook('book4', 8, 'img/book4.png'),
            _createBook('book4', 8, 'img/book4.png'),
            _createBook('book4', 8, 'img/book4.png'),
            _createBook('book4', 8, 'img/book4.png'),
            _createBook('book4', 8, 'img/book4.png'),
            _createBook('book4', 8, 'img/book4.png'),
            _createBook('book4', 8, 'img/book4.png'),
            _createBook('book4', 8, 'img/book4.png'),
            _createBook('book4', 8, 'img/book4.png'),
            _createBook('book5', 3, 'img/book5.png')
        ]

        _saveBooksToStorage();
    }
}

function getBooks() {
    _createBooks();
    const fromIdx = gPageIdx * PAGE_SIZE
    switch (gFilterBy) {
        case 'title':
            return gBooks.sort((book1, book2) => {
                if (book1.title.toUpperCase() < book2.title.toUpperCase()) { return -1; }
                if (book1.title.toUpperCase() > book2.title.toUpperCase()) { return 1; }
                return 0;
            }).slice(fromIdx, fromIdx + PAGE_SIZE)
        case 'price':
            return gBooks.sort((book1, book2) => book1.price - book2.price).slice(fromIdx, fromIdx + PAGE_SIZE)
        case 'rate':
            return gBooks.sort((book1, book2) => book2.rate - book1.rate).slice(fromIdx, fromIdx + PAGE_SIZE)
        default:
            return gBooks
    }
}

function getBookById(id) {
    return gBooks.find(book => book.id === id);
}

function _createBook(title, price, img = 'img/book.png') {
    return {
        title,
        price,
        img,
        id: makeId(),
        rate: 0
    }
}

function _saveBooksToStorage() {
    saveToStorage('books', gBooks)
}

function addBook(title, price) {
    gBooks.push(_createBook(title, price))
    saveToStorage('books', gBooks)
    renderBooks()
}

function removeBook(id) {
    const Idx = gBooks.findIndex(b => b.id === id)
    gBooks.splice(Idx, 1)
    _saveBooksToStorage()
}

function updateBook(id) {
    var value = document.querySelector('[name=new-price]').value;
    var book = getBookById(id)
    book.price = value
    _saveBooksToStorage()
}

function updateFilter(filterBy) {
    gFilterBy = filterBy
}