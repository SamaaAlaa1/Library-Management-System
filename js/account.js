document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('Please login to view your profile');
        window.location.href = '/login.html';
        return;
    }
    populateUserData(currentUser);

    setupEventListeners(currentUser);
});

function populateUserData(user) {
    document.getElementById('fn').value = user.firstName || '';
    document.getElementById('ln').value = user.lastName || '';
    document.getElementById('email').value = user.email || '';
    document.getElementById('phone').value = user.phone || '';
    document.getElementById('nid').value = user.nationalId || '';
    document.getElementById('age').value = user.age || '';

    if (user.gender) {
        document.getElementById('g').value = user.gender;
    }

    if (user.profilePic) {
        document.getElementById('profilePic').src = user.profilePic;
    }
}

function setupEventListeners(user) {
    document.getElementById('profilePicInput').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                document.getElementById('profilePic').src = event.target.result;
                user.profilePic = event.target.result;
                localStorage.setItem('currentUser', JSON.stringify(user));
            };
            reader.readAsDataURL(file);
        }
    });

    document.getElementById('profileForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const updatedUser = {
            ...user,
            firstName: document.getElementById('fn').value.trim(),
            lastName: document.getElementById('ln').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            nationalId: document.getElementById('nid').value.trim(),
            age: document.getElementById('age').value.trim(),
            gender: document.getElementById('g').value
        };
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));

        alert('Profile updated successfully!');
    });
}

