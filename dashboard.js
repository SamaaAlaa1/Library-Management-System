const currentUser = getCurrentUser();

if (currentUser && currentUser.isAdmin) {


    document.querySelector(".navbar").innerHTML += '<a href="adminDashboard.html"> ADD& EDIT BOOK </a>';
}

let btn = document.getElementsByClassName("fav-btn")
for(let i = 0; i < btn.length; i++){
    btn[i].onclick = function()
{
    this.classList.toggle("fav")
}
}
