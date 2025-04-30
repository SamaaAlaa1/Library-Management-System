const form = document.getElementById('signup-form');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('Password does not match!');
        return;
    }

    const users = getUsers();


    if (users.find(u => u.email === email)) {
        alert("Email already exists!");
        return;
    }

    const userData = {
        email: email,
        username: username,
        password: password
    };

    users.push(userData);
    saveUsers(users);

   
    const currentUser = { email: email, isAdmin: false };
    saveCurrentUser(currentUser);

    window.location.href = "dashboard.html";
});
