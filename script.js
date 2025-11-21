document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');

        // Animate Links
        links.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // Close mobile menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.service-card, .about-content, .contact-info, .contact-form');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });

    // Add class for animation when observed
    // Note: We need to modify the CSS slightly to handle the JS-driven animation if we want to reuse 'animate-up' class logic
    // or just manually set styles here.
    // Let's refine the observer callback to match the CSS class logic better.

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => scrollObserver.observe(el));

    // Form Submission
    const form = document.querySelector('.contact-form');
    const modal = document.getElementById('success-modal');
    const closeModal = document.querySelector('.close-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');

    function showModal() {
        modal.classList.add('show');
    }

    function hideModal() {
        modal.classList.remove('show');
    }

    if (closeModal) closeModal.addEventListener('click', hideModal);
    if (closeModalBtn) closeModalBtn.addEventListener('click', hideModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) hideModal();
    });

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;

            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            try {
                const response = await fetch('https://formsubmit.co/ajax/ssabishek.sachu@gmail.com', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();
                console.log('FormSubmit Response:', result);

                if (response.ok) {
                    // Show success modal
                    showModal();
                    form.reset();
                } else {
                    console.error('FormSubmit Error:', result);
                    alert('Something went wrong. Please try again.');
                }
            } catch (error) {
                console.error('Fetch Error:', error);
                alert('Something went wrong. Please try again.');
            } finally {
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});
