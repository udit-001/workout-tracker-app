import "../css/style.css";
// Default preferences
const defaultPreferences = {
  defaultReps: 10,
  defaultSets: 3,
  defaultRestDuration: 60,
  restTimerSound: true
};

// Load preferences from localStorage
function loadPreferences() {
  const savedPreferences = localStorage.getItem('workoutPreferences');
  return savedPreferences ? JSON.parse(savedPreferences) : defaultPreferences;
}

// Save preferences to localStorage
function savePreferences(preferences) {
  localStorage.setItem('workoutPreferences', JSON.stringify(preferences));
}

// Initialize form with saved preferences
function initializeForm() {
  const preferences = loadPreferences();
  
  document.getElementById('defaultReps').value = preferences.defaultReps;
  document.getElementById('defaultSets').value = preferences.defaultSets;
  document.getElementById('defaultRestDuration').value = preferences.defaultRestDuration;
  document.getElementById('restTimerSound').checked = preferences.restTimerSound;
}

// Handle form submission
document.getElementById('preferencesForm').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const preferences = {
    defaultReps: parseInt(document.getElementById('defaultReps').value) || defaultPreferences.defaultReps,
    defaultSets: parseInt(document.getElementById('defaultSets').value) || defaultPreferences.defaultSets,
    defaultRestDuration: parseInt(document.getElementById('defaultRestDuration').value) || defaultPreferences.defaultRestDuration,
    restTimerSound: document.getElementById('restTimerSound').checked
  };
  
  savePreferences(preferences);
  
  // Show success message
  const button = e.target.querySelector('button[type="submit"]');
  const originalText = button.textContent;
  button.textContent = 'Saved!';
  button.classList.remove('bg-blue-500', 'hover:bg-blue-600');
  button.classList.add('bg-green-500', 'hover:bg-green-600');
  
  setTimeout(() => {
    button.textContent = originalText;
    button.classList.remove('bg-green-500', 'hover:bg-green-600');
    button.classList.add('bg-blue-500', 'hover:bg-blue-600');
  }, 2000);
});

// Initialize form when page loads
initializeForm(); 