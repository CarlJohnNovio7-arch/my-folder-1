// Hide the welcome screen when the page has loaded, with a short fallback timer.
const pageLoader = document.querySelector('#page-loader');
let loaderWasHidden = false;
function hidePageLoader() {
  if (loaderWasHidden || !pageLoader) return;
  loaderWasHidden = true;
  pageLoader.classList.add('is-hidden');
  window.setTimeout(() => { pageLoader.hidden = true; }, 500);
}
window.addEventListener('load', hidePageLoader, { once: true });
window.setTimeout(hidePageLoader, 5000);
// Mobile menu: the button controls whether the small-screen links are visible.
const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
  navLinks.classList.toggle('is-open', !isOpen);
});

// Close the menu after choosing a link, which is especially handy on phones.
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation menu');
    navLinks.classList.remove('is-open');
  });
});

// Reveal sections as they enter view. The fallback supports older browsers.
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

// This demo form uses the visitor's email app, so it needs no server.
const contactForm = document.querySelector('#contact-form');
const formNote = document.querySelector('#form-note');
contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = formData.get('name').trim();
  const email = formData.get('email').trim();
  const message = formData.get('message').trim();
  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`Hi Carl,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`);
  formNote.textContent = 'Opening your email app…';
  window.location.href = `mailto:noviocarljohn7@gmail.com?subject=${subject}&body=${body}`;
});

// Memory Match: reveal two cards at a time and keep track of moves.
const memoryGrid = document.querySelector('#memory-grid');
const memoryCards = Array.from(memoryGrid.querySelectorAll('.memory-card'));
const memoryStatus = document.querySelector('#memory-status');
const memoryMovesLabel = document.querySelector('#memory-moves');
let memoryValues = [];
let firstCard = null;
let lockedBoard = false;
let moves = 0;
let matchedPairs = 0;

function startMemoryGame() {
  memoryValues = ['🌱', '🎨', '🌱', '🎨'].sort(() => Math.random() - 0.5);
  firstCard = null;
  lockedBoard = false;
  moves = 0;
  matchedPairs = 0;
  memoryStatus.textContent = 'Find the matching pairs.';
  memoryMovesLabel.textContent = 'Moves: 0';
  memoryCards.forEach((card) => {
    card.textContent = '?';
    card.classList.remove('is-revealed', 'is-matched');
    card.setAttribute('aria-label', 'Hidden card');
    card.disabled = false;
  });
}

memoryCards.forEach((card, index) => {
  card.addEventListener('click', () => {
    if (lockedBoard || card.classList.contains('is-revealed') || card.classList.contains('is-matched')) return;
    card.textContent = memoryValues[index];
    card.classList.add('is-revealed');
    card.setAttribute('aria-label', `Revealed ${memoryValues[index]}`);
    if (!firstCard) {
      firstCard = card;
      return;
    }
    moves += 1;
    memoryMovesLabel.textContent = `Moves: ${moves}`;
    if (firstCard.textContent === card.textContent) {
      firstCard.classList.add('is-matched');
      card.classList.add('is-matched');
      firstCard.disabled = true;
      card.disabled = true;
      firstCard = null;
      matchedPairs += 1;
      if (matchedPairs === 2) memoryStatus.textContent = `You found them all in ${moves} moves!`;
    } else {
      lockedBoard = true;
      memoryStatus.textContent = 'Not a match—try again.';
      window.setTimeout(() => {
        [firstCard, card].forEach((item) => {
          item.textContent = '?';
          item.classList.remove('is-revealed');
          item.setAttribute('aria-label', 'Hidden card');
        });
        firstCard = null;
        lockedBoard = false;
        memoryStatus.textContent = 'Find the matching pairs.';
      }, 750);
    }
  });
});
document.querySelector('#memory-reset').addEventListener('click', startMemoryGame);
startMemoryGame();

// Quick Math: submit an answer to earn a point and get a new question.
const mathForm = document.querySelector('#math-form');
const mathAnswer = document.querySelector('#math-answer');
const mathQuestion = document.querySelector('#math-question');
const mathStatus = document.querySelector('#math-status');
const mathScoreLabel = document.querySelector('#math-score');
let correctAnswer = 0;
let mathScore = 0;
function nextMathQuestion() {
  const firstNumber = Math.floor(Math.random() * 10) + 1;
  const secondNumber = Math.floor(Math.random() * 10) + 1;
  correctAnswer = firstNumber + secondNumber;
  mathQuestion.textContent = `${firstNumber} + ${secondNumber} = ?`;
  mathAnswer.value = '';
}
mathForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (Number(mathAnswer.value) === correctAnswer) {
    mathScore += 1;
    mathStatus.textContent = 'Correct! Here comes another.';
    mathScoreLabel.textContent = `Score: ${mathScore}`;
  } else {
    mathStatus.textContent = 'Not quite—try the next one!';
  }
  nextMathQuestion();
});
nextMathQuestion();




