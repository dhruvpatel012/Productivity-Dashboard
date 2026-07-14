// ==========================================
// ------- Theme Switch & Local Storage -------
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');

  // Initialize Theme from Local Storage or default to Dark
  function initTheme() {
    const savedTheme = localStorage.getItem('prod-dashboard-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  // Toggle Theme function
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('prod-dashboard-theme', newTheme);
  }

  // Attach Theme Listener
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  // Run immediately
  initTheme();
});
