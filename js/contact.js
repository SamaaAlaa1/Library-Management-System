document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const confirmationMessage = document.getElementById('confirmation');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
  
        const contactMessage = {
            name: name,
            email: email,
            message: message,
            timestamp: new Date().toISOString()
        };
        
        saveMessageToLocalStorage(contactMessage);
        showConfirmation();

        contactForm.reset();
    });
    
    function saveMessageToLocalStorage(message) {
        let messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
        messages.push(message);
        localStorage.setItem('contactMessages', JSON.stringify(messages));
    }
    
    function showConfirmation() {
        confirmationMessage.textContent = 'Thank you for your message! We will get back to you soon.';
        confirmationMessage.style.display = 'block';

        setTimeout(() => {
            confirmationMessage.style.display = 'none';
        }, 5000);
    }
});