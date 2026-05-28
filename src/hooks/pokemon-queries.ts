import {keepPreviousData, useQuery, useQueries} from "@tanstack/react-query";
import {
    getPokemon,
    getPokemonList,
    getPokemonEncounters,
    getPokemonSpecies,
    getEvolutionChain,
    getTypeDetail,
    getItemList,
    getItem,
    getGenerationList,
    getGeneration,
    getVersionGroup,
    getVersion
} from "@/api/pokemon.api.ts";

export const pokemonKeys = {
    list: (offset: number, limit: number) => ["pokemon-list", {offset, limit}] as const,
    detail: (name: string) => ["pokemon", name] as const,
    encounters: (id: string) => ["pokemon-encounters", id] as const,
    species: (name: string) => ["pokemon-species", name] as const,
    evolutionChain: (url: string) => ["pokemon-evolution-chain", url] as const,
    type: (name: string) => ["pokemon-type", name] as const,
    itemList: (offset: number, limit: number) => ["item-list", {offset, limit}] as const,
    itemDetail: (idOrName: string | number) => ["item", idOrName] as const,
    generationList: () => ["generation-list"] as const,
    generationDetail: (idOrName: string | number) => ["generation", idOrName] as const,
    versionGroup: (idOrName: string | number) => ["version-group", idOrName] as const,
    version: (idOrName: string | number) => ["version", idOrName] as const,
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

export function useItemList(page: number, pageSize: number) {
    const offset = Math.max(0, (page - 1) * pageSize);
    return useQuery({
        queryKey: pokemonKeys.itemList(offset, pageSize),
        queryFn: () => getItemList(offset, pageSize),
        placeholderData: keepPreviousData,
    });
}

export function useItem(idOrName: string | number | undefined) {
    return useQuery({
        queryKey: pokemonKeys.itemDetail(idOrName ?? ""),
        queryFn: () => getItem(idOrName as string),
        enabled: !!idOrName,
    });
}

export function useGenerationList() {
    return useQuery({
        queryKey: pokemonKeys.generationList(),
        queryFn: () => getGenerationList(),
    });
}

export function useGeneration(idOrName: string | number | undefined) {
    return useQuery({
        queryKey: pokemonKeys.generationDetail(idOrName ?? ""),
        queryFn: () => getGeneration(idOrName as string),
        enabled: !!idOrName,
    });
}

export function useVersionGroup(idOrName: string | number | undefined) {
    return useQuery({
        queryKey: pokemonKeys.versionGroup(idOrName ?? ""),
        queryFn: () => getVersionGroup(idOrName as string),
        enabled: !!idOrName,
    });
}

export function useVersion(idOrName: string | number | undefined) {
    return useQuery({
        queryKey: pokemonKeys.version(idOrName ?? ""),
        queryFn: () => getVersion(idOrName as string),
        enabled: !!idOrName,
    });
}

export function usePokemonEncounters(id: string | undefined) {
    return useQuery({
        queryKey: pokemonKeys.encounters(id ?? ""),
        queryFn: () => getPokemonEncounters(id as string),
        enabled: !!id,
    });
}
