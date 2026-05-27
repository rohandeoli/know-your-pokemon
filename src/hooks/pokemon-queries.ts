import {keepPreviousData, useQuery, useQueries} from "@tanstack/react-query";
import {getPokemon, getPokemonList, getPokemonSpecies, getEvolutionChain, getTypeDetail} from "@/api/pokemon.api.ts";

export const pokemonKeys = {
    list: (offset: number, limit: number) => ["pokemon-list", {offset, limit}] as const,
    detail: (name: string) => ["pokemon", name] as const,
    species: (name: string) => ["pokemon-species", name] as const,
    evolutionChain: (url: string) => ["pokemon-evolution-chain", url] as const,
    type: (name: string) => ["pokemon-type", name] as const,
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

export function useEvolutionChain(url: string | undefined) {
    return useQuery({
        queryKey: pokemonKeys.evolutionChain(url ?? ""),
        queryFn: () => getEvolutionChain(url as string),
        enabled: !!url,
    });
}

export function useTypeDetails(types: string[]) {
    return useQueries({
        queries: (types ?? []).map((typeName) => ({
            queryKey: pokemonKeys.type(typeName),
            queryFn: () => getTypeDetail(typeName),
            enabled: !!typeName,
        })),
    });
}
