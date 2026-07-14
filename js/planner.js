// ------- Daily Planner -------

document.addEventListener('DOMContentLoaded', () => {
  const plannerHours = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]; // 7 AM to 10 PM
  let plannerData = {};

  const slotsContainer = document.getElementById('planner-slots');
  const summaryText = document.getElementById('planner-card-summary');

  // Load planner slots from Local Storage
  function loadPlanner() {
    const savedPlanner = localStorage.getItem('prod-dashboard-planner');
    if (savedPlanner) {
      plannerData = JSON.parse(savedPlanner);
    } else {
      plannerData = {};
    }
  }

  // Save planner slots to Local Storage
  function savePlanner() {
    localStorage.setItem('prod-dashboard-planner', JSON.stringify(plannerData));
    updatePlannerDashboardSummary();
  }

  // Format hour digit for display
  function formatPlannerTime(hour) {
    const ampm = hour >= 12 ? 'PM' : 'AM';
    let formattedHour = hour % 12;
    formattedHour = formattedHour ? formattedHour : 12;
    return `${String(formattedHour).padStart(2, '0')}:00 ${ampm}`;
  }

  // Build list of inputs for hours
  function buildPlannerUI() {
    if (!slotsContainer) return;
    slotsContainer.innerHTML = '';
    const currentHour = new Date().getHours();

    plannerHours.forEach(hour => {
      const slotDiv = document.createElement('div');
      slotDiv.className = `planner-slot ${hour === currentHour ? 'current-hour' : ''}`;
      
      const timeLabel = document.createElement('div');
      timeLabel.className = 'planner-time';
      timeLabel.textContent = formatPlannerTime(hour);

      const inputArea = document.createElement('textarea');
      inputArea.className = 'planner-input';
      inputArea.placeholder = 'Add a plan...';
      inputArea.rows = 1;
      inputArea.value = plannerData[hour] || '';
      
      // Save on typing
      inputArea.addEventListener('input', (e) => {
        const text = e.target.value;
        if (text.trim() === '') {
          delete plannerData[hour];
        } else {
          plannerData[hour] = text;
        }
        savePlanner();
      });

      slotDiv.appendChild(timeLabel);
      slotDiv.appendChild(inputArea);
      slotsContainer.appendChild(slotDiv);
    });
  }

  // Update the summary card on the Bento Grid
  function updatePlannerDashboardSummary() {
    if (!summaryText) return;

    const currentHour = new Date().getHours();
    let nextHour = -1;
    let nextPlan = '';

    // Look for the next plan starting from the current hour
    for (let i = 0; i < plannerHours.length; i++) {
      const hour = plannerHours[i];
      if (hour >= currentHour && plannerData[hour]) {
        nextHour = hour;
        nextPlan = plannerData[hour];
        break;
      }
    }

    if (nextHour !== -1) {
      const timeStr = formatPlannerTime(nextHour);
      summaryText.textContent = `Next: ${timeStr} - ${nextPlan}`;
    } else {
      const activeHours = Object.keys(plannerData);
      if (activeHours.length > 0) {
        summaryText.textContent = `${activeHours.length} hour-block${activeHours.length === 1 ? '' : 's'} scheduled`;
      } else {
        summaryText.textContent = 'No hourly slots booked';
      }
    }
  }

  // Initialize
  loadPlanner();
  buildPlannerUI();
  updatePlannerDashboardSummary();
});
