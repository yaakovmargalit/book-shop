function init() {
    renderBooks()
}
var mode = 'tble'

function renderPageBar() {
    var pageCount = gBooks.length / PAGE_SIZE
    var strHTML = ''
    for (let i = 0; i < pageCount; i++) {
        strHTML += `<button onclick="nextPage('${i}')" class="page-btn">${i+1}</button>  `
    }
    document.querySelector('.page').innerHTML = strHTML
}

function renderBooks() {
    var books = getBooks();
    var booksForDisplay = books.map(book => {
        if (mode === 'table') {
            return `<tr>
    <td>${book.id}</td>
    <td>${book.title}</td>
    <td>${book.price}</td>
    <td>${book.rate}</td>
    <td class="actions">
        <button data-trans="details-btn" class="read-btn" onclick="onOpenDetails('${book.id}','read-saction')">Details</button>
        <button data-trans="update-btn" class="update-btn" onclick="onUpdateBook('${book.id}','update-modal')">Update</button>
        <button data-trans="delete-btn" class="delete-btn" onclick="onRemoveBook('${book.id}')">Delete</button>
    </td>
</tr>`
        } else {
            return `
            <div class="book" >
            <div class="btns-for-flex" id="${book.id}">
            <button data-trans="details-btn" class="read-btn" onclick="onOpenDetails('${book.id}','read-saction')">Details</button>
            <button data-trans="update-btn" class="update-btn" onclick="onUpdateBook('${book.id}','update-modal')">Update</button>
            <button data-trans="delete-btn" class="delete-btn" onclick="onRemoveBook('${book.id}')">Delete</button>
            </div>
            <button class="more-btn" onclick="toggleBtnsMore('${book.id}')">⁝</button>
            <img src="${book.img}" />
            <p><span data-trans="title">Name</span>: ${book.title}</p>
            <p><span data-trans="price">Price</span>: ${book.price}</p>
            <p><span data-trans="rate">Rate</span>: ${book.rate}</p>
        </div>
`
        }
    })

    if (mode === 'table') {
        document.querySelector('.books-box').innerHTML = `     <table>
        <thead>
            <th data-trans="id">id</th>
            <th class="th-sort" onclick="onUpdateFilter('title')" title="Sort by name" data-trans="title">Title</th>
            <th class="th-sort" onclick="onUpdateFilter('price')" title="Sort by price" data-trans="price">Price</th>
            <th class="th-sort" onclick="onUpdateFilter('rate')" title="Sort by rating" data-trans="rate">Rate</th>
            <th data-trans="actions">Actions</th>
        </thead>
        <tbody class="books"></tbody>
    </table>`
        document.querySelector('.books').innerHTML = booksForDisplay.join('')
    } else {
        document.querySelector('.books-box').innerHTML = booksForDisplay.join('')
    }

    renderPageBar()
    doTrans();
}

function onOpenDetails(id, cla) {
    renderReadModal(id, cla)
}

function renderReadModal(id, cla) {
    toggleModal(cla)
    const book = getBookById(id)
    const strHTML = `<div class="book-data">
          <button onclick="toggleModal('${cla}')" class="close-read-btn">❌</button>
          <img src="${book.img}" />
          <h3><span data-trans="title">Name</span>: ${book.title}</h3>
          <h3><span data-trans="price">Price</span>: ${book.price}</h3>
          <h3 data-trans="rate">Rate</h3>
      <div class="rate-controls">
         <button onclick="btnMinus('${book.id}')" class="bts-plus">-</button>
         <span class="rate-num">${book.rate}</span>
         <button onclick="btnPlus('${book.id}')" class="bts-minus">+</button>
      </div>
   </div>`
    document.querySelector('.read-saction').innerHTML = strHTML
    doTrans();

}

function renderUpdateModal(id, cla) {
    toggleModal(cla)
    var book = getBookById(id)
    var strHtml = `<h2><span data-trans="update-title">Update price of</span> ${book.title}</h2>
                    <input name="new-price" type="text" class="price-input" value="${book.price}">
                    <div>
                        <button data-trans="save" onclick="onSaveUpdateBook('${book.id}','${cla}')">Save</button>
                        <button data-trans="cancel" onclick="toggleModal('${cla}')">Cancel</button>
                    </div>`
    document.querySelector('.update-modal').innerHTML = strHtml
    doTrans();
}

function renderNewBookModal(cla) {
    toggleModal(cla)
    var strHtml = ` <h3 data-trans="new-title">New book</h3>
    <input data-trans="title"  name="title" type="text" placeholder="Title">
    <input data-trans="price"  name="price" type="text" placeholder="price">
    <div>
        <button data-trans="add" class="new-book-modal-btn" onclick="onAddBook('${cla}')">Add</button>
        <button data-trans="cancel" class="new-book-modal-btn" onclick="toggleModal('${cla}')">Cancel</button>
    </div>`
    document.querySelector('.new-book-modal').innerHTML = strHtml
    doTrans();
}

function toggleModal(cla) {
    document.querySelector('.modal').classList.toggle(cla);
    document.querySelector('.modal').classList.toggle('show-modal');
}

function toggleBtnsMore(id) {
    console.log(id)
    document.querySelector('#' + id).classList.toggle('show-modal');
}


function btnPlus(id) {
    var book = getBookById(id)
    book.rate++
        document.querySelector('.rate-num').innerText = book.rate
    _saveBooksToStorage()
    renderBooks()
}

function btnMinus(id) {
    var book = getBookById(id)
    book.rate--
        document.querySelector('.rate-num').innerText = book.rate
    _saveBooksToStorage()
    renderBooks()
}


function onUpdateBook(id, cla) {
    renderUpdateModal(id, cla)
}


function onSaveUpdateBook(id, cla) {
    toggleModal(cla)
    updateBook(id)
    renderBooks()
}

function onRemoveBook(id) {
    removeBook(id)
    renderBooks()
}

function onNewBook(cla) {
    renderNewBookModal(cla)
}

function onAddBook(cla) {
    var elTitle = document.querySelector('[name=title]')
    var elPrice = document.querySelector('[name=price]')
    addBook(elTitle.value, elPrice.value);
    elTitle.value = ''
    elPrice.value = ''
    toggleModal(cla)
    renderBooks()
}

function onUpdateFilter(filterBy) {
    updateFilter(filterBy)
    renderBooks()
}

function onSetLang(lang) {
    setLang(lang);
    // TODO: if lang is hebrew add RTL class to document.body
    var elBody = document.querySelector('body')
    if (lang === 'he') {
        elBody.classList.add('rtl')
    } else {
        elBody.classList.remove('rtl')
    }
    doTrans();
}