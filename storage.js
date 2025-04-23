let book ={
    id:1,
    title: "Book title",
    author:"author name",
    genere:"",
    description:"-----------------",
    image:"",
    isBorrowed : false

}
function getBooks(){} // Retrieves the list of all books from localStorage

function saveBooks(books){}// Saves the list of books to localStorage

function getCurrentUser(){
    return JSON.parse(localStorage.getItem("currentUser"));


}// Retrieves the current logged-in user's data from localStorage

function saveCurrentUser(user){
    localStorage.setItem("currentUser", JSON.stringify(user));
}

function getUsers(){
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
}// Retrieves the list of all users from localStorage

function saveUsers(users){
    localStorage.setItem("users", JSON.stringify(users));

}// Saves the list of all users to localStorage

function getBorrowedBooks(){}// Retrieves the list of borrowed books for the current user from localStorage

function saveBorrowedBooks(userBooks){}// Saves the updated list of borrowed books for the current user to localStorage

function updateBorrowedBooks(action, book){}// Updates the borrowed books list by adding or removing a book based on the action

function getFavouriteBooks(){
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) return []; 

    const data = localStorage.getItem(`favourites_${currentUser}`);
    return data ? JSON.parse(data) : [];

}// Retrieves the list of favorite books for the current user from localStorage

function saveFavouriteBooks(userBooks){
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) return; 

    localStorage.setItem(`favourites_${currentUser}`, JSON.stringify(userBooks));
}

// Saves the updated list of favorite books for the current user to localStorage
function updateFavouriteBooks(action, book){
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("fav-btn")) {
      const bookDiv = e.target.closest(".book");
      const bookId = bookDiv.dataset.id;
      const bookImg = bookDiv.querySelector("img").src;

      let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

      const index = favourites.findIndex(book => book.id === bookId);

      if (index === -1) {
        favourites.push({ id: bookId, img: bookImg });
        e.target.textContent = "Remove from Favourites";
        alert("Book added to favourites!");
      } else {
        favourites.splice(index, 1);
        e.target.textContent = "Add to Favourites";
        alert("Book removed from favourites!");
      }

      localStorage.setItem("favourites", JSON.stringify(favourites));
    }
  });

  window.addEventListener("DOMContentLoaded", () => {
    const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    document.querySelectorAll(".book").forEach(book => {
      const bookId = book.dataset.id;
      const isFav = favourites.find(b => b.id === bookId);
      const btn = book.querySelector(".fav-btn");
      if (isFav) {
        btn.textContent = "Remove from Favourites";
      } else {
        btn.textContent = "Add to Favourites";
      }
    });
  });
}

function getBookStatus(bookid){
    let books = getBooks();
    let book = books.find(b=>b.id === bookid);
    if(!book){
        return false
    }
    return book.isBorrowed ? true : false;
}


