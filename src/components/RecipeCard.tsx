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
                <p className="recipe-meta">
                    {recipe.category} · {recipe.area}
                </p>
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
