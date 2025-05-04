const booksPerPage = 12;
let currentPage = 1;

function getBooks() {
    return JSON.parse(localStorage.getItem('books')) || [];
}

function renderBooks(books, page = 1) {
    const start = (page - 1) * booksPerPage;
    const end = start + booksPerPage;
    const booksToShow = books.slice(start, end);

    const container = document.querySelector('.booklist');
    container.innerHTML = '';

    booksToShow.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.className = 'Book-Grid';

        const img = document.createElement('img');
        img.src = book.image || 'Book.png';
        img.alt = book.title;
        img.style.width= '250px';
        img.style.height = '350px';
        img.onclick = ()=> sveBookID(book.id);

        const btn = document.createElement('button');
        btn.textContent = book.isBorrowed ? 'Borrowed' : 'Borrow';
        btn.disabled = book.isBorrowed;
        btn.style.width = '220px';
        btn.style.height= '60px';
        btn.style.fontSize = '18px';

        bookDiv.appendChild(img);
        bookDiv.appendChild(btn);
        container.appendChild(bookDiv);
    });
}

function setupPagination(books) {
    const footer = document.querySelector('footer');
    footer.innerHTML = '';

    const totalPages = Math.ceil(books.length / booksPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.className = 'circlebtn';
        btn.textContent = i;

        btn.addEventListener('click', () => {
            currentPage = i;
            renderBooks(books, currentPage);
        });

        footer.appendChild(btn);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const books = getBooks();
    renderBooks(books, currentPage);
    setupPagination(books);
    setupSearch();
});
