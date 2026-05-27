import type {PokemonList} from "@/model/pokemon-list.ts";
import type {Pokemon, PokemonSpecies} from "@/model/pokemon.ts";

const API_URL = import.meta.env.VITE_API_URL;

export class ApiError extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.name = "ApiError";
        this.status = status;
    }
}

async function getJson<T>(path: string): Promise<T> {
    const response = await fetch(`${API_URL}${path}`);
    if (!response.ok) {
        throw new ApiError(
            response.status,
            response.status === 404 ? "No results found" : `Request failed (${response.status})`,
        );
    }
    return response.json() as Promise<T>;
}

export function getPokemonList(offset = 0, limit = 20): Promise<PokemonList> {
    return getJson<PokemonList>(`/pokemon?offset=${offset}&limit=${limit}`);
}

export function getPokemon(id: string): Promise<Pokemon> {
    return getJson<Pokemon>(`/pokemon/${id}`);
}

export function getPokemonSpecies(id: string | number): Promise<PokemonSpecies> {
    return getJson<PokemonSpecies>(`/pokemon-species/${id}`);
}
