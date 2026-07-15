document.addEventListener('DOMContentLoaded', function() {
    // Get all FAQ accordion elements
    const accordions = document.querySelectorAll('.faq-accordion');
    
    // Add click event to each accordion
    accordions.forEach(accordion => {
        const question = accordion.querySelector('.faq-question');
        const answer = accordion.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            // Close all other open accordions
            accordions.forEach(item => {
                if (item !== accordion && item.classList.contains('active')) {
                    item.classList.remove('active');
                    item.querySelector('.faq-answer').style.maxHeight = '0';
                }
            });
            
            // Toggle current accordion
            const isActive = accordion.classList.toggle('active');
            
            if (isActive) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0';
            }
        });
    });
    
    // Add animation classes when elements come into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('bento-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe each FAQ accordion for scroll animations
    document.querySelectorAll('.bento-fade-in').forEach(element => {
        observer.observe(element);
    });
});
