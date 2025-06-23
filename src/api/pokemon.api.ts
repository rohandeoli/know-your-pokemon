import type {PokemonList} from "@/model/pokemon-list.ts";

const API_URL = import.meta.env.VITE_API_URL;

export async function getPokemonList(offset: number = 0, limit: number = 20) {
    const apiResponse: any = await fetch(`${API_URL}/pokemon?offset=${offset}&limit=${limit}`);
    const data: PokemonList = await apiResponse.json();
    return data;
}

export async function getPokemon(id: string) {
    const apiResponse: any = await fetch(`${API_URL}/pokemon/${id}`);
    const data: PokemonList = await apiResponse.json();
    return data;
}