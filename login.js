const form = document.getElementById('login-form');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if(email.includes("admin")) {
        const userData = { email: email, isAdmin: true };
        saveCurrentUser(userData);
        window.location.href = "dashboard.html";
    } else {
        const users = getUsers();
        const user = users.find(u => u.email === email);

        if (!user) {
            alert("Email not found");
            return;
        }

        if (password === user.password) {
            const userData = { email: email, isAdmin: false };
            saveCurrentUser(userData);
            window.location.href = "dashboard.html";
        } else {
            alert("Wrong password");
        }
    }
});
