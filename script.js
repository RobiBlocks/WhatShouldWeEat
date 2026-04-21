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

let excludedIngredients = [];
let preferredIngredients = [];

const selectedByForm = {
  excluded: new Set(),
  preferred: new Set(),
};

const buttonsByForm = {
  excluded: new Map(),
  preferred: new Map(),
};

const selectedClassByForm = {
  excluded: "excluded",
  preferred: "included",
};

let toggleIngredient = function (currentFormKey, otherFormKey, ingredient) {
  const currentSelection = selectedByForm[currentFormKey];
  const currentButton = buttonsByForm[currentFormKey].get(ingredient);
  const otherButton = buttonsByForm[otherFormKey].get(ingredient);
  const selectedClass = selectedClassByForm[currentFormKey];

  if (currentSelection.has(ingredient)) {
    currentSelection.delete(ingredient);
    currentButton.classList.remove("excluded", "included");

    if (otherButton) {
      otherButton.hidden = false;
      otherButton.disabled = false;
    }
  } else {
    currentSelection.add(ingredient);
    currentButton.classList.add(selectedClass);

    if (otherButton) {
      otherButton.hidden = true;
      otherButton.disabled = true;
    }
  }

  excludedIngredients = Array.from(selectedByForm.excluded);
  preferredIngredients = Array.from(selectedByForm.preferred);

  console.log("Ausgeschlossene Zutaten:", excludedIngredients);
  console.log("Gewuenschte Zutaten:", preferredIngredients);
};

let createIngredientForm = function (formKey, otherFormKey) {
  let form = document.createElement("form");
  form.id = `foodForm-${formKey}`;

  uniqueIngredients.forEach((ingredient) => {
    let button = document.createElement("button");
    button.type = "button";
    button.textContent = ingredient;
    button.className = "ingredient-button";

    buttonsByForm[formKey].set(ingredient, button);

    button.addEventListener("click", function () {
      toggleIngredient(formKey, otherFormKey, ingredient);
    });

    form.appendChild(button);
  });

  // Füge das Formular zum #app div hinzu
  document.getElementById("app").appendChild(form);
};

var app = document.getElementById("app");

let negativeTitle = document.createElement("h2");
  negativeTitle.textContent = "Wähle Zutaten aus, die du nicht essen möchtest:";
  app.appendChild(negativeTitle);

createIngredientForm("excluded", "preferred");

let positiveTitle = document.createElement("h2");
  positiveTitle.textContent = "Wähle Zutaten aus, die du essen möchtest:";
  app.appendChild(positiveTitle);

createIngredientForm("preferred", "excluded");
