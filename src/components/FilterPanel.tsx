import React, { useState } from "react";
import type { Recipe } from "../types/recipe";

interface FilterPanelProps {
    recipes: Recipe[];
    onFilterChange: (filters: RecipeFilters) => void;
}

export interface RecipeFilters {
    category: string;
    area: string;
    searchQuery: string;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ recipes, onFilterChange }) => {
    const [filters, setFilters] = useState<RecipeFilters>({
        category: "",
        area: "",
        searchQuery: "",
    });
    const [isExpanded, setIsExpanded] = useState(true);

    // Get unique categories and areas from recipes
    const categories = Array.from(new Set(recipes.map(r => r.category))).sort();
    const areas = Array.from(new Set(recipes.map(r => r.area))).sort();

    const handleFilterChange = (key: keyof RecipeFilters, value: string) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const clearFilters = () => {
        const clearedFilters = { category: "", area: "", searchQuery: "" };
        setFilters(clearedFilters);
        onFilterChange(clearedFilters);
    };

    const hasActiveFilters = filters.category || filters.area || filters.searchQuery;

    return (
        <div className="filter-panel">
            <button
                className="filter-toggle"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                Filters {hasActiveFilters && <span className="filter-indicator">*</span>}
            </button>

            {isExpanded && (
                <div className="filter-content">
                    {recipes.length === 0 ? (
                        <p className="filter-message">Search for recipes first to see filtering options.</p>
                    ) : (
                        <>
                            <div className="filter-row">
                                <div className="filter-group">
                                    <label htmlFor="category-filter">Category:</label>
                                    <select
                                        id="category-filter"
                                        value={filters.category}
                                        onChange={(e) => handleFilterChange("category", e.target.value)}
                                    >
                                        <option value="">All Categories</option>
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="filter-group">
                                    <label htmlFor="area-filter">Cuisine:</label>
                                    <select
                                        id="area-filter"
                                        value={filters.area}
                                        onChange={(e) => handleFilterChange("area", e.target.value)}
                                    >
                                        <option value="">All Cuisines</option>
                                        {areas.map(area => (
                                            <option key={area} value={area}>{area}</option>
                                        ))}
                                    </select>
                                </div>

                        <div className="filter-group">
                            <label htmlFor="search-filter">Filter:</label>
                            <input
                                id="search-filter"
                                type="text"
                                placeholder="Filter current results..."
                                value={filters.searchQuery}
                                onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
                            />
                        </div>
                            </div>

                            {hasActiveFilters && (
                                <button className="clear-filters-btn" onClick={clearFilters}>
                                    Clear Filters
                                </button>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};
