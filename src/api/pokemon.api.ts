import type {PokemonList} from "@/model/pokemon-list.ts";
import type {Pokemon, PokemonSpecies, EvolutionChain, TypeDetail, LocationAreaEncounter} from "@/model/pokemon.ts";
import type {Item, ResourceList} from "@/model/item.ts";
import type {Generation, VersionGroup, Version} from "@/model/game.ts";

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

export function getPokemonEncounters(id: string): Promise<LocationAreaEncounter[]> {
    return getJson<LocationAreaEncounter[]>(`/pokemon/${id}/encounters`);
}

export function getPokemonSpecies(id: string | number): Promise<PokemonSpecies> {
    return getJson<PokemonSpecies>(`/pokemon-species/${id}`);
}

export function getEvolutionChain(url: string): Promise<EvolutionChain> {
    const path = url.replace(API_URL, "");
    return getJson<EvolutionChain>(path);
}

export function getTypeDetail(name: string): Promise<TypeDetail> {
    return getJson<TypeDetail>(`/type/${name}`);
}

export function getItemList(offset = 0, limit = 20): Promise<ResourceList> {
    return getJson<ResourceList>(`/item?offset=${offset}&limit=${limit}`);
}

export function getItem(idOrName: string | number): Promise<Item> {
    return getJson<Item>(`/item/${idOrName}`);
}

export function getGenerationList(): Promise<ResourceList> {
    return getJson<ResourceList>(`/generation`);
}

export function getGeneration(idOrName: string | number): Promise<Generation> {
    return getJson<Generation>(`/generation/${idOrName}`);
}

export function getVersionGroup(idOrName: string | number): Promise<VersionGroup> {
    return getJson<VersionGroup>(`/version-group/${idOrName}`);
}

export function getVersion(idOrName: string | number): Promise<Version> {
    return getJson<Version>(`/version/${idOrName}`);
}
