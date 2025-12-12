import { useState, useMemo } from "react";
import "./styles/app.css";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { SearchForm } from "./components/SearchForm";
import { RecipeGrid } from "./components/RecipeGrid";
import { RecipeModal } from "./components/RecipeModal";
import { ConfirmationDialog } from "./components/ConfirmationDialog";
import { FilterPanel } from "./components/FilterPanel";
import type { RecipeFilters } from "./components/FilterPanel";
import { RandomRecipeButton } from "./components/RandomRecipeButton";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { EmptyState } from "./components/EmptyState";
import { useRecipes } from "./hooks/useRecipes";
import type { Recipe } from "./types/recipe";
import { FavoritesProvider, useFavorites } from "./context/FavoritesContext";
import { RecentlyViewedProvider, useRecentlyViewed } from "./context/RecentlyViewedContext";

const AppContent = () => {
    const [query, setQuery] = useState("");
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
    const [showClearConfirm, setShowClearConfirm] = useState(false);
    const [filters, setFilters] = useState<RecipeFilters>({ category: "", area: "", searchQuery: "" });
    const { recipes, loading, error } = useRecipes(query);
    const { favorites, clearAllFavorites } = useFavorites();
    const { recentlyViewed, addToRecentlyViewed } = useRecentlyViewed();

    const filteredRecipes = useMemo(() => {
        return recipes.filter(recipe => {
            const matchesCategory = !filters.category || recipe.category === filters.category;
            const matchesArea = !filters.area || recipe.area === filters.area;
            const matchesSearch = !filters.searchQuery || (
                recipe.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                recipe.ingredients.some(ing =>
                    ing.toLowerCase().includes(filters.searchQuery.toLowerCase())
                ) ||
                recipe.category.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                recipe.area.toLowerCase().includes(filters.searchQuery.toLowerCase())
            );

            return matchesCategory && matchesArea && matchesSearch;
        });
    }, [recipes, filters]);

    const handleFilterChange = (newFilters: RecipeFilters) => {
        setFilters(newFilters);
    };

    const handleRecipeSelect = (recipe: Recipe) => {
        setSelectedRecipe(recipe);
        addToRecentlyViewed(recipe);
    };

    return (
        <div className="app">
            <Hero />
            <Header />
            <main>
                <div className="search-section">
                    <SearchForm initialQuery={query} onSearch={setQuery} />
                    <RandomRecipeButton onRecipeSelect={setSelectedRecipe} />
                </div>

                {loading && <LoadingSpinner message="Searching for delicious recipes..." />}

                {error && (
                    <EmptyState
                        icon=""
                        title="Oops! Something went wrong"
                        message={`We couldn't load the recipes. ${error}`}
                        action={
                            <button
                                className="retry-btn"
                                onClick={() => window.location.reload()}
                            >
                                Try Again
                            </button>
                        }
                    />
                )}

                {!loading && !error && (
                    <>
                        {recipes.length > 0 && (
                            <FilterPanel recipes={recipes} onFilterChange={handleFilterChange} />
                        )}


                        {query.trim() && recipes.length === 0 && (
                            <EmptyState
                                icon=""
                                title="No recipes found"
                                message={`We couldn't find any recipes for "${query}". Try a different search term or use the random recipe feature.`}
                            />
                        )}

                        {filteredRecipes.length > 0 && (
                            <>
                                <h2>Results {filteredRecipes.length !== recipes.length && `(${filteredRecipes.length} of ${recipes.length})`}</h2>
                                <RecipeGrid recipes={filteredRecipes} onSelect={handleRecipeSelect} />
                            </>
                        )}

                        {query.trim() && recipes.length > 0 && filteredRecipes.length === 0 && (
                            <EmptyState
                                icon=""
                                title="No recipes match your filters"
                                message="Try adjusting your filters or clearing them to see more recipes."
                            />
                        )}

                        {!!favorites.length && (
                            <>
                                <div className="favorites-header">
                                    <h2>Your favourites ({favorites.length})</h2>
                                    <button
                                        className="clear-favorites-btn"
                                        onClick={() => setShowClearConfirm(true)}
                                        title="Clear all favorites"
                                    >
                                        Clear All
                                    </button>
                                </div>
                                <RecipeGrid recipes={favorites} onSelect={handleRecipeSelect} />
                            </>
                        )}

                        {!!recentlyViewed.length && (
                            <>
                                <h2>Recently viewed</h2>
                                <RecipeGrid recipes={recentlyViewed} onSelect={handleRecipeSelect} />
                            </>
                        )}
                    </>
                )}

                <RecipeModal
                    recipe={selectedRecipe}
                    onClose={() => setSelectedRecipe(null)}
                />

                <ConfirmationDialog
                    isOpen={showClearConfirm}
                    title="Clear All Favorites"
                    message={`Are you sure you want to remove all ${favorites.length} favorite recipes? This action cannot be undone.`}
                    confirmText="Yes, Clear All"
                    onConfirm={() => {
                        clearAllFavorites();
                        setShowClearConfirm(false);
                    }}
                    onCancel={() => setShowClearConfirm(false)}
                />
            </main>
        </div>
    );
};

export const App = () => (
    <FavoritesProvider>
        <RecentlyViewedProvider>
            <AppContent />
        </RecentlyViewedProvider>
    </FavoritesProvider>
);
