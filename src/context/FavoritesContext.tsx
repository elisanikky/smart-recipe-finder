import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Recipe } from "../types/recipe";

interface FavoritesContextValue {
    favorites: Recipe[];
    toggleFavorite: (recipe: Recipe) => void;
    isFavorite: (id: string) => boolean;
    clearAllFavorites: () => void;
}

const FAVORITES_STORAGE_KEY = "smart-recipe-finder-favorites";

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
    undefined
);

// Function to load favorites from localStorage
const loadFavoritesFromStorage = (): Recipe[] => {
    try {
        const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error("Error loading favorites from localStorage:", error);
        return [];
    }
};

// Function to save favorites to localStorage
const saveFavoritesToStorage = (favorites: Recipe[]): void => {
    try {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
        console.error("Error saving favorites to localStorage:", error);
    }
};

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [favorites, setFavorites] = useState<Recipe[]>(loadFavoritesFromStorage);

    // Save favorites to localStorage whenever they change
    useEffect(() => {
        saveFavoritesToStorage(favorites);
    }, [favorites]);

    const toggleFavorite = (recipe: Recipe) => {
        setFavorites((prev) =>
            prev.some((r) => r.id === recipe.id)
                ? prev.filter((r) => r.id !== recipe.id)
                : [...prev, recipe]
        );
    };

    const isFavorite = (id: string) => favorites.some((r) => r.id === id);

    const clearAllFavorites = () => {
        setFavorites([]);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, clearAllFavorites }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = (): FavoritesContextValue => {
    const ctx = useContext(FavoritesContext);
    if (!ctx) {
        throw new Error("useFavorites must be used within FavoritesProvider");
    }
    return ctx;
};
