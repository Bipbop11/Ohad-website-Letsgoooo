// ===== Mobile menu (works on every page) =====
const openButton = document.getElementById('openMenuBtn');
const closeButton = document.getElementById('closeMenuBtn');
const menu = document.getElementById('navMenu');

function openMenu() {
    menu.classList.add('open');
    document.body.classList.add('menu-open');
}

function closeMenu() {
    menu.classList.remove('open');
    document.body.classList.remove('menu-open');
}

openButton.addEventListener('click', openMenu);
closeButton.addEventListener('click', closeMenu);

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeMenu();
    }
});

// Highlight the link of the current page ("contact" and "contact.html" both match)
const pageName = (path) => path.split('/').pop().replace('.html', '') || 'index';
const currentPage = pageName(window.location.pathname);

menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
    if (pageName(link.getAttribute('href')) === currentPage) {
        link.setAttribute('aria-current', 'page');
    }
});

// ===== Testimonials marquee (home page) =====
// Duplicate the cards so the scrolling loops seamlessly.
// Users who prefer reduced motion get a static wrapped row instead.
const testimonialsTrack = document.getElementById('testimonialsTrack');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (testimonialsTrack && !reduceMotion) {
    [...testimonialsTrack.children].forEach((card) => {
        const clone = card.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        testimonialsTrack.appendChild(clone);
    });
    testimonialsTrack.parentElement.classList.add('is-animated');
}

// ===== Contact form (contact page) =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    const formMessage = document.getElementById('formMessage');

    // The browser only fires "submit" after all required fields are valid
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const firstName = contactForm.elements.firstName.value.trim();
        formMessage.textContent = 'תודה ' + firstName + '! הפרטים התקבלו, אחזור אליך בהקדם.';
        formMessage.hidden = false;
        contactForm.reset();
    });
}
