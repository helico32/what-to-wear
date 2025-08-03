/**
 * ============================= WEATHER DATA MODULE ==========================
 *
 * This module handles the second step of the weather lookup process:
 * 1. Receives coordinates from geolocation module
 * 2. Calls OpenWeather's One Call API for detailed weather data
 * 3. Processes and converts temperature data (Kelvin → Celsius)
 * 4. Orchestrates the display of both clothing recommendations and weather info
 *
 * ONE CALL API: Provides current weather + daily forecasts in a single request.
 */

// ____________________ IMPORTS ___________________________
import { apiKey } from "../script.js";
import { whatToWear } from "./clothes-logic.js"; // Clothing recommendation logic
import { renderResponse } from "./display-meteo.js"; // Weather display rendering

// ____________________ GETS WEATHER DATA ___________________________
/**
 * Process Flow:
 * 1. Build One Call API request with coordinates
 * 2. Fetch comprehensive weather data from OpenWeather
 * 3. Validate and extract weather information
 * 4. Convert temperatures from Kelvin to Celsius
 * 5. Trigger clothing recommendations display
 * 6. Trigger weather information display
 */
export function getWeather(latitude, longitude, cityName) {
  const urlForWeather = "https://api.openweathermap.org/data/3.0/onecall?"; // API endpoint first part
  const endpoint = `${urlForWeather}lat=${latitude}&lon=${longitude}&appid=${apiKey}`; // Build API endpoint URL

  // Fetch request to the API & response handling
  fetch(endpoint, { cache: "no-cache" })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    // Data processing
    .then((jsonResponse) => {
      // Data validation to ensure all required fields exist
      if (
        !jsonResponse ||
        !jsonResponse.current ||
        !jsonResponse.daily ||
        !jsonResponse.daily[0]
      ) {
        return; // Exit early if data is malformed. May add in the future a user friendly error message asking to retry
      }

      // ____________________ TEMPERATURE CONVERSION ___________________________
      /**
       * OpenWeather API returns temperatures in Kelvin by default
       * Convert to Celsius + .toFixed(1) rounds to 1 decimal place for display
       */
      const toCelsius = (kelvin) => (kelvin - 273.15).toFixed(1);
      const tempNormal = toCelsius(jsonResponse.current.temp);
      const tempFelt = toCelsius(jsonResponse.current.feels_like);
      // Extract and convert daily temperature variations
      const tempMorning = toCelsius(jsonResponse.daily[0].feels_like.morn);
      const tempDay = toCelsius(jsonResponse.daily[0].feels_like.day);
      const tempEvening = toCelsius(jsonResponse.daily[0].feels_like.eve);
      const tempNight = toCelsius(jsonResponse.daily[0].feels_like.night);
      // Extract weather conditions and icon for weather visuaization
      const weather = jsonResponse.current.weather[0].main;
      const cloud = jsonResponse.current.clouds; // Cloud percentage
      const description = jsonResponse.daily[0].summary;
      const weatherNum = jsonResponse.current.weather[0].icon;

      // ____________________ DISPLAY ___________________________

      // Trigger clothing recommendation display to determine appropriate clothing suggestions
      whatToWear(tempFelt, weather, cloud);

      //Trigger main weather information display. Passes all processed data to the display module
      renderResponse(
        tempNormal, // Current actual temperature
        tempFelt, // Current felt temperature
        tempMorning, // Morning temperature
        tempDay, // Day temperature
        tempEvening, // Evening temperature
        tempNight, // Night temperature
        cityName, // City name for display (UX)
        weather, // Weather condition (Rain/Clear/etc.)
        description, // Detailed weather description
        weatherNum // Weather icon code
      );
    })
    // Error handling during data fetching
    .catch((error) => {
      console.error("Erreur fetch:", error);
    });
}
