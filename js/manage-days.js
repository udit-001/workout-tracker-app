import '../css/style.css'

// Load workout days from localStorage
let workoutDays = JSON.parse(localStorage.getItem('workoutDays')) || [];

const daysList = document.getElementById('daysList');
const emptyState = document.getElementById('emptyState');
const newDayInput = document.getElementById('newDayInput');
const addDayButton = document.getElementById('addDayButton');
const errorMessage = document.getElementById('errorMessage');

// Disable add button initially
addDayButton.disabled = true;
addDayButton.classList.add('opacity-50', 'cursor-not-allowed');

// Add input event listener to enable/disable button and check for duplicates
newDayInput.addEventListener('input', () => {
  const newDay = newDayInput.value.trim();
  const hasText = newDay.length > 0;
  const isDuplicate = hasText && workoutDays.some(day => day.name.toLowerCase() === newDay.toLowerCase());
  
  addDayButton.disabled = !hasText || isDuplicate;
  
  if (addDayButton.disabled) {
    addDayButton.classList.add('opacity-50', 'cursor-not-allowed');
  } else {
    addDayButton.classList.remove('opacity-50', 'cursor-not-allowed');
  }

  // Show/hide error message
  if (isDuplicate) {
    errorMessage.textContent = 'A workout day with this name already exists';
    errorMessage.classList.remove('hidden');
  } else {
    errorMessage.classList.add('hidden');
  }
});

// Add new workout day
addDayButton.addEventListener('click', () => {
  const newDay = newDayInput.value.trim();
  if (!newDay) return;
  if (workoutDays.some(day => day.name.toLowerCase() === newDay.toLowerCase())) {
    return;
  }
  workoutDays.push({ name: newDay, exercises: [] });
  saveAndRender();
  newDayInput.value = '';
  // Disable button after adding
  addDayButton.disabled = true;
  addDayButton.classList.add('opacity-50', 'cursor-not-allowed');
  // Hide error message
  errorMessage.classList.add('hidden');
});

function renderDays() {
  daysList.innerHTML = '';
  if (workoutDays.length === 0) {
    emptyState.classList.remove('hidden');
    return;
  } else {
    emptyState.classList.add('hidden');
  }
  workoutDays.forEach((day, idx) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'flex flex-col sm:flex-row sm:items-center justify-between bg-white p-4 rounded shadow-sm border border-gray-100 gap-3';

    // Day name and exercise count
    const info = document.createElement('div');
    info.className = 'flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4';
    
    // Left side: Name and count
    const leftSide = document.createElement('div');
    leftSide.className = 'flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4';
    const name = document.createElement('span');
    name.textContent = day.name;
    name.className = 'font-semibold text-gray-700 editable-day text-lg sm:text-base';
    name.contentEditable = false;
    name.setAttribute('data-idx', idx);
    const count = document.createElement('span');
    count.textContent = `${day.exercises.length} exercise${day.exercises.length === 1 ? '' : 's'}`;
    count.className = 'text-gray-400 text-sm';
    leftSide.appendChild(name);
    leftSide.appendChild(count);
    info.appendChild(leftSide);

    // Right side: Action links
    const rightSide = document.createElement('div');
    rightSide.className = 'flex gap-3 text-sm';
    
    const addLink = document.createElement('a');
    addLink.href = `/add-exercise.html?day=${encodeURIComponent(day.name)}`;
    addLink.className = 'text-blue-600 hover:text-blue-800 px-2 py-1 rounded hover:bg-blue-50';
    addLink.textContent = 'Add';
    rightSide.appendChild(addLink);

    // Only show view link if there are exercises
    if (day.exercises.length > 0) {
      const viewLink = document.createElement('a');
      viewLink.href = `/workout.html?day=${idx}`;
      viewLink.className = 'text-blue-600 hover:text-blue-800 px-2 py-1 rounded hover:bg-blue-50';
      viewLink.textContent = 'View';
      rightSide.appendChild(viewLink);
    }

    info.appendChild(rightSide);

    // Edit and delete buttons
    const actions = document.createElement('div');
    actions.className = 'flex gap-2 sm:ml-4';
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'flex-1 sm:flex-none px-4 py-2 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 text-base font-medium';
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'flex-1 sm:flex-none px-4 py-2 rounded bg-red-100 text-red-700 hover:bg-red-200 text-base font-medium';
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    // Edit logic
    editBtn.addEventListener('click', () => {
      name.contentEditable = true;
      name.focus();
      name.classList.add('ring', 'ring-blue-200', 'px-2', 'py-1', 'rounded');
      // Select all text for easier editing
      const range = document.createRange();
      range.selectNodeContents(name);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    });

    name.addEventListener('blur', () => {
      name.contentEditable = false;
      name.classList.remove('ring', 'ring-blue-200', 'px-2', 'py-1', 'rounded');
      const newName = name.textContent.trim();
      if (newName && newName !== day.name) {
        // Prevent duplicate names
        if (workoutDays.some((d, i) => i !== idx && d.name.toLowerCase() === newName.toLowerCase())) {
          alert('A workout day with this name already exists.');
          name.textContent = day.name;
          return;
        }
        day.name = newName;
        saveAndRender();
      } else {
        name.textContent = day.name;
      }
    });

    name.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        name.blur();
      }
    });

    // Delete logic
    deleteBtn.addEventListener('click', () => {
      if (confirm(`Delete workout day "${day.name}" and all its exercises?`)) {
        workoutDays.splice(idx, 1);
        saveAndRender();
      }
    });

    wrapper.appendChild(info);
    wrapper.appendChild(actions);
    daysList.appendChild(wrapper);
  });
}

function saveAndRender() {
  localStorage.setItem('workoutDays', JSON.stringify(workoutDays));
  renderDays();
}

renderDays(); 