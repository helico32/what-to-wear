/**
 * ==================== API RATE LIMITING MODULE =====================
 * Manages and enforces API usage limits to prevent quota exhaustion
 *
 * Logic:
 * 1. Tracks the number of API calls made during the session
 * 2. Enforces a daily limit of 10 weather API requests per user
 * 3. Provides user-friendly messaging when limits are exceeded
 *
 * In the future: May add backend storage and a historic of last viewed locations
 */

//Limitation: Resets when user refreshes page because of the state of my current knowledge
export let apiCallsHistory = [];

//___________________LIMIT REACHED DISPLAY____________________
export function showLimitReached() {
  // Hide other sections
  document.getElementById("resultSection").style.display = "none";
  document.getElementById("iconSection").style.display = "none";

  // Error message of daily limit & clear input field
  const errorMessage = document.getElementById("errorMessage");
  errorMessage.textContent =
    "⚠️ You reached the daily limit. Please try again later.";
  errorMessage.style.display = "block";
  errorMessage.style.opacity = "1";
  const cityNameInput = document.getElementById("cityName");
  cityNameInput.value = ""; // Clear the field
}
