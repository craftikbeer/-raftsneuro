// Custom cursor functionality - disabled on mobile
const initCustomCursor = () => {
  // Check if device is mobile/tablet
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                   window.innerWidth < 1024;
  
  const cursor = document.getElementById('custom-cursor');
  if (!cursor || isMobile) {
    if (cursor) cursor.style.display = 'none';
    return;
  }

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });

  const animate = () => {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    
    cursorX += dx * 0.15;
    cursorY += dy * 0.15;
    
    cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
    requestAnimationFrame(animate);
  };

  animate();

  // Scale cursor on interactive elements
  const interactives = 'a, button, [role="button"], input, textarea';
  document.addEventListener('mouseover', (e) => {
    if (e.target.matches(interactives)) {
      cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px) scale(1.5)`;
    }
  });
  
  document.addEventListener('mouseout', (e) => {
    if (e.target.matches(interactives)) {
      cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px) scale(1)`;
    }
  });
};

// Initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCustomCursor);
} else {
  initCustomCursor();
}
