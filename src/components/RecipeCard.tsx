import type { Recipe } from "../types/recipe";
import { useFavorites } from "../context/FavoritesContext";

interface RecipeCardProps {
    recipe: Recipe;
    onOpen: () => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onOpen }) => {
    const { isFavorite, toggleFavorite } = useFavorites();
    const favorite = isFavorite(recipe.id);

    return (
        <article className="recipe-card">
            <img src={recipe.thumbnail} alt={recipe.name} />
            <div className="recipe-card-body">
                <h3>{recipe.name}</h3>
                <div className="recipe-tags">
                    <span className="recipe-tag category-tag">{recipe.category}</span>
                    <span className="recipe-tag area-tag">{recipe.area}</span>
                    <span className="recipe-tag ingredient-count">
                        {recipe.ingredients.length} ingredients
                    </span>
                </div>
                <div className="recipe-actions">
                    <button type="button" onClick={onOpen}>
                        View details
                    </button>
                    <button
                        type="button"
                        className={favorite ? "favorite active" : "favorite"}
                        onClick={() => toggleFavorite(recipe)}
                    >
                        {favorite ? "★ Favourite" : "☆ Add to favourites"}
                    </button>
                </div>
            </div>
        </article>
    );
};
