// Reveal animations on scroll
const fadeElements = document.querySelectorAll('.fade-up');

window.addEventListener('scroll', () => {
  fadeElements.forEach(el => {
    const position = el.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    if (position < screenHeight - 100) {
      el.classList.add('show');
    }
  });
});
