// ============================= WHAT TO WEAR =============================

/**
 *  To be able to deploy on Vercel I put the apiKey in script.js BUT I also have it in a gitignore file for when I will have the Node.js knowledge to do it the right way. For now I just restricted the API key's use on openWeather.
 */
export const apiKey = "e0f94d68d28e8ace85f9c25d9bbcd0c5";

// _____________________________IMPORTS _____________________________
// Import geolocation functionality from separate module
import { sendCity } from "./js/geolocation.js";
// Import API rate limiting functionality from separate module
import { apiCallsHistory, showLimitReached } from "./js/api-limits.js";

// _____________________________INITIALIZATION _____________________________
/**
 * Hide result sections on page load to prevent empty containers from showing
 * before user makes their first search
 */
document.getElementById("resultSection").style.display = "none";
document.getElementById("iconSection").style.display = "none";

// _____________________________EVENT LISTENER _____________________________
/**
 * Submit search by the send button or enter key
 */
document
  .getElementById("buttonCity")
  .addEventListener("click", handleCityRequest);
document
  .getElementById("cityName")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      handleCityRequest();
    }
  });

// _____________________________TO SEND OR NOT TO SEND TO THE API? _____________________________
/**
 * Shakespearian logic:
 * 1. Checks if the user has exceeded API call limit (for now if the user refreshes the page the limit restarts)
 * 2. If limit reached => show warning message
 * 3. If limit not reached => proceed with geolocalisation script
 */
function handleCityRequest() {
  if (apiCallsHistory.length >= 10) {
    showLimitReached();
  } else {
    sendCity(apiCallsHistory);
  }
}
