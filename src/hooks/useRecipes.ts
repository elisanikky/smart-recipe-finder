import { useState, useEffect } from "react";
import type { ApiRecipe, Recipe } from "../types/recipe";

const BASE_URL = import.meta.env.VITE_MEALDB_BASE_URL as string;

const mapApiRecipe = (apiRecipe: ApiRecipe): Recipe => {
    const ingredients: string[] = [];
    for (let i = 1; i <= 20; i++) {
        const ing = apiRecipe[`strIngredient${i}`];
        const measure = apiRecipe[`strMeasure${i}`];
        if (ing && ing.trim()) {
            ingredients.push(`${measure ?? ""} ${ing}`.trim());
        }
    }

    return {
        id: apiRecipe.idMeal,
        name: apiRecipe.strMeal,
        thumbnail: apiRecipe.strMealThumb,
        category: apiRecipe.strCategory,
        area: apiRecipe.strArea,
        instructions: apiRecipe.strInstructions,
        ingredients
    };
};

export const useRecipes = (query: string) => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!query.trim()) {
            setRecipes([]);
            return;
        }

        const controller = new AbortController();

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const url = `${BASE_URL}/search.php?s=${encodeURIComponent(query)}`;
                const res = await fetch(url, { signal: controller.signal });

                if (!res.ok) {
                    throw new Error("Failed to fetch recipes");
                }

                const data = await res.json();
                const meals: ApiRecipe[] | null = data.meals;

                if (!meals) {
                    setRecipes([]);
                    return;
                }

                setRecipes(meals.map(mapApiRecipe));
            } catch (err: unknown) {
                if ((err as Error).name === "AbortError") return;
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => controller.abort();
    }, [query]);

    return { recipes, loading, error };
};

export const useRandomRecipe = () => {
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchRandomRecipe = async () => {
        try {
            setLoading(true);
            setError(null);

            const url = `${BASE_URL}/random.php`;
            const res = await fetch(url);

            if (!res.ok) {
                throw new Error("Failed to fetch random recipe");
            }

            const data = await res.json();
            const meal: ApiRecipe | null = data.meals?.[0];

            if (!meal) {
                throw new Error("No recipe found");
            }

            setRecipe(mapApiRecipe(meal));
        } catch (err: unknown) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return { recipe, loading, error, fetchRandomRecipe };
};