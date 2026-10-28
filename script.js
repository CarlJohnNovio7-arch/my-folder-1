// Open and close the mobile navigation menu.
const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
  navLinks.classList.toggle('open', !isOpen);
});

// Close the mobile menu after someone chooses a section.
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation menu');
    navLinks.classList.remove('open');
  });
});

// Fade sections in as they enter the screen. Older browsers get a visible page.
const sectionsToReveal = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  sectionsToReveal.forEach((section) => revealObserver.observe(section));
} else {
  sectionsToReveal.forEach((section) => section.classList.add('is-visible'));
}

// Keep the footer year current without editing the HTML each January.
document.querySelector('#year').textContent = new Date().getFullYear();

// This starter form confirms the input locally. Add a form service to receive messages.
const contactForm = document.querySelector('#contact-form');
const formNote = document.querySelector('#form-note');
contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const senderName = document.querySelector('#name').value.trim();
  formNote.textContent = `Thanks, ${senderName}! Your message is ready. Connect a form service to deliver it to Alex.`;
  contactForm.reset();
});
