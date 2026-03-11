// ===== Custom Cursor =====
const cursor = document.getElementById("cursor");
const follower = document.getElementById("cursorFollower");
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

if (window.innerWidth > 768) {
    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX - 4 + "px";
        cursor.style.top = mouseY - 4 + "px";
    });

    function animateFollower() {
        followerX += (mouseX - followerX) * 0.12;
        followerY += (mouseY - followerY) * 0.12;
        follower.style.left = followerX - 18 + "px";
        follower.style.top = followerY - 18 + "px";
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    document.querySelectorAll("a, button, .tilt-card, .magnetic").forEach((el) => {
        el.addEventListener("mouseenter", () => {
            cursor.classList.add("hover");
            follower.classList.add("hover");
        });
        el.addEventListener("mouseleave", () => {
            cursor.classList.remove("hover");
            follower.classList.remove("hover");
        });
    });
}

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
            setTimeout(typeEffect, 2500);
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
    setTimeout(typeEffect, isDeleting ? 35 : 75);
}

document.addEventListener("DOMContentLoaded", () => setTimeout(typeEffect, 800));

// ===== Navbar: Hide on scroll down, show on scroll up =====
const navbar = document.getElementById("navbar");
let lastScroll = 0;
let ticking = false;

window.addEventListener("scroll", () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            const currentScroll = window.scrollY;
            navbar.classList.toggle("scrolled", currentScroll > 50);

            if (currentScroll > lastScroll && currentScroll > 200) {
                navbar.classList.add("hidden");
            } else {
                navbar.classList.remove("hidden");
            }
            lastScroll = currentScroll;
            ticking = false;
        });
        ticking = true;
    }
});

// ===== Mobile Nav Toggle =====
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.body.style.overflow = navMenu.classList.contains("active") ? "hidden" : "";
});

document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
        navToggle.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.style.overflow = "";
    });
});

// ===== Active Nav Link =====
const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
    const scrollY = window.scrollY + 120;
    sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute("id");
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) {
            link.classList.toggle("active", scrollY >= top && scrollY < top + height);
        }
    });
});

// ===== Scroll Reveal Animations =====
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
);

document.addEventListener("DOMContentLoaded", () => {
    const revealElements = document.querySelectorAll(
        ".section-header, .about-text p, .terminal-card, .skill-category, .cert-card, .project-card, .contact-text, .contact-card, .hero-stats"
    );
    revealElements.forEach((el, i) => {
        el.classList.add("reveal");
        el.style.transitionDelay = `${(i % 6) * 0.08}s`;
        revealObserver.observe(el);
    });
});

// ===== Counter Animation =====
function animateCounters() {
    document.querySelectorAll(".stat-number").forEach((counter) => {
        const target = parseInt(counter.dataset.count);
        const duration = 1500;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            counter.textContent = Math.round(target * ease);
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    });
}

const statsObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.5 }
);

document.addEventListener("DOMContentLoaded", () => {
    const stats = document.querySelector(".hero-stats");
    if (stats) statsObserver.observe(stats);
});

// ===== Tilt Effect on Cards =====
document.querySelectorAll(".tilt-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * -4;
        const rotateY = (x - centerX) / centerX * 4;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;

        const glow = card.querySelector(".skill-card-glow");
        if (glow) {
            glow.style.left = x + "px";
            glow.style.top = y + "px";
            glow.style.opacity = "1";
        }
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "";
        card.style.transition = "transform 0.5s ease";
        const glow = card.querySelector(".skill-card-glow");
        if (glow) glow.style.opacity = "0";
        setTimeout(() => (card.style.transition = ""), 500);
    });
});

// ===== Magnetic Buttons =====
document.querySelectorAll(".magnetic").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    btn.addEventListener("mouseleave", () => {
        btn.style.transform = "";
        btn.style.transition = "transform 0.4s ease";
        setTimeout(() => (btn.style.transition = ""), 400);
    });
});

// ===== Hero Canvas: Connected Particles =====
const canvas = document.getElementById("heroCanvas");
if (canvas) {
    const ctx = canvas.getContext("2d");
    let particles = [];
    const particleCount = 60;
    const maxDist = 120;

    function resizeCanvas() {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.size = Math.random() * 2 + 0.5;
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < maxDist) {
                    const opacity = (1 - dist / maxDist) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
}

// ===== Back to Top Button =====
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 500);
});
backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
