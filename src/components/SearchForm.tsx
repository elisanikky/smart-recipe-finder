import type  { FormEvent } from "react";

interface SearchFormProps {
    initialQuery?: string;
    onSearch: (value: string) => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({
                                                          initialQuery = "",
                                                          onSearch
                                                      }) => {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const value = (formData.get("query") as string) ?? "";
        onSearch(value);
    };

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <input
                name="query"
                defaultValue={initialQuery}
                placeholder="Search recipes, ingredients, cuisine..."
            />
            <button type="submit">Search</button>
        </form>
    );
};
