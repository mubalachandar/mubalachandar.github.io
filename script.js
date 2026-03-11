// ===== Typing Effect =====
const typingTexts = [
    "Cloud Security Engineer",
    "AWS Security Specialist",
    "Infrastructure Protector",
    "IAM Policy Architect"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById("typingText");

function typeEffect() {
    const currentText = typingTexts[textIndex];

    if (!isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
            return;
        }
    } else {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typingTexts.length;
        }
    }

    const speed = isDeleting ? 40 : 80;
    setTimeout(typeEffect, speed);
}

document.addEventListener("DOMContentLoaded", () => {
    typeEffect();
});

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById("navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
    lastScroll = currentScroll;
});

// ===== Mobile Nav Toggle =====
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Close mobile menu on link click
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        navToggle.classList.remove("active");
        navMenu.classList.remove("active");
    });
});

// ===== Scroll Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply fade-in to elements
document.addEventListener("DOMContentLoaded", () => {
    const animateElements = document.querySelectorAll(
        ".about-text p, .terminal-card, .skill-category, .cert-card, .project-card, .contact-card, .contact-text"
    );
    animateElements.forEach((el, index) => {
        el.classList.add("fade-in");
        el.style.transitionDelay = `${index * 0.08}s`;
        observer.observe(el);
    });
});

// ===== Floating Particles =====
function createParticles() {
    const container = document.getElementById("particles");
    if (!container) return;

    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: ${Math.random() > 0.5 ? 'rgba(0, 212, 255, 0.3)' : 'rgba(124, 58, 237, 0.3)'};
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${Math.random() * 6 + 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 4}s;
        `;
        container.appendChild(particle);
    }
}

// Add float animation dynamically
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    @keyframes float {
        0%, 100% { transform: translate(0, 0); opacity: 0.3; }
        25% { transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px); opacity: 0.8; }
        50% { transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px); opacity: 0.5; }
        75% { transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px); opacity: 0.7; }
    }
`;
document.head.appendChild(styleSheet);

document.addEventListener("DOMContentLoaded", createParticles);

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLink.style.color = "var(--accent)";
            } else {
                navLink.style.color = "";
            }
        }
    });
});
