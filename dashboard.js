const currentUser = getCurrentUser();

if (currentUser && currentUser.isAdmin) {
    const btns = document.querySelectorAll(".borrow-btn");
    btns.forEach(btn => {
        btn.innerHTML = "EDIT DETAILS";
    });

    document.querySelector(".navbar").innerHTML += '<a href="/AddBook.html">ADD BOOK</a>';
}
