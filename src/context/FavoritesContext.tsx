import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Recipe } from "../types/recipe";

interface FavoritesContextValue {
    favorites: Recipe[];
    toggleFavorite: (recipe: Recipe) => void;
    isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
    undefined
);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [favorites, setFavorites] = useState<Recipe[]>([]);

    const toggleFavorite = (recipe: Recipe) => {
        setFavorites((prev) =>
            prev.some((r) => r.id === recipe.id)
                ? prev.filter((r) => r.id !== recipe.id)
                : [...prev, recipe]
        );
    };

    const isFavorite = (id: string) => favorites.some((r) => r.id === id);

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
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
