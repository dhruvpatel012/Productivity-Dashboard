// ------- Todo List -------

document.addEventListener('DOMContentLoaded', () => {
  let todos = [];

  const todoForm = document.getElementById('todo-form');
  const todoList = document.getElementById('todo-list');
  const todoInput = document.getElementById('todo-input');
  const todoCount = document.getElementById('todo-count');
  const todoSummary = document.getElementById('todo-card-summary');

  // Load Todos from Local Storage
  function loadTodos() {
    const savedTodos = localStorage.getItem('prod-dashboard-todos');
    if (savedTodos) {
      todos = JSON.parse(savedTodos);
    } else {
      // Dummy tasks for display
      todos = [
        { id: Date.now(), text: 'Welcome to your Todo List!', completed: false, important: false },
        { id: Date.now() + 1, text: 'Click the star to mark important', completed: false, important: true }
      ];
      saveTodos();
    }
  }

  // Save Todos to Local Storage
  function saveTodos() {
    localStorage.setItem('prod-dashboard-todos', JSON.stringify(todos));
    updateTodoUI();
  }

  // Render list UI
  function updateTodoUI() {
    if (!todoList) return;
    todoList.innerHTML = '';
    let pendingCount = 0;

    todos.forEach(todo => {
      if (!todo.completed) pendingCount++;

      const li = document.createElement('li');
      li.className = `todo-item ${todo.completed ? 'completed' : ''} ${todo.important ? 'important' : ''}`;
      li.setAttribute('data-id', todo.id);

      li.innerHTML = `
        <div class="todo-item-left">
          <button class="checkbox-btn" aria-label="Toggle Complete">
            <i class="${todo.completed ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle'}"></i>
          </button>
          <span class="todo-text">${escapeHTML(todo.text)}</span>
        </div>
        <div class="todo-item-actions">
          <button class="action-btn star-btn" aria-label="Toggle Important">
            <i class="fa-solid fa-star"></i>
          </button>
          <button class="action-btn delete-btn" aria-label="Delete Task">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      `;

      todoList.appendChild(li);
    });

    if (todoCount) {
      todoCount.textContent = `${pendingCount} task${pendingCount === 1 ? '' : 's'} left`;
    }
    if (todoSummary) {
      todoSummary.textContent = pendingCount === 0 ? 'No pending tasks! 🎉' : `${pendingCount} active task${pendingCount === 1 ? '' : 's'}`;
    }
  }

  // Helper to escape HTML and prevent XSS
  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  // Add Task
  function addTodo() {
    if (!todoInput) return;
    const text = todoInput.value.trim();
    if (text === '') return;

    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false,
      important: false
    };

    todos.push(newTodo);
    saveTodos();
    todoInput.value = '';
  }

  // Event Delegation click handler
  function handleTodoListClick(e) {
    const button = e.target.closest('button');
    if (!button) return;

    const li = button.closest('.todo-item');
    if (!li) return;

    const id = parseInt(li.getAttribute('data-id'));
    const todoIndex = todos.findIndex(t => t.id === id);
    if (todoIndex === -1) return;

    if (button.classList.contains('checkbox-btn')) {
      todos[todoIndex].completed = !todos[todoIndex].completed;
      saveTodos();
    } else if (button.classList.contains('star-btn')) {
      todos[todoIndex].important = !todos[todoIndex].important;
      saveTodos();
    } else if (button.classList.contains('delete-btn')) {
      todos.splice(todoIndex, 1);
      saveTodos();
    }
  }

  // Bind Listeners
  if (todoForm) {
    todoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      addTodo();
    });
  }

  if (todoList) {
    todoList.addEventListener('click', handleTodoListClick);
  }

  loadTodos();
  updateTodoUI();
});
