import { useState } from "react";
import "./styles/app.css";
import { Header } from "./components/Header";
import { SearchForm } from "./components/SearchForm";
import { RecipeGrid } from "./components/RecipeGrid";
import { RecipeModal } from "./components/RecipeModal";
import { useRecipes } from "./hooks/useRecipes";
import type { Recipe } from "./types/recipe";
import { FavoritesProvider, useFavorites } from "./context/FavoritesContext";

const AppContent = () => {
    const [query, setQuery] = useState("");
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
    const { recipes, loading, error } = useRecipes(query);
    const { favorites } = useFavorites();

    return (
        <div className="app">
            <Header />
            <main>
                <SearchForm initialQuery={query} onSearch={setQuery} />

                {loading && <p>Loading recipes...</p>}
                {error && <p className="error">Error: {error}</p>}

                {!loading && !error && (
                    <>
                        <h2>Results</h2>
                        <RecipeGrid recipes={recipes} onSelect={setSelectedRecipe} />

                        {!!favorites.length && (
                            <>
                                <h2>Your favourites</h2>
                                <RecipeGrid recipes={favorites} onSelect={setSelectedRecipe} />
                            </>
                        )}
                    </>
                )}

                <RecipeModal
                    recipe={selectedRecipe}
                    onClose={() => setSelectedRecipe(null)}
                />
            </main>
        </div>
    );
};

export const App = () => (
    <FavoritesProvider>
        <AppContent />
    </FavoritesProvider>
);
