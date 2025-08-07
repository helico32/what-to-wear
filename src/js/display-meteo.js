/**
 * ========================== WEATHER DISPLAY MODULE ==========================
 *  Render processed weather data into user-friendly HTML interface
 *
 * 1. Receives processed weather data from get-weather module
 * 2. Handles temperature unit conversion (Celsius ↔ Fahrenheit)
 * 3. Creates dynamic HTML content with weather information
 * 4. Manages dual-unit display based on user preference
 *
 */

//_______________________HOW TO DISPLAY RESPONSE_______________________

/**
 * Main weather display function - renders comprehensive weather UI
 *
 * Logic:
 * 1. Gets user's temperature unit preference (Celsius/Fahrenheit)
 * 2. Converts all temperatures to Fahrenheit if needed
 * 3. Creates appropriate "feels like" message
 * 4. Generates HTML content in user's preferred units
 * 5. Injects HTML into DOM and make section visible
 */

export const renderResponse = (
  tempNormal,
  tempFelt,
  tempMorning,
  tempDay,
  tempEvening,
  tempNight,
  cityName,
  weather,
  description,
  weatherNum
) => {
  // DOM elements
  const checkboxFahrenheit = document.getElementById("fahrenheit");
  const results = document.getElementById("resultSection");

  // Ensure results container (HTML) exists before proceeding.
  if (!results) return;

  // Temperature conversion
  /**
   * Converts Celsius to Fahrenheit: (°C × 9/5) + 32 = °F
   * .toFixed(1) rounds to 1 decimal place for consistent display
   */

  const toFahrenheit = (celsius) => (celsius * 9) / 5 + 32;
  const tempFahrenheit = toFahrenheit(tempNormal).toFixed(1);
  const feelsLikeFahrenheit = toFahrenheit(tempFelt).toFixed(1);
  const tempMorningF = toFahrenheit(tempMorning).toFixed(1);
  const tempDayF = toFahrenheit(tempDay).toFixed(1);
  const tempEveningF = toFahrenheit(tempEvening).toFixed(1);
  const tempNightF = toFahrenheit(tempNight).toFixed(1);

  // Weather icon from API + @2x for high-resolution version
  const weatherIcon = `https://openweathermap.org/img/wn/${weatherNum}@2x.png`;

  // Added for UX reason. When the temperature is identical to the felt one it changes the message
  let feelingText;
  if (
    tempNormal === tempFelt ||
    parseFloat(tempNormal) === parseFloat(feelsLikeFahrenheit)
  ) {
    feelingText = `and it feels like it!`;
  } else {
    if (checkboxFahrenheit.checked === true) {
      feelingText = `but it feels like ${feelsLikeFahrenheit} F`;
    } else {
      feelingText = `but it feels like ${tempFelt}°C`;
    }
  }

  /** DISPLAY in HTML:  I used inner.HTML for easier code handling even though there is duplate parts in it. */

  // Fahrenheit display
  if (checkboxFahrenheit.checked === true) {
    results.style.display = "block"; // Make results section visible
    results.innerHTML = `
    <h2> ${cityName}</h2>
    <h3> Now </h3>
    <p>Temp: ${tempFahrenheit} °F ${feelingText}</p>  
 
    <div class="weather-row">
  <div class="weather-col">
      <p><img src="${weatherIcon}" alt="${weather}" width="50" height="50"> ${weather} </p>
       </div>
       <div class="weather-col">
    <p> ${description}</p>
      </div>
</div>

  <div class="separator"></div>
   <br>

   <h4> Daily Summary</h4>
<div class="weather-row">
  <div class="weather-col">
    <img src="./src/images/weather/morning.png" alt="Morning"  width="40" height="40"> ${tempMorningF}°F
  </div>
  <div class="weather-col">
    <img src="./src/images/weather/noon.png" alt="Day"  width="40" height="40"> ${tempDayF}°F
  </div>
</div>

<div class="weather-row">
  <div class="weather-col">
    <img src="./src/images/weather/evening.png" alt="Evening"  width="40" height="40"> ${tempEveningF}°F
  </div>
  <div class="weather-col">
    <img src="./src/images/weather/night.png" alt="Night"  width="40" height="40"> ${tempNightF}°F
  </div>
</div>`;
  } else {
    // Celsius display (same logic than Farenheit)
    results.style.display = "block"; // Make results section visible
    results.innerHTML = `
     <h2> ${cityName}</h2>
    <h3> Now </h3>
    <p>Temp: ${tempNormal}°C ${feelingText}</p>

    <div class="weather-row">
  <div class="weather-col">
      <p><img src="${weatherIcon}" alt="${weather}" width="50" height="50"> ${weather} </p>
       </div>
       <div class="weather-col">
    <p> ${description}</p>
      </div>
</div>

  <div class="separator"></div>
   <br>

   <h4> Daily Summary</h4>
<div class="weather-row">
  <div class="weather-col">
    <img src="./src/images/weather/morning.png" alt="Morning"  width="40" height="40"> ${tempMorning}°C
  </div>
  <div class="weather-col">
    <img src="./src/images/weather/noon.png" alt="Day"  width="40" height="40"> ${tempDay}°C
  </div>
</div>

<div class="weather-row">
  <div class="weather-col">
    <img src="./src/images/weather/evening.png" alt="Evening"  width="40" height="40"> ${tempEvening}°C
  </div>
  <div class="weather-col">
    <img src="./src/images/weather/night.png" alt="Night"  width="40" height="40"> ${tempNight}°C
  </div>
</div>
`;
  }
};
