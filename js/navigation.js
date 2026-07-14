// ==========================================
// ------- Dashboard Navigation -------
// ==========================================

// Global reference so other modules can force navigation if needed
let navigateToSection;

document.addEventListener('DOMContentLoaded', () => {
  const navCards = document.querySelectorAll('.nav-card');
  const backButtons = document.querySelectorAll('.back-btn');
  const allSections = document.querySelectorAll('.view-section');

  // Navigation Function: Show target section and hide others
  navigateToSection = function(targetId) {
    // Hide all sections first
    allSections.forEach(section => {
      section.classList.add('hidden');
    });

    // Show the target section
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.classList.remove('hidden');
    }
    
    // Trigger feature loaders when entering their view
    onSectionVisible(targetId);
  };

  // Route handler for section visibility (e.g. quote fetching)
  function onSectionVisible(sectionId) {
    if (sectionId === 'quote-view' && typeof loadQuote === 'function') {
      loadQuote();
    }
  }

  // Attach Event Listeners to Nav Cards
  navCards.forEach(card => {
    card.addEventListener('click', () => {
      const target = card.getAttribute('data-target');
      navigateToSection(target);
    });
  });

  // Attach Event Listeners to Back Buttons
  backButtons.forEach(button => {
    button.addEventListener('click', () => {
      navigateToSection('dashboard-view');
    });
  });
});
