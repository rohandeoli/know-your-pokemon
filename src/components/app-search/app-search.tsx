import "./app-search.css";
import {type KeyboardEvent, useState} from "react";
import {Search} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";

export default function AppSearch(props: { onSearch: (query: string) => void, defaultQuery?: string }) {
    const {onSearch, defaultQuery} = props;
    const [searchValue, setSearchValue] = useState(defaultQuery ?? '');

    const submit = () => {
        const query = searchValue.trim().toLowerCase();
        if (!query) return;
        onSearch(query);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            submit();
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
                        onClick={submit}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
}
