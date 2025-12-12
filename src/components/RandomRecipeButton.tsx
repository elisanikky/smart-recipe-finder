import React, { useState } from "react";
import type { Recipe } from "../types/recipe";

interface RandomRecipeButtonProps {
    onRecipeSelect: (recipe: Recipe) => void;
}

export const RandomRecipeButton: React.FC<RandomRecipeButtonProps> = ({ onRecipeSelect }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleRandomClick = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_MEALDB_BASE_URL}/random.php`);
            if (!response.ok) {
                throw new Error("Failed to fetch random recipe");
            }

            const data = await response.json();
            const meal = data.meals?.[0];

            if (meal) {
                // Map the API recipe to our Recipe type
                const ingredients: string[] = [];
                for (let i = 1; i <= 20; i++) {
                    const ing = meal[`strIngredient${i}`];
                    const measure = meal[`strMeasure${i}`];
                    if (ing && ing.trim()) {
                        ingredients.push(`${measure ?? ""} ${ing}`.trim());
                    }
                }

                const recipe: Recipe = {
                    id: meal.idMeal,
                    name: meal.strMeal,
                    thumbnail: meal.strMealThumb,
                    category: meal.strCategory,
                    area: meal.strArea,
                    instructions: meal.strInstructions,
                    ingredients
                };

                onRecipeSelect(recipe);
            }
        } catch (error) {
            console.error("Error fetching random recipe:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            className="random-recipe-btn"
            onClick={handleRandomClick}
            disabled={isLoading}
            title="Discover a random recipe"
        >
            {isLoading ? "Finding..." : "Random Recipe"}
        </button>
    );
};
