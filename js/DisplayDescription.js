document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('backButton').addEventListener('click', function() {
        window.history.back();
    });
    const selectedBookId = localStorage.getItem('selectedBookID');
    if (!selectedBookId) {
        window.location.href = 'Book_listing.html';
        return;
    }

    const books = JSON.parse(localStorage.getItem('books')) || [];
    const book = books.find(b => b.id == selectedBookId);

    if (book) {
        document.getElementById('bookTitle').textContent = book.title;
        document.getElementById('bookAuthor').textContent = book.author;
        document.getElementById('bookGenre').textContent = book.genre || 'Not specified';
        document.getElementById('bookDescription').textContent = book.description || 'No description available';
        
        if (book.image) {
            document.getElementById('bookImage').src = book.image;
        }
    } else {
        document.getElementById('bookTitle').textContent = 'Book not found';
        document.getElementById('bookDescription').textContent = 'The requested book could not be found in our collection.';
    }
});