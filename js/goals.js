// ------- Daily Goals -------

document.addEventListener('DOMContentLoaded', () => {
  let goals = [];

  const goalsForm = document.getElementById('goals-form');
  const goalsList = document.getElementById('goals-list');
  const goalsInput = document.getElementById('goals-input');
  const progressText = document.getElementById('goals-progress-text');
  const progressPercent = document.getElementById('goals-progress-percent');
  const progressFillFull = document.getElementById('goals-progress-bar-fill-full');
  const progressFillMini = document.getElementById('goals-progress-bar-fill');
  const goalsSummaryText = document.getElementById('goals-card-summary');

  // Load goals from Local Storage
  function loadGoals() {
    const savedGoals = localStorage.getItem('prod-dashboard-goals');
    if (savedGoals) {
      goals = JSON.parse(savedGoals);
    } else {
      // Dummy initial goals
      goals = [
        { id: Date.now(), text: 'Complete dashboard layout', completed: true },
        { id: Date.now() + 1, text: 'Review Pomodoro timer section', completed: false }
      ];
      saveGoals();
    }
  }

  // Save goals to Local Storage
  function saveGoals() {
    localStorage.setItem('prod-dashboard-goals', JSON.stringify(goals));
    updateGoalsUI();
  }

  // Render Goals UI (Main Page and Dashboard Widget Card)
  function updateGoalsUI() {
    if (!goalsList) return;
    goalsList.innerHTML = '';
    let completedCount = 0;
    const totalCount = goals.length;

    goals.forEach(goal => {
      if (goal.completed) completedCount++;

      const li = document.createElement('li');
      li.className = `todo-item goal-item ${goal.completed ? 'completed' : ''}`;
      li.setAttribute('data-id', goal.id);

      li.innerHTML = `
        <div class="todo-item-left">
          <button class="checkbox-btn" aria-label="Toggle Complete">
            <i class="${goal.completed ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle'}"></i>
          </button>
          <span class="todo-text">${escapeHTML(goal.text)}</span>
        </div>
        <div class="todo-item-actions">
          <button class="action-btn delete-btn" aria-label="Delete Goal">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      `;

      goalsList.appendChild(li);
    });

    const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    if (progressText) {
      progressText.textContent = `${completedCount} of ${totalCount} completed`;
    }
    if (progressPercent) {
      progressPercent.textContent = `${percent}%`;
    }
    if (progressFillFull) {
      progressFillFull.style.width = `${percent}%`;
    }
    if (progressFillMini) {
      progressFillMini.style.width = `${percent}%`;
    }
    if (goalsSummaryText) {
      goalsSummaryText.textContent = totalCount === 0 ? 'Set today\'s targets' : `${completedCount} of ${totalCount} goals completed`;
    }
  }

  // Helper to escape HTML and prevent XSS
  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  // Add Goal
  function addGoal() {
    if (!goalsInput) return;
    const text = goalsInput.value.trim();
    if (text === '') return;

    const newGoal = {
      id: Date.now(),
      text: text,
      completed: false
    };

    goals.push(newGoal);
    saveGoals();
    goalsInput.value = '';
  }

  // Event Delegation for Goals list click
  function handleGoalsListClick(e) {
    const button = e.target.closest('button');
    if (!button) return;

    const li = button.closest('.todo-item');
    if (!li) return;

    const id = parseInt(li.getAttribute('data-id'));
    const goalIndex = goals.findIndex(g => g.id === id);
    if (goalIndex === -1) return;

    if (button.classList.contains('checkbox-btn')) {
      goals[goalIndex].completed = !goals[goalIndex].completed;
      saveGoals();
    } else if (button.classList.contains('delete-btn')) {
      goals.splice(goalIndex, 1);
      saveGoals();
    }
  }

  // Bind Listeners
  if (goalsForm) {
    goalsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      addGoal();
    });
  }

  if (goalsList) {
    goalsList.addEventListener('click', handleGoalsListClick);
  }

  loadGoals();
  updateGoalsUI();
});
