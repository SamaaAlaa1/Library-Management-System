document.addEventListener("DOMContentLoaded", function () {
  displaybooks();
  const searchBar = document.querySelector(".search-bar");
  const searchBtn = document.querySelector(".search-btn");
  searchBtn.addEventListener("click", function () {
    searchBooks();
  });
  searchBar.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      searchBooks();
    }
  });
});

function displaybooks(page = 1, booksToDisplay = null) {
  const container = document.getElementById("book_list_container");
  const books =
    booksToDisplay || JSON.parse(localStorage.getItem("books")) || [];
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
  const booksPerPage = 9;
  const start = (page - 1) * booksPerPage;
  const end = start + booksPerPage;
  const paginatedBooks = books.slice(start, end);

  container.innerHTML = "";

  if (paginatedBooks.length === 0) {
    container.innerHTML = `
                <div class="no-books">
                    <i class="fas fa-book-open" style="font-size: 48px; color: #65081F; margin-bottom: 20px;"></i>
                    <h3>No books found</h3>
                    <p>Try adjusting your search or check back later</p>
                </div>
            `;
    return;
  }

  paginatedBooks.forEach((book) => {
    const isFavorite =
      currentUser.favorites && currentUser.favorites.includes(book.id);
    const bookDiv = document.createElement("div");
    bookDiv.className = "Book-Grid";

    const img = document.createElement("img");
    img.src = book.image || "/Images/book1.jfif";
    img.alt = book.title;
    img.onclick = () => {
      localStorage.setItem("selectedBookID", book.id);
      window.location.href = "/pages/BookDetails.html";
    };

    // Add book title
    const titleDiv = document.createElement("div");
    titleDiv.className = "book-title";
    titleDiv.textContent = book.title;

    const actionsDiv = document.createElement("div");
    actionsDiv.className = "book-actions";

    const favBtn = document.createElement("button");
    favBtn.className = `fav-btn ${isFavorite ? "active" : ""}`;
    favBtn.innerHTML = '<i class="fas fa-heart"></i>';
    favBtn.onclick = function () {
      toggleFavorite(book.id, favBtn);
    };

    const borrowBtn = document.createElement("button");
    borrowBtn.className = "borrow-btn";
    borrowBtn.textContent = book.isBorrowed ? "Borrowed" : "Borrow";
    borrowBtn.disabled = book.isBorrowed;
    borrowBtn.onclick = function () {
      if (!book.isBorrowed) {
        borrowBook(book.id);
      }
    };

    actionsDiv.appendChild(favBtn);
    actionsDiv.appendChild(borrowBtn);
    bookDiv.appendChild(img);
    bookDiv.appendChild(titleDiv);
    bookDiv.appendChild(actionsDiv);
    container.appendChild(bookDiv);
  });

  createPaginationButtons(Math.ceil(books.length / booksPerPage), page);
}

function toggleFavorite(bookId, button) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    alert("Please login to add favorites");
    window.location.href = "/pages/login.html";
    return;
  }
  if (!currentUser.favorites) {
    currentUser.favorites = [];
  }
  const index = currentUser.favorites.indexOf(bookId);
  if (index === -1) {
    currentUser.favorites.push(bookId);
    button.classList.add("active");
  } else {
    currentUser.favorites.splice(index, 1);
    button.classList.remove("active");
  }

  localStorage.setItem("currentUser", JSON.stringify(currentUser));
}

function borrowBook(bookId) {
  const books = JSON.parse(localStorage.getItem("books"));
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};

  if (!currentUser) {
    alert("Please login to borrow books");
    window.location.href = "/pages/login.html";
    return;
  }

  const bookIndex = books.findIndex((b) => b.id === bookId);
  if (bookIndex !== -1) {
    books[bookIndex].isBorrowed = true;
    books[bookIndex].borrowedBy = currentUser.id;
    books[bookIndex].borrowDate = new Date().toISOString();

    localStorage.setItem("books", JSON.stringify(books));
    displaybooks();
    alert("Book borrowed successfully!");
  }
}

function searchBooks() {
  const searchTerm = document.querySelector(".search-bar").value.toLowerCase();
  const searchType = document.querySelector("select").value;
  const books = JSON.parse(localStorage.getItem("books")) || [];

  let filteredBooks = books;

  if (searchTerm) {
    filteredBooks = books.filter((book) => {
      if (searchType === "ALL") {
        return (
          book.title.toLowerCase().includes(searchTerm) ||
          book.author.toLowerCase().includes(searchTerm) ||
          (book.genre && book.genre.toLowerCase().includes(searchTerm))
        );
      } else if (searchType === "AUTHOR") {
        return book.author.toLowerCase().includes(searchTerm);
      } else if (searchType === "TITLE") {
        return book.title.toLowerCase().includes(searchTerm);
      } else if (searchType === "GENRE") {
        return book.genre && book.genre.toLowerCase().includes(searchTerm);
      }
      return true;
    });
  }

  displaybooks(1, filteredBooks);
}

function createPaginationButtons(totalPages, currentPage) {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  if (totalPages <= 1) return;

  if (currentPage > 1) {
    const prevBtn = document.createElement("button");
    prevBtn.className = "circlebtn";
    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevBtn.onclick = () => displaybooks(currentPage - 1);
    paginationContainer.appendChild(prevBtn);
  }

  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  if (startPage > 1) {
    const firstBtn = document.createElement("button");
    firstBtn.className = "circlebtn";
    firstBtn.textContent = "1";
    firstBtn.onclick = () => displaybooks(1);
    paginationContainer.appendChild(firstBtn);

    if (startPage > 2) {
      const dots = document.createElement("span");
      dots.className = "dots";
      dots.textContent = "...";
      paginationContainer.appendChild(dots);
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    const button = document.createElement("button");
    button.className = `circlebtn ${i === currentPage ? "active" : ""}`;
    button.textContent = i;
    button.onclick = () => displaybooks(i);
    paginationContainer.appendChild(button);
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      const dots = document.createElement("span");
      dots.className = "dots";
      dots.textContent = "...";
      paginationContainer.appendChild(dots);
    }

    const lastBtn = document.createElement("button");
    lastBtn.className = "circlebtn";
    lastBtn.textContent = totalPages;
    lastBtn.onclick = () => displaybooks(totalPages);
    paginationContainer.appendChild(lastBtn);
  }

  if (currentPage < totalPages) {
    const nextBtn = document.createElement("button");
    nextBtn.className = "circlebtn";
    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextBtn.onclick = () => displaybooks(currentPage + 1);
    paginationContainer.appendChild(nextBtn);
  }
}
