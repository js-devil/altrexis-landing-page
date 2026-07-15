// GSAP animations for ALTREXIS landing page
gsap.registerPlugin(ScrollTrigger);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeAnimations();
});

function initializeAnimations() {
    // Hero section exit animation (scrubbing away)
    gsap.to('.hero-content', {
        opacity: 0,
        y: -100,
        ease: 'power1.in',
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    // Corporate About Section Animation
    gsap.to('.corp-about-text', {
        scrollTrigger: {
            trigger: '.corporate-about-section',
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        clipPath: "inset(0 0 0% 0)",
        duration: 1.5,
        ease: 'power3.out'
    });

    gsap.to('.corp-about-img-wrapper', {
        scrollTrigger: {
            trigger: '.corporate-about-section',
            start: 'top 75%',
            toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        clipPath: "inset(0 0 0% 0)",
        duration: 1.5,
        delay: 0.2,
        ease: 'power3.out'
    });

    // Products Reveal Section Animation
    const productsTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.products-reveal-section',
            start: 'top top',
            end: '+=300%',
            scrub: 1,
            pin: true,
            anticipatePin: 1
        }
    });

    // Animate title first
    productsTimeline.from('.products-reveal-title', {
        opacity: 0,
        y: 30,
        duration: 1
    });

    // Reveal cards one by one
    productsTimeline.to('.product-card', {
        opacity: 1,
        y: 0,
        stagger: 1.5,
        duration: 1,
        ease: 'power2.out'
    });

    // Project cards animation
    gsap.from('.project-card', {
        duration: 0.8,
        opacity: 0,
        y: 50,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.portfolio-section',
            start: 'top center',
            end: 'bottom center',
            once: true
        }
    });

    // Navigation animation
    gsap.from('.nav-links li', {
        duration: 0.5,
        opacity: 0,
        x: -20,
        stagger: 0.1,
        ease: 'power2.out'
    });

    // --- Services Section Animations ---

    // 1. Title Block SVG animation (delayed reveal) - Generic for all sections
    gsap.utils.toArray('.services-title-wrapper').forEach((wrapper) => {
        const icon = wrapper.querySelector('.title-block');
        if (icon) {
            gsap.from(icon, {
                scrollTrigger: {
                    trigger: wrapper,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                x: -30,
                rotation: -15,
                duration: 1.2,
                delay: 0.4,
                ease: 'power3.out'
            });
        }
    });

    // 2. Service Cards staggered animation
    gsap.fromTo('.service-card',
        {
            opacity: 0,
            y: 60
        },
        {
            scrollTrigger: {
                trigger: '.services-grid',
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out',
            clearProps: 'opacity,transform' // Protect hover transformations
        }
    );

    // --- Why Choose Us Section Animations ---
    gsap.to('.why-card', {
        scrollTrigger: {
            trigger: '.why-us-grid',
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    });
}
