import "./app-search.css";
import {forwardRef, useState} from "react";
import {Search} from "lucide-react";
import {getPokemon} from "@/api/pokemon.api.ts";

const Input = forwardRef(({className, type, ...props}, ref) => {
    return (
        <input
            type={type}
            className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className || ''}`}
            ref={ref}
            {...props}
        />
    )
});

export default function AppSearch(props: { setSearchResult: any }) {
    const {setSearchResult} = props;
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = async () => {
        console.log('Searching for:', searchValue);
        const searchQuery = searchValue.trim();
        const result = await getPokemon(searchQuery);
        setSearchResult(result);
        // Add your search logic here
    };

    const handleKeyPress = (e) => {
        console.log('Key pressed:', e.key);
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <>
            <div className="w-full max-w-md mx-auto p-6">
                <div className="relative">
                    <div className="mt-6">
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <Search
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4"/>
                                <Input
                                    type="text"
                                    placeholder="Search pokemons by name..."
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    className="pl-10"
                                    onKeyPress={(e) => handleKeyPress(e)}
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
            </div>
        </>
    );
};