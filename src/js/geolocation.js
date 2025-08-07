/**
 * ============================= GEOLOCATION MODULE ==========================
 * Converts city names into geographic coordinates (latitude/longitude)
 */

// ____________________ IMPORTS ___________________________
import { apiKey } from "../script.js";
import { getWeather } from "./get-weather.js"; // Weather data fetching module

// ____________________ API ENDPOINT ___________________________
const urlForCity = "https://api.openweathermap.org/geo/1.0/direct?";

// ____________________ GEOLOCALISATION FUNCTION ___________________________
/**
 * Logic:
 * 1. Get city name from user input field
 * 2. Build API request URL with city name and API key
 * 3. Make API call to OpenWeather Geolocalisation API
 * 4. Extract latitude/longitude from response
 * 5. Update API call history for rate limit
 * 6. Pass coordinates to weather module
 */

export function sendCity(apiCallsHistory) {
  // Gets trim input from city name field in HTML
  const cityNameInput = document.getElementById("cityName");
  const cityNameTrim = cityNameInput.value.trim();
  const errorMessage = document.getElementById("errorMessage");

  if (cityNameTrim === "" || cityNameTrim.length === 0) {
    document.getElementById("resultSection").style.display = "none";
    document.getElementById("iconSection").style.display = "none";
    errorMessage.textContent = "What city are you looking for?";
    errorMessage.style.display = "block";
    errorMessage.style.opacity = "1";
    return; //Stop execution here if field empty
  }

  // Limits number of locations in the API response for clearer UX. (max 5)
  const limit = 1;

  // Build API endpoint URL
  const endpoint = `${urlForCity}q=${cityNameTrim}&limit=${limit}&appid=${apiKey}`;

  // Fetch request to the API & response handling
  fetch(endpoint, { cache: "no-cache" })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    // Processing of data received (only jsonResponse[0] because of the limit)
    .then((jsonResponse) => {
      // User error if no city found
      if (!jsonResponse || jsonResponse.length === 0) {
        document.getElementById("resultSection").style.display = "none";
        document.getElementById("iconSection").style.display = "none";
        errorMessage.textContent = `Hmm, I can't find "${cityNameTrim}". Try a different spelling. `;
        errorMessage.style.display = "block";
        errorMessage.style.opacity = "1";
        return;
      }
      errorMessage.style.display = "none"; // Success so hides the error message

      const cityName = jsonResponse[0].name; // Official city name from API (UX reasons)
      const latitude = jsonResponse[0].lat;
      const longitude = jsonResponse[0].lon;
      apiCallsHistory.push({ city: cityName }); // Update the tracking of the limit rate. May use this in a later update to create a search history for the user.
      getWeather(latitude, longitude, cityName); // Calls the next script
    })
    // Technical error handling
    .catch((error) => {
      console.error("Erreur fetch:", error);
      document.getElementById("resultSection").style.display = "none";
      document.getElementById("iconSection").style.display = "none";
      errorMessage.textContent = "Connection issue. Retry?";
      errorMessage.style.display = "block";
      errorMessage.style.opacity = "1";
    });
  cityNameInput.value = ""; // Clear the field
}
