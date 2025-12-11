export interface ApiRecipe {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    [key: string]: string | null;
}

export interface Recipe {
    id: string;
    name: string;
    thumbnail: string;
    category: string;
    area: string;
    instructions: string;
    ingredients: string[];
}
