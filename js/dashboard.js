document.addEventListener('DOMContentLoaded', function() {
  initDashboard();
});

function initDashboard() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  console.log('Current user:', currentUser); // Debug log
  if (currentUser) {
    const username = currentUser.email.split('@')[0] ;
    document.getElementById('username-display').textContent = username;
  }
  renderBookSections();
  setupEventListeners();
}

function renderBookSections() {
  const books = getBooks();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const availableBooks = books.filter(book => !book.isBorrowed);
  renderBookList(availableBooks, '.available-list');
  
  if (currentUser) {
    const borrowedBooks = books.filter(book => 
      book.isBorrowed && book.borrowedBy === currentUser.id
    );
    renderBookList(borrowedBooks, '.borrowed-list');
    const favoriteBooks = books.filter(book => 
      currentUser.favorites && currentUser.favorites.includes(book.id)
    );
    renderBookList(favoriteBooks, '.favorite-list');
  }
}

function renderBookList(books, selector) {
  const container = document.querySelector(selector);
  container.innerHTML = '';
  
  if (books.length === 0) {
    container.innerHTML = '<p class="no-books">No books found</p>';
    return;
  }
  
  books.forEach(book => {
    const bookElement = createBookElement(book);
    container.appendChild(bookElement);
  });
}

function createBookElement(book) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const isFavorite = currentUser && currentUser.favorites && currentUser.favorites.includes(book.id);
  const isBorrowed = book.isBorrowed && book.borrowedBy === currentUser?.id;
  
  const bookElement = document.createElement('div');
  bookElement.className = 'book';
  bookElement.dataset.id = book.id;
  
  bookElement.innerHTML = `
    <img src="${book.image || 'https://via.placeholder.com/160x240'}" 
         alt="${book.title}" class="book-cover">
    <div class="book-info">
      <h3 class="book-title">${book.title}</h3>
      <p class="book-author">${book.author}</p>
    </div>
    <div class="book-actions">
      <button class="borrow-btn ${isBorrowed ? 'borrowed' : ''}" data-id="${book.id}">
        <i class="fas fa-book-open"></i> ${isBorrowed ? 'Return' : 'Borrow'}
      </button>
      <button class="fav-btn ${isFavorite ? 'active' : ''}" data-id="${book.id}">
        <i class="${isFavorite ? 'fas' : 'far'} fa-heart"></i>
      </button>
    </div>
  `;
  
  return bookElement;
}

function setupEventListeners() {
  document.addEventListener('click', function(e) {
    if (e.target.closest('.book') && !e.target.closest('button')) {
      const bookElement = e.target.closest('.book');
      const bookId = parseInt(bookElement.dataset.id);
      showBookDetails(bookId);
    }
    if (e.target.closest('.borrow-btn')) {
      const btn = e.target.closest('.borrow-btn');
      const bookId = parseInt(btn.dataset.id);
      const book = getBooks().find(b => b.id === bookId);
      btn.classList.add('clicked');
      setTimeout(() => btn.classList.remove('clicked'), 300);
      
      if (book.isBorrowed) {
        returnBook(bookId);
      } else {
        borrowBook(bookId);
      }
    }
    if (e.target.closest('.fav-btn')) {
      const btn = e.target.closest('.fav-btn');
      const bookId = parseInt(btn.dataset.id);
      btn.classList.add('heart-beat');
      setTimeout(() => btn.classList.remove('heart-beat'), 300);
      
      toggleFavorite(bookId, btn);
    }
    
    if (e.target.closest('.close-btn')) {
      closeModal();
    }
    if (e.target.closest('#borrow-btn-modal')) {
      const btn = e.target.closest('#borrow-btn-modal');
      const bookId = parseInt(btn.dataset.id);
      const book = getBooks().find(b => b.id === bookId);
      
      btn.classList.add('clicked');
      setTimeout(() => btn.classList.remove('clicked'), 300);
      
      if (book.isBorrowed) {
        returnBook(bookId);
      } else {
        borrowBook(bookId);
      }
    }
    
    if (e.target.closest('#favorite-btn-modal')) {
      const btn = e.target.closest('#favorite-btn-modal');
      const bookId = parseInt(btn.dataset.id);
      const favBtn = document.querySelector(`.fav-btn[data-id="${bookId}"]`);
      
      btn.classList.add('heart-beat');
      setTimeout(() => btn.classList.remove('heart-beat'), 300);
      
      toggleFavorite(bookId, favBtn || btn);
    }
    if (e.target.closest('.slider-nav')) {
      const btn = e.target.closest('.slider-nav');
      const direction = btn.classList.contains('prev') ? -1 : 1;
      const container = btn.parentElement.querySelector('.book-wrapper');
      scrollSlider(container, direction);
    }
  });
}

function showBookDetails(bookId) {
  const book = getBooks().find(b => b.id === bookId);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const isFavorite = currentUser && currentUser.favorites && currentUser.favorites.includes(bookId);
  
  if (!book) return;
  document.getElementById('book-modal-title').textContent = book.title;
  document.getElementById('book-modal-image').src = book.image || 'https://via.placeholder.com/200x300';
  document.getElementById('book-modal-author').textContent = book.author;
  document.getElementById('book-modal-genre').textContent = book.genre || 'N/A';
  document.getElementById('book-modal-status').textContent = book.isBorrowed ? 'Borrowed' : 'Available';
  document.getElementById('book-modal-description').textContent = book.description || 'No description available';

  const borrowBtn = document.getElementById('borrow-btn-modal');
  const favoriteBtn = document.getElementById('favorite-btn-modal');
  
  borrowBtn.dataset.id = bookId;
  favoriteBtn.dataset.id = bookId;
  
  if (book.isBorrowed) {
    borrowBtn.innerHTML = '<i class="fas fa-undo"></i> Return';
  } else {
    borrowBtn.innerHTML = '<i class="fas fa-book-open"></i> Borrow';
  }
  
  favoriteBtn.innerHTML = isFavorite ? 
    '<i class="fas fa-heart"></i> Remove Favorite' : 
    '<i class="far fa-heart"></i> Add Favorite';
  document.getElementById('bookDetailsModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('bookDetailsModal').style.display = 'none';
}

function borrowBook(bookId) {
  const books = getBooks();
  const bookIndex = books.findIndex(b => b.id === bookId);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
  if (bookIndex === -1 || !currentUser) return;
  
  books[bookIndex].isBorrowed = true;
  books[bookIndex].borrowedBy = currentUser.id;
  books[bookIndex].borrowDate = new Date().toISOString();
  
  saveBooks(books);
  renderBookSections();
  closeModal();
}

function returnBook(bookId) {
  const books = getBooks();
  const bookIndex = books.findIndex(b => b.id === bookId);
  
  if (bookIndex === -1) return;
  
  books[bookIndex].isBorrowed = false;
  books[bookIndex].borrowedBy = null;
  books[bookIndex].borrowDate = null;
  
  saveBooks(books);
  renderBookSections();
  closeModal();
}

function toggleFavorite(bookId, button) {
  console.log('toggleFavorite called with bookId:', bookId);
  
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  console.log('Current user:', currentUser); 
  
  if (!currentUser) {
    alert('Please login first to add books to your favorites!'); 
    return;
  }

  if (!currentUser.favorites) {
    console.log('Initializing favorites array'); 
    currentUser.favorites = [];
  }
  
  const favIndex = currentUser.favorites.indexOf(bookId);
  const isFavorite = favIndex !== -1;
  console.log('Current favorites:', currentUser.favorites, 'isFavorite:', isFavorite); 
  
  if (isFavorite) {
    console.log('Removing from favorites'); 
    currentUser.favorites.splice(favIndex, 1);
    if (button) {
      button.classList.remove('active');
      button.innerHTML = '<i class="far fa-heart"></i>';
    }
  } else {
    console.log('Adding to favorites');
    currentUser.favorites.push(bookId);
    if (button) {
      button.classList.add('active');
      button.innerHTML = '<i class="fas fa-heart"></i>';
    }
  }
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  console.log('Updated user:', currentUser); 
  
  renderBookSections();
  const modalFavoriteBtn = document.getElementById('favorite-btn-modal');
  if (modalFavoriteBtn && parseInt(modalFavoriteBtn.dataset.id) === bookId) {
    modalFavoriteBtn.innerHTML = isFavorite ? 
      '<i class="far fa-heart"></i> Add Favorite' : 
      '<i class="fas fa-heart"></i> Remove Favorite';
  }
}

function scrollSlider(container, direction) {
  const scrollAmount = 300;
  container.scrollBy({
    left: scrollAmount * direction,
    behavior: 'smooth'
  });
}

function getBooks() {
  const books = localStorage.getItem('books');
  return books ? JSON.parse(books) : [];
}

function saveBooks(books) {
  localStorage.setItem('books', JSON.stringify(books));
}