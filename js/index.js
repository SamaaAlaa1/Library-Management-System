const books = JSON.parse(localStorage.getItem("books")) || [];
const slider = document.getElementById("book-slider");
books.forEach(book => {
    const bookdiv = document.createElement("div");
    bookdiv.classList.add("book-card");
    const img = document.createElement("img");
    img.src = book.image;
    img.alt = book.title;
    
    bookdiv.appendChild(img);
    slider.appendChild(bookdiv);

});
const leftbtn = document.getElementById("prevBtn");
const rightbtn = document.getElementById("nextBtn");
leftbtn.addEventListener("click", ()=>{
    slider.scrollBy({
        left:-300,
        behaviour:smooth
    });
});
rightbtn.addEventListener("click", ()=>{
    slider.scrollBy({
        left:300,
        behavior:"smooth"
        
    });
});