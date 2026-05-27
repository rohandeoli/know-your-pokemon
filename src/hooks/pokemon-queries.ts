import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {getPokemon, getPokemonList, getPokemonSpecies} from "@/api/pokemon.api.ts";

export const pokemonKeys = {
    list: (offset: number, limit: number) => ["pokemon-list", {offset, limit}] as const,
    detail: (name: string) => ["pokemon", name] as const,
    species: (name: string) => ["pokemon-species", name] as const,
};

export function usePokemonList(page: number, pageSize: number) {
    const offset = Math.max(0, (page - 1) * pageSize);
    return useQuery({
        queryKey: pokemonKeys.list(offset, pageSize),
        queryFn: () => getPokemonList(offset, pageSize),
        placeholderData: keepPreviousData,
    });
}

export function usePokemon(name: string | undefined) {
    return useQuery({
        queryKey: pokemonKeys.detail(name ?? ""),
        queryFn: () => getPokemon(name as string),
        enabled: !!name,
    });
}

export function usePokemonSpecies(name: string | undefined) {
    return useQuery({
        queryKey: pokemonKeys.species(name ?? ""),
        queryFn: () => getPokemonSpecies(name as string),
        enabled: !!name,
    });
}
