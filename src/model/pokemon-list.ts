export interface PokemonList {
    count: number;
    next: string | null;
    previous: string | null;
    results: Result[] | null;
}

interface Result {
    name: string;
    url: string;
}