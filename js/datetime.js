// ==========================================
// ------- Date & Time Display -------
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  const clockTime = document.getElementById('clock-time');
  const clockDate = document.getElementById('clock-date');

  // Update Clock Display every second
  function updateClock() {
    const now = new Date();
    
    // Format Time: HH:MM:SS AM/PM
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
    const formattedHours = String(hours).padStart(2, '0');
    
    if (clockTime) {
      clockTime.textContent = `${formattedHours}:${minutes}:${seconds} ${ampm}`;
    }
    
    // Format Date: Day, DD Month YYYY (e.g. Tuesday, 14 July 2026)
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    if (clockDate) {
      clockDate.textContent = now.toLocaleDateString('en-US', options);
    }
    
    // Call background updater (globally declared in background.js)
    if (typeof updateDynamicBackground === 'function') {
      updateDynamicBackground(now.getHours());
    }
  }

  // Start clock interval
  function initClock() {
    updateClock(); // Run immediately on load
    setInterval(updateClock, 1000);
  }

  initClock();
});
