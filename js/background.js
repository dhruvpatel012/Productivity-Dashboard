// ==========================================
// ------- Dynamic Background -------
// ==========================================

// Apply background class based on hour (Declared globally so datetime.js can access it)
function updateDynamicBackground(hour) {
  const body = document.body;
  let timeClass = 'time-morning';
  let greeting = 'Good morning!';

  if (hour >= 5 && hour < 11) {
    timeClass = 'time-morning';
    greeting = 'Good morning!';
  } else if (hour >= 11 && hour < 17) {
    timeClass = 'time-afternoon';
    greeting = 'Good afternoon!';
  } else if (hour >= 17 && hour < 21) {
    timeClass = 'time-evening';
    greeting = 'Good evening!';
  } else {
    timeClass = 'time-night';
    greeting = 'Good night!';
  }

  // Update body class if it changed to prevent unnecessary repaints
  if (body && !body.classList.contains(timeClass)) {
    body.classList.remove('time-morning', 'time-afternoon', 'time-evening', 'time-night');
    body.classList.add(timeClass);
  }
  
  // Update welcome banner text if exists
  const greetingMsg = document.getElementById('greeting-message');
  if (greetingMsg) {
    greetingMsg.textContent = `${greeting} Ready to seize the day?`;
  }
}
