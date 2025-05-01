document.addEventListener('DOMContentLoaded', function() {

    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 30;
        
        const updateNumber = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current) + (stat.textContent.includes('%') ? '%' : '+');
                requestAnimationFrame(updateNumber);
            } else {
                stat.textContent = stat.textContent.includes('%') ? '100%' : target + '+';
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateNumber();
                observer.unobserve(stat);
            }
        });
        
        observer.observe(stat);
    });
});