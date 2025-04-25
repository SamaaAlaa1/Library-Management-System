function sveBookID(bookid){
    localStorage.setItem("selectedBookID", bookid);
    window.location.href="BookDetails.html";
}
function displayDescription(containerid){
    const selectedid = localStorage.getItem("selectedBookID");
    if(!selectedid){
        document.getElementById(containerid).innerHTML= "No book is selected";
        return;
    }
    let books = [];
    for(let i=0; i<localStorage.length; i++){
        let value = JSON.parse(localStorage.getItem(localStorage.key(i)));
        if(Array.isArray(value)){
            books = value;
            break;
        }

    }
    const book = books.find(b=>b.id == selectedid);
    if(book){
        document.getElementById("bookimg").src = book.image;
        document.getElementById("booktitle").textContent = book.title
        document.getElementById("genere").textContent = book.genere;
        document.getElementById("bookdetails").textContent= book.description;
    }else{
        document.getElementById(containerid).innerHTML="Not Found";
    }
}
