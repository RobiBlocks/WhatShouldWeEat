const foodList = [
  {
    id: 1,
    name: "Schnitzel mit Pommes",
    zutaten: ["Kartoffeln", "Schweinefleisch", "Eier", "Mehl"],
    zeit: "Mittag"
  },
  {
    id: 2,
    name: "Currywurst",
    zutaten: ["Brühwurst", "Tomaten", "Curry"],
    zeit: "Mittag"
  },
  {
    id: 3,
    name: "Pizza Salami",
    zutaten: ["Käse", "Mehl", "Tomaten", "Salami"],
    zeit: "Mittag"
  },
  {
    id: 4,
    name: "Hamburger",
    zutaten: ["Rindfleisch", "Käse", "Tomaten", "Salat", "Gurken"],
    zeit: "Mittag"
  },
  {
    id: 5,
    name: "Spaghetti Bolognese",
    zutaten: ["Rindfleisch", "Tomaten", "Karotten", "Mehl"],
    zeit: "Mittag"
  },
  {
    id: 6,
    name: "Käsespätzle",
    zutaten: ["Spätzlemehl", "Eier", "Bergkäse", "Butter"],
    zeit: "Mittag"
  },
  {
    id: 7,
    name: "Kartoffelpuffer",
    zutaten: ["Kartoffeln"],
    zeit: "Abend"
  },
  {
    id: 8,
    name: "Gulasch",
    zutaten: ["Rindfleisch", "Tomaten", "Paprika"],
    zeit: "Mittag"
  },
  {
    id: 9,
    name: "Ravioli",
    zutaten: ["Tomaten", "Mehl", "Rindfleisch", "Eier"],
    zeit: "Mittag"
  },
  {
    id: 10,
    name: "Maki Sushi",
    zutaten: ["Lachs", "Avocado", "Reis", "Seegras"],
    zeit: "Abend"
  },
  {
    id: 11,
    name: "Pancakes",
    zutaten: ["Mehl", "Milch", "Eier"]
  },
    {
    id: 12,
    name: "Rührei",
    zutaten: ["Eier"]
  },
    {
    id: 13,
    name: "Birchermüsli",
    zutaten: ["Joghurt", "Haferflocken"]
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
const mealTimes = ["Morgen", "Mittag", "Abend"];

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

let mealTimeTitle = document.createElement("h2");
mealTimeTitle.textContent = "Wann möchtest du essen?";
app.appendChild(mealTimeTitle);

let mealTimeSelect = document.createElement("select");
mealTimeSelect.id = "meal-time-select";

mealTimes.forEach((time) => {
  let option = document.createElement("option");
  option.value = time;
  option.textContent = time;
  mealTimeSelect.appendChild(option);
});

app.appendChild(mealTimeSelect);

let continueButton = document.createElement("button");
continueButton.type = "button";
continueButton.id = "continue-button";
continueButton.textContent = "Weiter";
app.appendChild(continueButton);

let resultBox = document.createElement("div");
resultBox.id = "result-box";
app.appendChild(resultBox);

let chooseMeal = function () {
  const selectedTime = mealTimeSelect.value.toLowerCase();

  const filteredByTime = foodList.filter((food) => {
    return food.zeit.toLowerCase() === selectedTime;
  });

  const filteredWithoutExcluded = filteredByTime.filter((food) => {
    return !food.zutaten.some((zutat) => excludedIngredients.includes(zutat));
  });

  if (filteredWithoutExcluded.length === 0) {
    resultBox.textContent = "Kein passendes Gericht gefunden. Passe deine Auswahl an.";
    return;
  }

  let bestScore = -1;
  let bestCandidates = [];

  filteredWithoutExcluded.forEach((food) => {
    const score = food.zutaten.filter((zutat) => preferredIngredients.includes(zutat)).length;

    if (score > bestScore) {
      bestScore = score;
      bestCandidates = [food];
    } else if (score === bestScore) {
      bestCandidates.push(food);
    }
  });

  const randomIndex = Math.floor(Math.random() * bestCandidates.length);
  const selectedFood = bestCandidates[randomIndex];

  resultBox.innerHTML = `
    <h3>Vorschlag für ${mealTimeSelect.value}:</h3>
    <p><strong>${selectedFood.name}</strong></p>
    <p>Zutaten: ${selectedFood.zutaten.join(", ")}</p>
  `;

  console.log("Ausgewaehlte Tageszeit:", mealTimeSelect.value);
  console.log("Ausgewaehltes Gericht:", selectedFood);
};

continueButton.addEventListener("click", chooseMeal);
