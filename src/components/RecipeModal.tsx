import type { Recipe } from "../types/recipe";

interface RecipeModalProps {
    recipe: Recipe | null;
    onClose: () => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, onClose }) => {
    if (!recipe) return null;

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div
                className="modal"
                onClick={(e) => e.stopPropagation()}
            >
                <button className="modal-close" onClick={onClose}>
                    ×
                </button>
                <h2>{recipe.name}</h2>
                <p className="recipe-meta">
                    {recipe.category} · {recipe.area}
                </p>

                <h3>Ingredients</h3>
                <ul>
                    {recipe.ingredients.map((ing) => (
                        <li key={ing}>{ing}</li>
                    ))}
                </ul>

                <h3>Instructions</h3>
                <p className="instructions">{recipe.instructions}</p>
            </div>
        </div>
    );
};
