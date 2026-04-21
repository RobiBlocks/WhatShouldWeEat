const foodList = [
  {
    id: 1,
    name: "Schnitzel mit Pommes",
    zutaten: ["Kartoffeln", "Schweinefleisch", "Eier", "Mehl"],
  },
  {
    id: 2,
    name: "Currywurst",
    zutaten: ["Brühwurst", "Tomaten", "Curry"],
  },
  {
    id: 3,
    name: "Pizza Salami",
    zutaten: ["Käse", "Mehl", "Tomaten", "Salami"],
  },
  {
    id: 4,
    name: "Hamburger",
    zutaten: ["Rindfleisch", "Käse", "Tomaten", "Salat", "Gurken"],
  },
  {
    id: 5,
    name: "Spaghetti Bolognese",
    zutaten: ["Rindfleisch", "Tomaten", "Karotten", "Mehl"],
  },
  {
    id: 6,
    name: "Käsespätzle",
    zutaten: ["Spätzlemehl", "Eier", "Bergkäse", "Butter"],
  },
  {
    id: 7,
    name: "Kartoffelpuffer",
    zutaten: ["Kartoffeln"],
  },
  {
    id: 8,
    name: "Gulasch",
    zutaten: ["Rindfleisch", "Tomaten", "Paprika"],
  },
  {
    id: 9,
    name: "Ravioli",
    zutaten: ["Tomaten", "Mehl", "Rindfleisch", "Eier"],
  },
  {
    id: 10,
    name: "Maki Sushi",
    zutaten: ["Lachs", "Avocado", "Reis", "Seegras"],
  },
];

// Sammle alle einzigartigen Zutaten
let allIngredients = new Set();
foodList.forEach(food => {
  food.zutaten.forEach(zutat => allIngredients.add(zutat));
});
let uniqueIngredients = Array.from(allIngredients);

// Array für ausgeschlossene Zutaten
let excludedIngredients = [];

let createFoodForm = function () {
  let form = document.createElement("form");
  form.id = "foodForm";

  let title = document.createElement("h2");
  title.textContent = "Wähle Zutaten aus, die du nicht essen möchtest:";
  form.appendChild(title);

  uniqueIngredients.forEach(ingredient => {
    let button = document.createElement("button");
    button.type = "button";
    button.textContent = ingredient;
    button.className = "ingredient-button";
    button.addEventListener("click", function() {
      if (excludedIngredients.includes(ingredient)) {
        // Entfernen
        excludedIngredients = excludedIngredients.filter(item => item !== ingredient);
        button.classList.remove("excluded");
      } else {
        // Hinzufügen
        excludedIngredients.push(ingredient);
        button.classList.add("excluded");
      }
      console.log("Ausgeschlossene Zutaten:", excludedIngredients);
    });
    form.appendChild(button);
  });

  // Füge das Formular zum #app div hinzu
  document.getElementById("app").appendChild(form);
};

// Rufe die Funktion auf, um das Formular zu erstellen
createFoodForm();
