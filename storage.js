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

function getCurrentUser(){}// Retrieves the current logged-in user's data from localStorage

function saveCurrentUser(user){}// Saves the current logged-in user's data to localStorage

function getUsers(){}// Retrieves the list of all users from localStorage

function saveUsers(users){}// Saves the list of all users to localStorage

function getBorrowedBooks(){}// Retrieves the list of borrowed books for the current user from localStorage

function saveBorrowedBooks(userBooks){}// Saves the updated list of borrowed books for the current user to localStorage

function updateBorrowedBooks(action, book){}// Updates the borrowed books list by adding or removing a book based on the action

function getFavouriteBooks(){}// Retrieves the list of favorite books for the current user from localStorage

function saveFavouriteBooks(userBooks){}// Saves the updated list of favorite books for the current user to localStorage
function updateFavouriteBooks(action, book){}// Updates the favorite books list by adding or removing a book based on the action
function getBookStatus(bookid){
    let books = getBooks();
    let book = books.find(b=>b.id === bookid);
    if(!book){
       return false
    }
    return book.isBorrowed ? true : false;
}


