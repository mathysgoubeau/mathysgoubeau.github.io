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
