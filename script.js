document.addEventListener("DOMContentLoaded", function () {
    const recipeList = document.getElementById("recipe-list");
    const searchInput = document.getElementById("search");
    const recipesSection = document.getElementById("recipes");
    const recipeDetailSection = document.getElementById("recipe-detail");
    const backButton = document.getElementById("back-button");

    let recipes = JSON.parse(localStorage.getItem("recipes")) || [
        {
            name: "Avocado Toast",
            ingredients: "Avocado, Bread, Salt, Pepper",
            nutrition: { protein: "5g", carbs: "30g", fat: "12g", fiber: "6g" },
            image: "images/avocado_toast.jpg",
            instructions: [
                "Toast the bread until crisp.",
                "Mash the avocado with salt and pepper.",
                "Spread evenly on the toast.",
                "Optionally, top with sliced tomatoes or a poached egg before serving."
            ]
        },
        {
            name: "Greek Salad",
            ingredients: "Cucumber, Tomato, Feta, Olives",
            nutrition: { protein: "6g", carbs: "14g", fat: "10g", fiber: "4g" },
            image: "images/greek_salad.jpg",
            instructions: [
                "Chop cucumber, tomato, and onion into bite-sized pieces.",
                "Mix in a bowl with crumbled feta cheese and olives.",
                "Drizzle with olive oil, lemon juice, salt, and oregano.",
                "Toss everything together before serving."
            ]
        },
        {
            name: "Oatmeal Bowl",
            ingredients: "Oats, Almond Milk, Banana, Chia Seeds",
            nutrition: { protein: "8g", carbs: "45g", fat: "5g", fiber: "7g" },
            image: "images/oatmeal_bowl.jpg",
            instructions: [
                "Bring almond milk to a boil.",
                "Add oats and simmer for about 5 minutes while stirring occasionally.",
                "Pour into a bowl and top with sliced banana, chia seeds, and a drizzle of honey.",
                "Serve warm."
            ]
        },
        {
            name: "Grilled Salmon",
            ingredients: "Salmon, Lemon, Garlic, Olive Oil",
            nutrition: { protein: "22g", carbs: "2g", fat: "15g", fiber: "0g" },
            image: "images/grilled_salmon.jpg",
            instructions: [
                "Season salmon fillets with minced garlic, salt, pepper, and lemon juice.",
                "Heat a grill pan with olive oil.",
                "Cook the salmon for about 5-7 minutes on each side until flaky and golden.",
                "Serve hot with steamed vegetables."
            ]
        },
        {
            name: "Quinoa Salad",
            ingredients: "Quinoa, Bell Pepper, Black Beans, Lime",
            nutrition: { protein: "9g", carbs: "35g", fat: "3g", fiber: "5g" },
            image: "images/quinoa_salad.jpg",
            instructions: [
                "Cook quinoa according to package instructions and let it cool.",
                "Combine quinoa with diced bell peppers and black beans in a bowl.",
                "Squeeze fresh lime juice over the salad, season with salt and cumin.",
                "Toss well and serve."
            ]
        },
        {
            name: "Pancakes",
            ingredients: "Flour, Milk, Eggs, Sugar, Baking Powder",
            nutrition: { protein: "6g", carbs: "45g", fat: "7g", fiber: "2g" },
            image: "images/pancakes.jpg",
            instructions: [
                "Mix flour, sugar, and baking powder in a bowl.",
                "Add eggs and milk, then whisk until smooth.",
                "Heat a pan and pour batter to form pancakes.",
                "Cook for 2 minutes per side, then serve with syrup."
            ]
        },
        {
            name: "Mango Smoothie",
            ingredients: "Mango, Yogurt, Honey, Ice",
            nutrition: { protein: "4g", carbs: "38g", fat: "2g", fiber: "3g" },
            image: "images/mango_smoothie.jpg",
            instructions: [
                "Peel and dice the mango.",
                "Blend with yogurt, honey, and ice until smooth.",
                "Pour into a glass and enjoy."
            ]
        },
        {
            name: "Spaghetti Bolognese",
            ingredients: "Spaghetti, Ground Beef, Tomato Sauce, Onion, Garlic",
            nutrition: { protein: "20g", carbs: "50g", fat: "15g", fiber: "5g" },
            image: "images/spaghetti_bolognese.jpg",
            instructions: [
                "Cook spaghetti according to package instructions.",
                "In a pan, sauté onions and garlic.",
                "Add ground beef and cook until browned.",
                "Stir in tomato sauce and simmer for 10 minutes.",
                "Serve sauce over spaghetti."
            ]
        }
    ];

    function displayRecipes(filteredRecipes) {
        recipeList.innerHTML = "";
        recipeDetailSection.style.display = "none";
        recipesSection.style.display = "block";
        backButton.style.display = "none";

        if (filteredRecipes.length === 0) {
            recipeList.innerHTML = "<p>No recipes found.</p>";
            return;
        }

        filteredRecipes.forEach(recipe => {
            const recipeCard = document.createElement("div");
            recipeCard.classList.add("recipe-card");
            recipeCard.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.name}">
                <h3>${recipe.name}</h3>
                <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
            `;
            recipeCard.addEventListener("click", () => showRecipeDetail(recipe));
            recipeList.appendChild(recipeCard);
        });
    }

    function showRecipeDetail(recipe) {
        const instructionsHTML = recipe.instructions.map((step, i) => `<li>Step ${i + 1}: ${step}</li>`).join("");

        recipeDetailSection.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.name}">
            <h2>${recipe.name}</h2>
            <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>

            <h3>Nutritional Information:</h3>
            <table class="nutrition-table">
                <tr>
                    <th>Protein</th>
                    <th>Carbs</th>
                    <th>Fat</th>
                    <th>Fiber</th>
                </tr>
                <tr>
                    <td>${recipe.nutrition.protein}</td>
                    <td>${recipe.nutrition.carbs}</td>
                    <td>${recipe.nutrition.fat}</td>
                    <td>${recipe.nutrition.fiber}</td>
                </tr>
            </table>

            <h3>Instructions:</h3>
            <ul>${instructionsHTML}</ul>
        `;

        recipesSection.style.display = "none";
        recipeDetailSection.style.display = "block";
        backButton.style.display = "block";
    }

    searchInput.addEventListener("input", function () {
        const query = searchInput.value.toLowerCase();
        const filteredRecipes = recipes.filter(recipe =>
            recipe.name.toLowerCase().includes(query) ||
            recipe.ingredients.toLowerCase().includes(query)
        );
        displayRecipes(filteredRecipes);
    });

    backButton.addEventListener("click", function () {
        displayRecipes(recipes);
    });

    displayRecipes(recipes);
});
