const currentUser = JSON.parse(localStorage.getItem("currentUser")) || { username: "guest" };
const availableList = document.querySelector(".available-list");
const borrowedList = document.querySelector(".borrowed-list");
const favoriteList = document.querySelector(".favorite-list");
let userBorrowed = JSON.parse(localStorage.getItem(currentUser.username + "_borrowed")) || [];
let userFavorites = JSON.parse(localStorage.getItem(currentUser.username + "_favorites")) || [];

function getBooks() {
  const books = localStorage.getItem("books");
  return books ? JSON.parse(books) : [];
}

function saveData() {
  localStorage.setItem(currentUser.username + "_borrowed", JSON.stringify(userBorrowed));
  localStorage.setItem(currentUser.username + "_favorites", JSON.stringify(userFavorites));
}

function createBookElement(book, withActions = true) {
  const bookDiv = document.createElement("div");
  bookDiv.className = "book";
  bookDiv.setAttribute("data-id", book.id);

  const img = document.createElement("img");
  img.src = book.image || "https://placehold.co/160x240?text=No+Cover";
  img.className = "book-cover";
  img.alt = book.title;
  bookDiv.appendChild(img);

  const infoDiv = document.createElement("div");
  infoDiv.className = "book-info";
  
  const title = document.createElement("h3");
  title.className = "book-title";
  title.textContent = book.title;
  infoDiv.appendChild(title);
  
  const author = document.createElement("p");
  author.className = "book-author";
  author.textContent = `by ${book.author}`;
  infoDiv.appendChild(author);
  
  bookDiv.appendChild(infoDiv);

  if (withActions) {
    const actionsDiv = document.createElement("div");
    actionsDiv.className = "book-actions";
    const borrowBtn = document.createElement("button");
    borrowBtn.className = "borrow-btn";
    borrowBtn.textContent = 'BORROW';
    const favBtn = document.createElement("button");
    favBtn.className = "fav-btn";
    favBtn.innerHTML = '<i class="fas fa-heart"></i>';
    actionsDiv.appendChild(borrowBtn);
    actionsDiv.appendChild(favBtn);
    bookDiv.appendChild(actionsDiv);
    borrowBtn.addEventListener("click", () => {
      if (!userBorrowed.find(b => b.id === book.id)) {
        userBorrowed.push({ 
          id: book.id, 
          title: book.title,
          author: book.author,
          image: book.image 
        });
        saveData();
        renderBooks();
      }
    });
    favBtn.addEventListener("click", () => {
      const favoriteIndex = userFavorites.findIndex(b => b.id === book.id);
      if (favoriteIndex === -1) {
        userFavorites.push({ 
          id: book.id,
          title: book.title,
          author: book.author,
          image: book.image
        });
        favBtn.classList.add("active");
      } else {
        userFavorites.splice(favoriteIndex, 1);
        favBtn.classList.remove("active");
      }
      saveData();
      renderBooks();
    });
    const isFav = userFavorites.find(b => b.id === book.id);
    if (isFav) {
      favBtn.classList.add("active");
    }
  }

  return bookDiv;
}
function renderBooks() {
  borrowedList.innerHTML = "";
  favoriteList.innerHTML = "";

  userBorrowed.forEach(book => {
    borrowedList.appendChild(createBookElement(book, false));
  });

  userFavorites.forEach(book => {
    favoriteList.appendChild(createBookElement(book, false));
  });
}
function loadAvailableBooks() {
  const books = getBooks();
  availableList.innerHTML = "";
  books.forEach(book => {
    if (!book.isBorrowed) {
      availableList.appendChild(createBookElement(book, true));
    }
  });
}
document.addEventListener("DOMContentLoaded", () => {
  loadAvailableBooks();
  renderBooks();
  document.querySelectorAll(".slider-container").forEach(container => {
    const wrapper = container.querySelector(".book-wrapper");
    const prevBtn = document.createElement("button");
    prevBtn.className = "slider-nav prev";
    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevBtn.addEventListener("click", () => {
      wrapper.scrollBy({ left: -300, behavior: 'smooth' });
    });
    container.appendChild(prevBtn);
    const nextBtn = document.createElement("button");
    nextBtn.className = "slider-nav next";
    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextBtn.addEventListener("click", () => {
      wrapper.scrollBy({ left: 300, behavior: 'smooth' });
    });
    container.appendChild(nextBtn);
  });
});