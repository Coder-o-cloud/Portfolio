// Initialize Vanta.js 3D Background
VANTA.WAVES({
    el: "#vanta-bg",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x1a1a2e,
    shininess: 30.00,
    waveHeight: 15.00,
    waveSpeed: 0.75,
    zoom: 0.75
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = navLinks.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : 'none';
    spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navLinks.classList.contains('active') ? 'rotate(-45deg) translate(7px, -6px)' : 'none';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.skill-category, .project-card, .timeline-item').forEach(el => {
    observer.observe(el);
});

// Form submission handler
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form button
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        submitBtn.textContent = 'Message Sent! ✓';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        // Reset form
        e.target.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    }, 1500);
});

// Typing animation for hero section
const typingText = document.querySelector('.typing-text');
const text = 'Full Stack Developer';
let index = 0;
let isDeleting = false;

function type() {
    if (!isDeleting && index < text.length) {
        typingText.textContent = text.substring(0, index + 1);
        index++;
        setTimeout(type, 100);
    } else if (!isDeleting && index === text.length) {
        setTimeout(() => {
            isDeleting = true;
            type();
        }, 2000);
    } else if (isDeleting && index > 0) {
        typingText.textContent = text.substring(0, index - 1);
        index--;
        setTimeout(type, 50);
    } else if (isDeleting && index === 0) {
        isDeleting = false;
        setTimeout(type, 500);
    }
}

// Start typing animation
type();

// Particle cursor effect
let particles = [];
const maxParticles = 50;

document.addEventListener('mousemove', (e) => {
    if (particles.length < maxParticles) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.borderRadius = '50%';
        particle.style.background = `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 255, 0.6)`;
        particle.style.pointerEvents = 'none';
        particle.style.left = e.clientX + 'px';
        particle.style.top = e.clientY + 'px';
        particle.style.zIndex = '9999';
        particle.style.transition = 'all 0.5s ease-out';
        
        document.body.appendChild(particle);
        particles.push(particle);

        setTimeout(() => {
            particle.style.opacity = '0';
            particle.style.transform = 'scale(0)';
        }, 10);

        setTimeout(() => {
            particle.remove();
            particles = particles.filter(p => p !== particle);
        }, 500);
    }
});

// Scroll progress indicator
const createScrollIndicator = () => {
    const indicator = document.createElement('div');
    indicator.style.position = 'fixed';
    indicator.style.top = '0';
    indicator.style.left = '0';
    indicator.style.height = '3px';
    indicator.style.background = 'linear-gradient(90deg, var(--primary-color), var(--accent))';
    indicator.style.zIndex = '10000';
    indicator.style.transition = 'width 0.1s ease';
    document.body.appendChild(indicator);
    
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        indicator.style.width = scrollPercent + '%';
    });
};

createScrollIndicator();

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('.section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Console message
console.log('%c👋 Hello! Welcome to my portfolio', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%c🚀 Built with passion using HTML, CSS, and JavaScript', 'color: #22d3ee; font-size: 14px;');
console.log('%c💼 Looking for opportunities? Let\'s connect!', 'color: #8b5cf6; font-size: 14px;');
