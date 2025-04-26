function getBooks() {
  const books = localStorage.getItem("books");
  return books ? JSON.parse(books) : [];
}
function saveBooks(books) {
  localStorage.setItem("books", JSON.stringify(books));
}
function initDashboard() {
  localStorage.clear();
  if (getBooks().length === 0) {
    localStorage.clear();
    const sampleBooks = [
      {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Classic",
        description: "A story of wealth, love, and the American Dream in the 1920s.",
        image: "images/book1.jfif", 
        isBorrowed: false,
      },
      {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Literary Fiction",
        description: "A powerful exploration of racial injustice and moral growth in the American South.",
        image: "images/book2.jfif",
        isBorrowed: false,
      },
      {
        id: 3,
        title: "Dune",
        author: "Frank Herbert",
        genre: "Science Fiction",
        description: "A epic saga of politics, religion, and survival on a desert planet.",
        image: "images/book3.jfif",
        isBorrowed: false,
      },
      {
        id: 4,
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        genre: "Fantasy",
        description: "A adventure of Bilbo Baggins, who embarks on a quest to win a share of a dragon's treasure.",
        image: "images/book4.jfif",
        isBorrowed: false,
      },
      {
        id: 5,
        title: "Atomic Habits",
        author: "James Clear",
        genre: "Self-Help",
        description: "A guide to building good habits and breaking bad ones with tiny changes.",
        image: "images/book5.jfif",
        isBorrowed: false,
      }
    ];
    saveBooks(sampleBooks);
  }
  renderBooksTable();
  setupEventListeners();
}

function renderBooksTable() {
  const books = getBooks();
  const tableBody = document.getElementById("booksTableBody");
  tableBody.innerHTML = "";

  books.forEach((book) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td><img src="${
              book.image || "https://via.placeholder.com/50x70"
            }" alt="Book Cover" class="book-cover"></td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.genere || "-"}</td>
            <td class="${
              book.isBorrowed ? "status-borrowed" : "status-available"
            }">
                ${book.isBorrowed ? "Borrowed" : "Available"}
            </td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn btn-warning" data-id="${book.id}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="action-btn btn-danger" data-id="${book.id}">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </td>
        `;
    tableBody.appendChild(row);
  });
}

function setupEventListeners() {
  document.getElementById("addBookBtn").addEventListener("click", openAddModal);
  document
    .getElementById("booksTableBody")
    .addEventListener("click", function (e) {
      const btn = e.target.closest("button");
      if (!btn) return;

      const bookId = parseInt(btn.dataset.id);

      if (btn.classList.contains("btn-warning")) {
        openEditModal(bookId);
      } else if (btn.classList.contains("btn-danger")) {
        deleteBook(bookId);
      }
    });
  document
    .getElementById("addBookForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      addNewBook();
    });

  document
    .getElementById("editBookForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      updateBook();
    });

  document.querySelectorAll(".close-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      this.closest(".modal").style.display = "none";
    });
  });
  document
    .getElementById("cancelAddBtn")
    .addEventListener("click", function () {
      document.getElementById("addBookModal").style.display = "none";
    });

  document
    .getElementById("cancelEditBtn")
    .addEventListener("click", function () {
      document.getElementById("editBookModal").style.display = "none";
    });

  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", function (e) {
      if (e.target === this) {
        this.style.display = "none";
      }
    });
  });
}

function openAddModal() {
  document.getElementById("addBookModal").style.display = "flex";
}

function openEditModal(bookId) {
  const book = getBooks().find((b) => b.id === bookId);
  if (!book) return;

  document.getElementById("editId").value = book.id;
  document.getElementById("editTitle").value = book.title;
  document.getElementById("editAuthor").value = book.author;
  document.getElementById("editGenre").value = book.genere || "";
  document.getElementById("editDescription").value = book.description || "";
  document.getElementById("editImage").value = book.image || "";
  document.getElementById("editIsBorrowed").value = book.isBorrowed
    ? "true"
    : "false";

  document.getElementById("editBookModal").style.display = "flex";
}

function addNewBook() {
  const books = getBooks();
  const newId = books.length > 0 ? Math.max(...books.map((b) => b.id)) + 1 : 1;

  const newBook = {
    id: newId,
    title: document.getElementById("addTitle").value,
    author: document.getElementById("addAuthor").value,
    genere: document.getElementById("addGenre").value,
    description: document.getElementById("addDescription").value,
    image: document.getElementById("addImage").value,
    isBorrowed: document.getElementById("addIsBorrowed").value === "true",
  };

  books.push(newBook);
  saveBooks(books);

  document.getElementById("addBookModal").style.display = "none";
  document.getElementById("addBookForm").reset();
  renderBooksTable();
}

function updateBook() {
  const id = parseInt(document.getElementById("editId").value);
  const books = getBooks();
  const index = books.findIndex((b) => b.id === id);

  if (index !== -1) {
    books[index] = {
      id: id,
      title: document.getElementById("editTitle").value,
      author: document.getElementById("editAuthor").value,
      genere: document.getElementById("editGenre").value,
      description: document.getElementById("editDescription").value,
      image: document.getElementById("editImage").value,
      isBorrowed: document.getElementById("editIsBorrowed").value === "true",
    };

    saveBooks(books);
    document.getElementById("editBookModal").style.display = "none";
    renderBooksTable();
  }
}

function deleteBook(bookId) {
  if (confirm("Are you sure you want to delete this book?")) {
    const books = getBooks().filter((b) => b.id !== bookId);
    saveBooks(books);
    renderBooksTable();
  }
}
document.addEventListener("DOMContentLoaded", initDashboard);
