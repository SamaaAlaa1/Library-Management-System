
document.addEventListener("DOMContentLoaded", () => {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    const profileData = JSON.parse(localStorage.getItem(`profile_${currentUser.username}`)) || {};

    document.getElementById("fn").value = profileData.firstName || "";
    document.getElementById("ln").value = profileData.lastName || "";
    document.getElementById("phone").value = profileData.phone || "";
    document.getElementById("email").value = profileData.email || "";
    document.getElementById("nid").value = profileData.nid || "";
    document.getElementById("g").value = profileData.gender || "";
    document.getElementById("age").value = profileData.age || "";

    if (profileData.image) {
        const img = document.querySelector("img");
        img.src = profileData.image;
    }

    const form = document.querySelector("form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = {
            firstName: document.getElementById("fn").value,
            lastName: document.getElementById("ln").value,
            phone: document.getElementById("phone").value,
            email: document.getElementById("email").value,
            nid: document.getElementById("nid").value,
            gender: document.getElementById("g").value,
            age: document.getElementById("age").value,
            image: document.querySelector("img").src
        };

        localStorage.setItem(`profile_${currentUser.username}`, JSON.stringify(data));
        alert("Profile updated successfully!");
    });
});


