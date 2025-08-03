/**
 * ======================== CLOTHING ICONS DISPLAY MODULE ==================
 *
 * Transforms clothing recommendations into visual icon interface
 *
 * Logic:
 * 1. Receives array of clothing item names from logic module
 * 2. Maps item names to corresponding image files and display labels
 * 3. Dynamically creates HTML elements for each recommended item
 * 4. Arranges icons in a flex layout for responsive design
 */

// ____________ HOW TO DISPLAY ICONS (only renders what is called)  _____________
export function displayClothingIcons(items) {
  const iconSection = document.getElementById("iconSection");
  iconSection.innerHTML = `<h3>Dress like this:</h3> `; // Reset the section

  // Mapping. Keys used by the clothing logic module. Values path to the visuals
  const iconMap = {
    coat: "./src/images/clothes/coat.png",
    pants: "./src/images/clothes/pants.png",
    short: "./src/images/clothes/short.png",
    pull: "./src/images/clothes/pull.png",
    "long-sleeves": "./src/images/clothes/long_sleeves.png",
    shirt: "./src/images/clothes/shirt.png",
    shoes: "./src/images/clothes/shoes.png",
    sandals: "./src/images/clothes/sandals.png",
    umbrella: "./src/images/clothes/umbrella.png",
    "water bottle": "./src/images/clothes/water_bottle.png",
    sunscreen: "./src/images/clothes/sunscreen.png",
    cap: "./src/images/clothes/cap.png",
    sunglasses: "./src/images/clothes/sunglasses.png",
    gloves: "./src/images/clothes/gloves.png",
    hat: "./src/images/clothes/hat.png",
    scarf: "./src/images/clothes/scarf.png",
  };

  // Labels for the user in English
  const labelMap = {
    coat: "Coat",
    pants: "Pants",
    short: "Short",
    pull: "Pull",
    "long-sleeves": "Long-sleeves",
    shirt: "Shirt",
    shoes: "Shoes",
    sandals: "Sandals",
    umbrella: "Umbrella",
    "water bottle": "Water bottle",
    sunscreen: "Sunscreen",
    cap: "Cap",
    sunglasses: "Sunglasses",
    gloves: "Gloves",
    hat: "Hat",
    scarf: "Scarf",
  };

  // Display icon/label generation
  items.forEach((item) => {
    if (iconMap[item]) {
      const iconContainer = document.createElement("div");
      iconContainer.className = "icon-item";

      const icon = document.createElement("img");
      icon.src = iconMap[item]; // Gets image path from mapping
      icon.alt = labelMap[item];
      icon.className = "clothing-icon";

      const label = document.createElement("p");
      label.textContent = labelMap[item]; // Gets display text from mapping
      label.className = "icon-label";

      iconContainer.appendChild(icon);
      iconContainer.appendChild(label);
      iconSection.appendChild(iconContainer);
    }
  });
  iconSection.style.display = "flex"; // Make it visible
}
