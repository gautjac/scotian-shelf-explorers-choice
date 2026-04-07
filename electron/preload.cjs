// Preload script for kiosk security
// Runs in renderer context before page loads

window.addEventListener('DOMContentLoaded', () => {
  // Prevent pinch-to-zoom on touchscreens
  document.addEventListener('touchstart', (e) => {
    if (e.touches.length > 1) {
      e.preventDefault();
    }
  }, { passive: false });

  // Prevent gesture-based zoom
  document.addEventListener('gesturestart', (e) => {
    e.preventDefault();
  });
  document.addEventListener('gesturechange', (e) => {
    e.preventDefault();
  });
  document.addEventListener('gestureend', (e) => {
    e.preventDefault();
  });
});
