import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { RecipeCard } from "../components/RecipeCard";
import type { Recipe } from "../types/recipe";

// Мокаем useFavorites, чтобы не трогать настоящий контекст и useState внутри него
vi.mock("../context/FavoritesContext", () => {
    return {
        useFavorites: () => ({
            favorites: [],
            isFavorite: () => false,
            toggleFavorite: vi.fn()
        })
    };
});

const mockRecipe: Recipe = {
    id: "123",
    name: "Test Meal",
    thumbnail: "https://example.com/img.jpg",
    category: "Test Category",
    area: "Test Area",
    instructions: "Do something",
    ingredients: ["1 test ingredient"]
};

describe("RecipeCard", () => {
    it("renders recipe name and category", () => {
        render(<RecipeCard recipe={mockRecipe} onOpen={() => {}} />);

        expect(screen.getByText("Test Meal")).toBeInTheDocument();
        expect(screen.getByText(/Test Category/i)).toBeInTheDocument();
    });

    it("calls onOpen when 'View details' is clicked", () => {
        const handleOpen = vi.fn();

        render(<RecipeCard recipe={mockRecipe} onOpen={handleOpen} />);

        const button = screen.getByRole("button", { name: /view details/i });
        fireEvent.click(button);

        expect(handleOpen).toHaveBeenCalledTimes(1);
    });

    it("shows 'Add to favourites' button", () => {
        render(<RecipeCard recipe={mockRecipe} onOpen={() => {}} />);

        expect(
            screen.getByRole("button", { name: /add to favourites/i })
        ).toBeInTheDocument();
    });
});
