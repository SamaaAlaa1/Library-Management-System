function getBooks() {
    const books = localStorage.getItem("books");
    return books ? JSON.parse(books) : [];
  }
  
  function saveBooks(books) {
    localStorage.setItem("books", JSON.stringify(books));
  }
  

document.addEventListener('DOMContentLoaded', () => {
    displayTrendingBooks();
    setupEventListeners();
});

function getCurrentUser() {
    const user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : null;
  }
  
  function updateBorrowedBooks(action, book) {
    const currentUser = getCurrentUser();
    if (!currentUser) return;
  
    if (!currentUser.borrowedBooks) currentUser.borrowedBooks = [];
  
    if (action === 'add') {
      currentUser.borrowedBooks.push(book);
    } else if (action === 'remove') {
      currentUser.borrowedBooks = currentUser.borrowedBooks.filter(b => b.id !== book.id);
    }
  
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }
  
function displayTrendingBooks() {
    const books = getBooks();
    const bookSlider = document.getElementById('book-slider');
    bookSlider.innerHTML = '';

    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        console.log("image = ")
        console.log(book.image)
        bookCard.innerHTML = `
            <img src="${book.image || 'https://placehold.co/50x70'}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>by ${book.author}</p>
            <br>
            <button class="borrow-btn" data-id="${book.id}">
                ${book.isBorrowed ? 'BORROWED' : 'BORROW'}
            </button>
        `;
        bookSlider.appendChild(bookCard);
    });
}

function setupEventListeners() {
    document.getElementById('searchBtn').addEventListener('click', searchBooks);
    document.getElementById('searchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchBooks();
    });
    document.getElementById('prevBtn').addEventListener('click', () => {
        document.getElementById('book-slider').scrollBy(-300, 0);
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
        document.getElementById('book-slider').scrollBy(300, 0);
    });
    document.getElementById('book-slider').addEventListener('click', (e) => {
        if (e.target.classList.contains('borrow-btn')) {
            const bookId = parseInt(e.target.dataset.id);
            borrowBook(bookId);
        }
    });
}

function searchBooks() {
    const category = document.getElementById('searchCategory').value;
    const query = document.getElementById('searchInput').value.toLowerCase();
    const books = getBooks();

    if (!query) {
        displayTrendingBooks();
        return;
    }

    const filteredBooks = books.filter(book => {
        if (category === 'All') {
            return (
                book.title.toLowerCase().includes(query) ||
                book.author.toLowerCase().includes(query) ||
                (book.genere && book.genere.toLowerCase().includes(query))
            );
        } else if (category === 'Title') {
            return book.title.toLowerCase().includes(query);
        } else if (category === 'Author') {
            return book.author.toLowerCase().includes(query);
        } else if (category === 'Genre') {
            return book.genere && book.genere.toLowerCase().includes(query);
        }
        return false;
    });
    displayBooks(filteredBooks);
}

function displayBooks(books) {
    const bookSlider = document.getElementById('book-slider');
    bookSlider.innerHTML = '';

    if (books.length === 0) {
        bookSlider.innerHTML = '<p class="no-results">No books found matching your search.</p>';
        return;
    }

    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <img src="${book.image || 'https://via.placeholder.com/200x300'}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>by ${book.author}</p>
            <p>${book.genere || 'No genre specified'}</p>
            <button class="borrow-btn" data-id="${book.id}">
                ${book.isBorrowed ? 'BORROWED' : 'BORROW'}
            </button>
        `;
        bookSlider.appendChild(bookCard);
    });
}

function borrowBook(bookId) {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        alert('Please login to borrow books');
        window.location.href = 'login.html';
        return;
    }

    const books = getBooks();
    const bookIndex = books.findIndex(b => b.id === bookId);

    if (bookIndex !== -1) {
        if (books[bookIndex].isBorrowed) {
            alert('This book is already borrowed');
            return;
        }

        books[bookIndex].isBorrowed = true;
        saveBooks(books);
        
        updateBorrowedBooks('add', books[bookIndex]);

        displayTrendingBooks();
        alert('Book borrowed successfully!');
    }
}