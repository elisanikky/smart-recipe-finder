import type { Recipe } from "../types/recipe";
import { RecipeCard } from "./RecipeCard";

interface RecipeGridProps {
    recipes: Recipe[];
    onSelect: (recipe: Recipe) => void;
}

export const RecipeGrid: React.FC<RecipeGridProps> = ({ recipes, onSelect }) => {
    if (!recipes.length) {
        return <p className="empty-state">No recipes found. Try a different search.</p>;
    }

    return (
        <section className="recipe-grid">
            {recipes.map((r) => (
                <RecipeCard key={r.id} recipe={r} onOpen={() => onSelect(r)} />
            ))}
        </section>
    );
};
