function displaybooks(){
    const container = document.getElementById("book_list_container");
    const books = JSON.parse(localStorage.getItem("books")) || [];
    container.innerHTML="";
    books.forEach(book=>{
        const bookDiv = document.createElement("div");
        bookDiv.className = "Book-Grid";
        const img = document.createElement("img");
        img.src = book.image;
        img.alt = book.title;
        img.onclick = () => {
            localStorage.setItem("selectedBookID", book.id);
            window.location.href = "BookDetails.html";
    };

    const button = document.createElement("button");
    button.textContent = book.isBorrowed ? "Borrowed" : "Borrow";
    button.disabled = book.isBorrowed;

    bookDiv.appendChild(img);
    bookDiv.appendChild(button);
    container.appendChild(bookDiv);
});
}
window.onload = displaybooks;