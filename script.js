// script.js

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Sticky Header ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 2. Dark/Light Mode Toggle ---
    const themeToggle = document.getElementById('checkbox');
    const body = document.body;

    // Function to set the theme
    const setTheme = (isDark) => {
        if (isDark) {
            body.classList.add('dark-mode');
            themeToggle.checked = true;
        } else {
            body.classList.remove('dark-mode');
            themeToggle.checked = false;
        }
    };

    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme === 'dark');
    } else {
        // Or check for user's system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark);
    }

    // Add event listener for the toggle
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });

    // --- 3. Mobile Navigation Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Simple hamburger to 'X' animation
        hamburger.classList.toggle('is-active');
    });

    // Close mobile nav when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('is-active');
            }
        });
    });

    // --- 4. Active Link Highlighting on Scroll ---
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('#navbar .nav-links li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').substring(1) === current) {
                a.classList.add('active');
            }
        });
    });

    // --- 5. Scroll-to-Top Button ---
    const scrollToTopBtn = document.querySelector('.scroll-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    // --- 6. Scroll Reveal Animations ---
    const scrollTargets = document.querySelectorAll('.scroll-target');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, {
        root: null, // viewport
        threshold: 0.1 // 10% of the item must be visible
    });

    scrollTargets.forEach(target => {
        observer.observe(target);
    });
    
    // --- 7. Contact Form ---
    // This is a basic setup. For a real form, you'd use a service like Formspree or a backend.
    // The HTML form's 'action' attribute is set up for Formspree. You just need to create an
    // account and replace 'your_form_id' with your actual Formspree form ID.
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', function(e) {
        // You can add validation logic here if you want before submission.
        // For now, we'll just let it submit to Formspree.
        console.log('Form submitted!');
    });


});
