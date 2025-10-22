// Preloader functionality - Simplified version with guaranteed hide
const initPreloader = () => {
  const preloader = document.getElementById('preloader');
  if (!preloader) {
    console.log('Preloader element not found');
    return;
  }

  let loaded = false;

  const hidePreloader = () => {
    if (loaded) return;
    loaded = true;
    
    console.log('Hiding preloader...');
    preloader.classList.add('hidden');
    setTimeout(() => {
      preloader.style.display = 'none';
      console.log('Preloader hidden successfully');
    }, 500);
  };

  // Primary: Hide on window load
  window.addEventListener('load', () => {
    console.log('Window loaded - hiding preloader in 800ms');
    setTimeout(hidePreloader, 800);
  });

  // Backup 1: Hide on DOMContentLoaded
  if (document.readyState === 'complete') {
    console.log('Document already complete - hiding preloader');
    setTimeout(hidePreloader, 500);
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      console.log('DOM loaded - hiding preloader in 1s');
      setTimeout(hidePreloader, 1000);
    });
  }

  // Backup 2: Force hide after 4 seconds (reduced from 5)
  setTimeout(() => {
    if (!loaded) {
      console.warn('Force hiding preloader after 4s timeout');
      hidePreloader();
    }
  }, 4000);

  // Backup 3: Emergency hide after 6 seconds
  setTimeout(() => {
    if (preloader && preloader.style.display !== 'none') {
      console.error('Emergency preloader hide after 6s');
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 300);
    }
  }, 6000);
};

// Initialize immediately
console.log('Initializing preloader...');
initPreloader();
