import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Recipe } from "../types/recipe";

interface RecentlyViewedContextValue {
    recentlyViewed: Recipe[];
    addToRecentlyViewed: (recipe: Recipe) => void;
    clearRecentlyViewed: () => void;
}

const RECENTLY_VIEWED_STORAGE_KEY = "smart-recipe-finder-recently-viewed";
const MAX_RECENTLY_VIEWED = 10;

const RecentlyViewedContext = createContext<RecentlyViewedContextValue | undefined>(
    undefined
);

// Function to load recently viewed from localStorage
const loadRecentlyViewedFromStorage = (): Recipe[] => {
    try {
        const stored = localStorage.getItem(RECENTLY_VIEWED_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error("Error loading recently viewed from localStorage:", error);
        return [];
    }
};

// Function to save recently viewed to localStorage
const saveRecentlyViewedToStorage = (recentlyViewed: Recipe[]): void => {
    try {
        localStorage.setItem(RECENTLY_VIEWED_STORAGE_KEY, JSON.stringify(recentlyViewed));
    } catch (error) {
        console.error("Error saving recently viewed to localStorage:", error);
    }
};

export const RecentlyViewedProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [recentlyViewed, setRecentlyViewed] = useState<Recipe[]>(loadRecentlyViewedFromStorage);

    // Save recently viewed to localStorage whenever it changes
    useEffect(() => {
        saveRecentlyViewedToStorage(recentlyViewed);
    }, [recentlyViewed]);

    const addToRecentlyViewed = (recipe: Recipe) => {
        setRecentlyViewed((prev) => {
            // Remove if already exists
            const filtered = prev.filter((r) => r.id !== recipe.id);
            // Add to beginning and limit to MAX_RECENTLY_VIEWED
            return [recipe, ...filtered].slice(0, MAX_RECENTLY_VIEWED);
        });
    };

    const clearRecentlyViewed = () => {
        setRecentlyViewed([]);
    };

    return (
        <RecentlyViewedContext.Provider value={{ recentlyViewed, addToRecentlyViewed, clearRecentlyViewed }}>
            {children}
        </RecentlyViewedContext.Provider>
    );
};

export const useRecentlyViewed = (): RecentlyViewedContextValue => {
    const ctx = useContext(RecentlyViewedContext);
    if (!ctx) {
        throw new Error("useRecentlyViewed must be used within RecentlyViewedProvider");
    }
    return ctx;
};
