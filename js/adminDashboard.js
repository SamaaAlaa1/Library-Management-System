function getBooks() {
  const books = localStorage.getItem("books");
  return books ? JSON.parse(books) : [];
}
function saveBooks(books) {
  localStorage.setItem("books", JSON.stringify(books));
}

function getMessages() {
  const messages = localStorage.getItem("contactMessages");
  return messages ? JSON.parse(messages) : [];
}

function saveMessages(messages) {
  localStorage.setItem("contactMessages", JSON.stringify(messages));
}

function getUsers() {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function initDashboard() {
    // localStorage.clear();

  if (getBooks().length === 0) {
    // localStorage.clear();
    const sampleBooks = [
      {
        id: 1,
        title: "Harry Potter and the Goblet of Fire",
        author: "J.K. Rowling",
        genre: "Dystopian Fiction",
        description: "Lord Voldemort, the dark wizard responsible for the deaths of Harry's parents, is growing stronger. At the Quidditch World Cup, Voldemort's signature Dark Mark appears in the sky over the stadium, causing pandemonium",
        image: "/images/book14.jpg",
        isBorrowed: false,
      },
      {
        id: 2,
        title: "1984 by George Orwell",
        author: "Harper Lee",
        genre: "Dystopian Fiction",
        description: " A classic novel about a totalitarian regime and thought control.",
        image: "/images/book6.jpg",
        isBorrowed: false,
      },
      {
        id: 3,
        title: "The Hobbit by J.R.R. Tolkien",
        author: "Jane Austen",
        genre: "Fantasy",
        description: "Bilbo Baggins' adventure with dwarves and a dragon.",
        image: "/images/book7.jpg",
        isBorrowed: false,
      },
      {
        id: 4,
        title: "Pride and Prejudice by Jane Austen",
        author: "George Orwell",
        genre: "Classic Romance",
        description: "The romantic tensions between Elizabeth Bennet and Mr. Darcy.",
        image: "/images/book8.jpg",
        isBorrowed: false,
      },
      {
        id: 5,
        title: "The Alchemist by Paulo Coelho",
        author: "William Gibson",
        genre: "Inspirational Fiction",
        description: "A shepherd's journey to find worldly treasure.",
        image: "/images/book9.jpg",
        isBorrowed: false,
      },
      {
        id: 6,
        title: "The Silent Patient by Alex Michaelide",
        author: "Gillian Flynn",
        genre: "Psychological Thriller",
        description: "A woman shoots her husband and then stops speaking.",
        image: "/images/book10.jpg",
        isBorrowed: false,
      },
      {
        id: 7,
        title: "Infernal Devices",
        author: "James Clear",
        genre: "Self-Help",
        description: "A guide to building good habits and breaking bad ones with tiny changes.",
        image: "/images/book11.jpg",
        isBorrowed: false,
      },
      {
        id: 8,
        title: "The Night Circus",
        author: "Erin Morgenstern",
        genre: "Self-Help",
        description: "A mysterious competition between two young magicians unfolds within a magical black-and-white circus.",
        image: "/images/book12.jpg",
        isBorrowed: false,
      },
      {
        id: 9,
        title: "Circe",
        author: "Madeline Miller",
        genre: "Mythological Fiction",
        description: "A retelling of the life of Circe, the witch from Homer's Odyssey.",
        image: "/images/book13.jpg",
        isBorrowed: false,
      },
      {
        id: 10,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Classic",
        description: "A story of wealth, love, and the American Dream in the 1920s.",
        image: "/images/book1.jfif", 
        isBorrowed: false,
      },
      {
        id: 11,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Literary Fiction",
        description: "A powerful exploration of racial injustice and moral growth in the American South.",
        image: "/images/book2.jfif",
        isBorrowed: false,
      },
      {
        id: 12,
        title: "Dune",
        author: "Frank Herbert",
        genre: "Science Fiction",
        description: "A epic saga of politics, religion, and survival on a desert planet.",
        image: "/images/book3.jfif",
        isBorrowed: false,
      },
      {
        id: 13,
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        genre: "Fantasy",
        description: "A adventure of Bilbo Baggins, who embarks on a quest to win a share of a dragon's treasure.",
        image: "/images/book4.jfif",
        isBorrowed: false,
      },
      {
        id: 14,
        title: "Atomic Habits",
        author: "James Clear",
        genre: "Self-Help",
        description: "A guide to building good habits and breaking bad ones with tiny changes.",
        image: "/images/book5.jfif",
        isBorrowed: false,
      },
      
      
    ];
    saveBooks(sampleBooks);
  }
  if (getUsers().length === 0) {
    const sampleUsers = [
      {
        id: 1,
        name: "Admin User",
        email: "admin@example.com",
        password: "12345",
        role: "admin",
        status: "active"
      },
      {
        id: 2,
        name: "John Doe",
        email: "john@example.com",
        password: "john123",
        role: "user",
        status: "active"
      }
    ];
    saveUsers(sampleUsers);
  }
  renderBooksTable();
  renderMessagesTable();
  renderUsersTable();
  setupEventListeners();
}

function addNewBook() {
  const books = getBooks();
  const newId = books.length > 0 ? Math.max(...books.map((b) => b.id)) + 1 : 1;

  const newBook = {
    id: newId,
    title: document.getElementById("addTitle").value,
    author: document.getElementById("addAuthor").value,
    genre: document.getElementById("addGenre").value, 
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
            <td>${book.genre || "-"}</td> <!-- Changed to "genre" -->
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

function renderMessagesTable() {
  const messages = getMessages();
  const tableBody = document.getElementById("messagesTableBody");
  tableBody.innerHTML = "";

  if (messages.length === 0) {
    const row = document.createElement("tr");
    row.innerHTML = `<td colspan="5" style="text-align: center;">No messages found</td>`;
    tableBody.appendChild(row);
    return;
  }

  messages.forEach((message) => {
    const row = document.createElement("tr");
    const date = new Date(message.timestamp);
    const formattedDate = date.toLocaleString();
    
    row.innerHTML = `
      <td>${message.name}</td>
      <td>${message.email}</td>
      <td>${message.message.substring(0, 50)}${message.message.length > 50 ? '...' : ''}</td>
      <td>${formattedDate}</td>
      <td>
          <div class="action-buttons">
              <button class="action-btn btn-primary view-message-btn" data-id="${message.timestamp}">
                  <i class="fas fa-eye"></i> View
              </button>
              <button class="action-btn btn-danger delete-message-btn" data-id="${message.timestamp}">
                  <i class="fas fa-trash"></i> Delete
              </button>
          </div>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function renderUsersTable() {
  const users = getUsers();
  const tableBody = document.getElementById("usersTableBody");
  tableBody.innerHTML = "";

  if (users.length === 0) {
    const row = document.createElement("tr");
    row.innerHTML = `<td colspan="6" style="text-align: center;">No users found</td>`;
    tableBody.appendChild(row);
    return;
  }

  users.forEach((user, index) => {
    const row = document.createElement("tr");
    const role = user.role || 'user'; 
    const status = user.status || 'active'; 
    
    row.innerHTML = `
      <td>${index+1}</td>
      <td>${user.name || ''}</td>
      <td>${user.email || ''}</td>
      <td>${role.charAt(0).toUpperCase() + role.slice(1)}</td>
      <td class="status-${status}">${status.charAt(0).toUpperCase() + status.slice(1)}</td>
      <td>
          <div class="action-buttons">
              <button class="action-btn btn-warning edit-user-btn" data-id="${user.id}">
                  <i class="fas fa-edit"></i> Edit
              </button>
              <button class="action-btn btn-danger delete-user-btn" data-id="${user.id}">
                  <i class="fas fa-trash"></i> Delete
              </button>
          </div>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function addNewUser(e) {
  e.preventDefault();
  
  const users = getUsers();
  const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;

  const newUser = {
    id: newId,
    name: document.getElementById("userName").value,
    email: document.getElementById("userEmail").value,
    password: document.getElementById("userPassword").value,
    role: document.getElementById("userRole").value,
    status: "active"
  };

  users.push(newUser);
  saveUsers(users);

  document.getElementById("addUserModal").style.display = "none";
  document.getElementById("addUserForm").reset();
  renderUsersTable();
}

function setupEventListeners() {
  document.querySelectorAll('.menu-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.menu-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      const target = this.dataset.target;
      document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
      });
      document.getElementById(target).classList.add('active');
    });
  });

  document.getElementById("addBookBtn").addEventListener("click", openAddModal);
  document.getElementById("booksTableBody").addEventListener("click", handleBookActions);
  
  document.getElementById("messagesTableBody").addEventListener("click", handleMessageActions);
  document.getElementById("closeMessageBtn").addEventListener("click", () => {
    document.getElementById("viewMessageModal").style.display = "none";
  });
  document.getElementById("deleteMessageBtn").addEventListener("click", deleteCurrentMessage);
  
  document.getElementById("addUserBtn").addEventListener("click", openAddUserModal);
  document.getElementById("usersTableBody").addEventListener("click", handleUserActions);
  document.getElementById("addUserForm").addEventListener("submit", addNewUser);
  document.getElementById("cancelAddUserBtn").addEventListener("click", () => {
    document.getElementById("addUserModal").style.display = "none";
  });
  document
    .getElementById("cancelAddBtn")
    .addEventListener("click", function () {
      document.getElementById("addBookModal").style.display = "none";
    });

  const addBookForm = document.getElementById("addBookForm");
  if (addBookForm) {
    addBookForm.addEventListener("submit", function(e) {
      e.preventDefault();
      addNewBook();
    });
  }

  const editBookForm = document.getElementById("editBookForm");
  if (editBookForm) {
    editBookForm.addEventListener("submit", function(e) {
      e.preventDefault();
      updateBook();
    });
  }
}

function handleBookActions(e) {
  const btn = e.target.closest("button");
  if (!btn) return;

  const bookId = parseInt(btn.dataset.id);

  if (btn.classList.contains("btn-warning")) {
    openEditModal(bookId);
  } else if (btn.classList.contains("btn-danger")) {
    deleteBook(bookId);
  }
}

function handleMessageActions(e) {
  const btn = e.target.closest("button");
  if (!btn) return;

  const timestamp = btn.dataset.id;

  if (btn.classList.contains("view-message-btn")) {
    viewMessage(timestamp);
  } else if (btn.classList.contains("delete-message-btn")) {
    deleteMessage(timestamp);
  }
}

function handleUserActions(e) {
  const btn = e.target.closest("button");
  if (!btn) return;

  const userId = parseInt(btn.dataset.id);

  if (btn.classList.contains("edit-user-btn")) {
    editUser(userId);
  } else if (btn.classList.contains("delete-user-btn")) {
    deleteUser(userId);
  }
}

function viewMessage(timestamp) {
  const messages = getMessages();
  const message = messages.find(m => m.timestamp === timestamp);
  
  if (!message) return;

  document.getElementById("viewMessageName").textContent = message.name;
  document.getElementById("viewMessageEmail").textContent = message.email;
  document.getElementById("viewMessageContent").textContent = message.message;
  
  const date = new Date(message.timestamp);
  document.getElementById("viewMessageDate").textContent = date.toLocaleString();
  
  document.getElementById("viewMessageModal").style.display = "flex";
  document.getElementById("deleteMessageBtn").dataset.id = timestamp;
}

function deleteMessage(timestamp) {
  if (confirm("Are you sure you want to delete this message?")) {
    const messages = getMessages().filter(m => m.timestamp !== timestamp);
    saveMessages(messages);
    renderMessagesTable();
  }
}

function deleteCurrentMessage() {
  const timestamp = document.getElementById("deleteMessageBtn").dataset.id;
  deleteMessage(timestamp);
  document.getElementById("viewMessageModal").style.display = "none";
}

function openAddUserModal() {
  document.getElementById("addUserModal").style.display = "flex";
}



function editUser(userId) {
  alert("Edit user functionality to be implemented");
}

function deleteUser(userId) {
  if (confirm("Are you sure you want to delete this user?")) {
    const users = getUsers().filter(u => u.id !== userId);
    saveUsers(users);
    renderUsersTable();
  }
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
  document.getElementById("editGenre").value = book.genre || "";
  document.getElementById("editDescription").value = book.description || "";
  document.getElementById("editImage").value = book.image || "";
  document.getElementById("editIsBorrowed").value = book.isBorrowed
    ? "true"
    : "false";

  document.getElementById("editBookModal").style.display = "flex";
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
      genre: document.getElementById("editGenre").value, 
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
