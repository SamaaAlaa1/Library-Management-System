function displaybooks(page = 1) {
    const container = document.getElementById("book_list_container");
    const books = JSON.parse(localStorage.getItem("books")) || [];
    const booksPerPage = 9;
    const start = (page - 1) * booksPerPage;
    const end = start + booksPerPage;
    const booksToDisplay = books.slice(start, end);

    container.innerHTML = "";

    booksToDisplay.forEach(book => {
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

    createPaginationButtons(Math.ceil(books.length / booksPerPage), page);
}

function createPaginationButtons(totalPages, currentPage) {
    let paginationContainer = document.getElementById("pagination");

    if (!paginationContainer) {
        paginationContainer = document.createElement("div");
        paginationContainer.id = "pagination";
        paginationContainer.style.textAlign = "center";
        paginationContainer.style.marginTop = "20px";
        document.body.appendChild(paginationContainer);
    }

    paginationContainer.innerHTML = "";

    for (let i = 1; i <=totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.style.width = "40px";
        button.style.height = "40px";
        button.style.borderRadius = "50%";
        button.style.margin = "5px";
        button.style.backgroundColor = "#5ab2a6";
        button.style.color = "#ffffff";
        button.style.border = "none";
        button.style.cursor = "pointer";
        button.style.fontWeight = "bold";
        button.style.fontSize = "16px";

        // Highlight the current page with slight shadow
        if (i === currentPage) {
            button.style.boxShadow = "0 0 10px #5ab2a6";
        }

        button.onclick = () => displaybooks(i);
        paginationContainer.appendChild(button);
    }
}

window.onload = () => displaybooks();
