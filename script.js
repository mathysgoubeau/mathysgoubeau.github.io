/* ── BackgroundPaths ──────────────────────────────────────────── */
(function initBackgroundPaths() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const svg = document.querySelector('.hero-bg-paths');
    if (!svg) return;

    const NS = 'http://www.w3.org/2000/svg';
    const W = 1200, H = 800, COUNT = 36;

    for (let i = 0; i < COUNT; i++) {
        const startX = -W / 4 + i * (W / COUNT);
        const endX   =  W / 4 + i * (W / COUNT);
        const ctrlX  = (startX + endX) / 2;
        const d      = `M ${startX} ${H} Q ${ctrlX} ${H / 2} ${endX} 0`;

        const path = document.createElementNS(NS, 'path');
        path.setAttribute('d', d);
        path.style.setProperty('--bp-dur',   `${7 + (i % 5) * 1.5}s`);
        path.style.setProperty('--bp-delay', `${-(i * 0.55).toFixed(2)}s`);
        svg.appendChild(path);
    }
}());

/* ── GlowCard ─────────────────────────────────────────────────── */
(function initGlowCards() {
    if (window.matchMedia('(hover: none)').matches) return;

    document.querySelectorAll('.project-card').forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1);
            const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
            card.style.setProperty('--glow-x', `${x}%`);
            card.style.setProperty('--glow-y', `${y}%`);
            card.classList.add('glow-active');
        });

        card.addEventListener('mouseleave', () => {
            card.classList.remove('glow-active');
        });
    });
}());

/* ── Scroll reveal ────────────────────────────────────────────── */
const revealTargets = document.querySelectorAll(
    'section, .skill-card, .timeline-item, .project-card, .education-card, .contact-item'
);

revealTargets.forEach((element) => {
    element.setAttribute('data-reveal', '');
});

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px'
    }
);

revealTargets.forEach((element) => observer.observe(element));

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
        const target = document.querySelector(anchor.getAttribute('href'));

        if (!target) {
            return;
        }

        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

const updateActiveLink = () => {
    let currentId = '';

    sections.forEach((section) => {
        const top = section.offsetTop - 140;
        if (window.scrollY >= top) {
            currentId = section.id;
        }
    });

    navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
};

updateActiveLink();
window.addEventListener('scroll', updateActiveLink, { passive: true });

document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('click', (event) => {
        if (event.target.closest('a')) {
            return;
        }

        const link = card.querySelector('.project-links a');
        if (link?.href) {
            window.open(link.href, '_blank', 'noopener');
        }
    });

    card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            card.click();
        }
    });
});
