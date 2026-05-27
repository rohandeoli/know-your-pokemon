import "./app-search.css";
import {type KeyboardEvent, useState} from "react";
import {Search} from "lucide-react";
import {ApiError, getPokemon} from "@/api/pokemon.api.ts";
import {Input} from "@/components/ui/input.tsx";
import type {Pokemon} from "@/model/pokemon.ts";

export type SearchError = { status?: number, message?: string };

export default function AppSearch(props: { onSearch: (result: Pokemon | null, error: SearchError | null) => void }) {
    const {onSearch} = props;
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = async () => {
        const query = searchValue.trim().toLowerCase();
        if (!query) return;
        try {
            const result = await getPokemon(query);
            onSearch(result, null);
        } catch (error) {
            if (error instanceof ApiError) {
                onSearch(null, {status: error.status, message: error.message});
            } else {
                onSearch(null, {message: "An error occurred while fetching the results"});
            }
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-6">
            <div className="relative mt-6">
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Search
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4"/>
                        <Input
                            type="text"
                            placeholder="Search pokémon by name..."
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="pl-10"
                        />
                    </div>
                    <button
                        onClick={handleSearch}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
}
