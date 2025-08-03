/**
 * ======================= CLOTHING LOGIC MODULE ==========================
 * Determines appropriate clothing recommendations based on weather conditions
 *
 * Logic:
 * 1. Analyzes felt temperature to determine base clothing layers
 * 2. Considers weather conditions for additional items
 * 3. Factors in cloud coverage for precipitation probability
 * 4. Delegates visual display to clothing icons module
 */

//_______________________IMPORT_________________________________
import { displayClothingIcons } from "./clothes-list.js"; // Clothing logic (this module) separated from visual presentation

//___________________CLOTHING RECOMMENDATION_____________________________
// Uses FELT TEMPERATURE (not actual) because it better represents human comfort

export function whatToWear(feelsLikeCelsius, weather, cloud) {
  // Initializes empty clothing recommendations array
  let clothingItems = [];

  // Only the degrees when the items change
  if (feelsLikeCelsius < 0) {
    clothingItems = ["coat", "pull", "pants", "shoes", "scarf", "gloves"];
  } else if (feelsLikeCelsius < 5) {
    clothingItems = ["coat", "pull", "pants", "shoes"];
  } else if (feelsLikeCelsius < 20) {
    clothingItems = ["pull", "pants", "shoes"];
  } else if (feelsLikeCelsius < 25) {
    clothingItems = ["shirt", "pants", "shoes"];
  } else if (feelsLikeCelsius < 50) {
    clothingItems = ["shirt", "short", "sandals", "water bottle"];
  } else {
    console.log(`don’t go out/try to survive`); // To change in a later update to a message that the user sees.
  }

  // Weather specific additions: don't replace the temperature based clothes
  if (weather === "Rain") {
    clothingItems.push("umbrella");
  } else if (weather === "Snow") {
    clothingItems.push("umbrella", "hat", "scarf", "gloves");
  } else if (weather === "Clouds" && cloud >= 75) {
    clothingItems.push("umbrella");
  } else if (weather === "Clear" && feelsLikeCelsius > 25) {
    clothingItems.push("cap", "sunscreen", "sunglasses");
  }

  // This module decided what to display technically but the script still needs the visual representations
  displayClothingIcons(clothingItems);
}
