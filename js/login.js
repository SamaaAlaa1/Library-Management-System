// Admin login
// admin@example.com
// 12345

const form = document.getElementById('login-form');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (username === 'admin@example.com' && password === '12345') {
        const userData = { 
            username: 'admin', 
            isAdmin: true,
            role: 'admin',  
            email: 'admin@example.com'
        };
        saveCurrentUser(userData);
        window.location.href = "/pages/adminDashboard.html";  
        return;
    }
    const users = getUsers();
    const user = users.find(u => u.email === username || u.username === username);

    if (!user) {
        alert("Username/Email not found");
        return;
    }

    if (password === user.password) {
        const userData = { 
            username: user.username || user.email, 
            isAdmin: false,
            role: 'user', 
            email: user.email
        };
        saveCurrentUser(userData);
        window.location.href = "/pages/dashboard.html";  
    } else {
        alert("Wrong password");
    }
});