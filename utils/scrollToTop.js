// Scroll to top button functionality
const initScrollToTop = () => {
  const button = document.getElementById('scroll-to-top');
  if (!button) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      button.style.display = 'flex';
    } else {
      button.style.display = 'none';
    }
  });

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  button.addEventListener('mouseenter', () => {
    button.style.transform = 'scale(1.1)';
    button.style.background = 'rgba(255,255,255,0.2)';
  });

  button.addEventListener('mouseleave', () => {
    button.style.transform = 'scale(1)';
    button.style.background = 'rgba(255,255,255,0.1)';
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollToTop);
} else {
  initScrollToTop();
}