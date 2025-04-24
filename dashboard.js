const currentUser = getCurrentUser();

if (currentUser && currentUser.isAdmin) {


    document.querySelector(".navbar").innerHTML += '<a href="adminDashboard.html"> ADD& EDIT BOOK </a>';
}

