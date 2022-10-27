const searchBtn = document.getElementById('search-btn')
const mealList = document.getElementById('meal')
const mealDetailContent = document.querySelector(".meal-detail-content")
const recipiClosebtn = document.getElementById("recipe-close-btn")


searchBtn.addEventListener("click", getMealRecipes)
mealList.addEventListener("click", getMealLists)
recipiClosebtn.addEventListener("click", function() {
    mealDetailContent.parentElement.classList.remove("show-recipe")
})

function getMealRecipes() {
    let searchText = document.getElementById('search-input').value.trim();

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchText}`)
        .then(response => response.json())
        .then(data => {
            let html = ``;
            if(data.meals) {
                data.meals.forEach(meal => {
                    html += `
                        <div class="meal-item" data-id="${meal.idMeal}">
                        <div class="meal-img">
                            <img src="${meal.strMealThumb}" alt="">
                        </div>
                        <div class="meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href="#" class="recipe-btn">Get Recipes</a>
                        </div>
                    </div>
                    ` 
                });

                mealList.classList.remove('not-found')

            } else {
                html = "Sorry, we  didn't find any meal for your search!"
                mealList.classList.add('not-found')
            }
            mealList.innerHTML = html;

        });

}


function getMealLists(e) {
    e.preventDefault()
    if(e.target.classList.contains("recipe-btn")) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(response => response.json())
            .then(data => mealContent(data.meals))
    }
}

function mealContent(meal) {
    console.log(meal)
    meal = meal[0]
    let html = `
        <h2 class="recipetitle">${meal.strMeal}</h2>
        <div class="recipe-instruction">
            <h3>Instruction: </h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class="recipe-meal-img">
            <img src="${meal.strMealThumb}" alt="">
    `
    mealDetailContent.innerHTML = html
    mealDetailContent.parentElement.classList.add("show-recipe")
}

