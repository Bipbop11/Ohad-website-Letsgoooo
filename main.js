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
    const submitButton = contactForm.querySelector('button[type="submit"]');

    function showMessage(text, isError) {
        formMessage.textContent = text;
        formMessage.classList.toggle('is-error', isError);
        formMessage.hidden = false;
    }

    // The browser only fires "submit" after all required fields are valid.
    // Send the data to Web3Forms with fetch so the page doesn't reload.
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const firstName = contactForm.elements.firstName.value.trim();
        const data = Object.fromEntries(new FormData(contactForm));

        submitButton.disabled = true;
        submitButton.textContent = 'שולח...';
        formMessage.hidden = true;

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.message);
            }

            showMessage('תודה ' + firstName + '! הפרטים התקבלו, אחזור אליך בהקדם.', false);
            contactForm.reset();
        } catch (error) {
            console.error('Contact form error:', error);
            showMessage('אופס, משהו השתבש בשליחה. נסו שוב בעוד רגע.', true);
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'שליחה';
        }
    });
}
