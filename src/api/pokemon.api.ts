import type {PokemonList} from "@/model/pokemon-list.ts";

const API_URL = import.meta.env.VITE_API_URL;

export async function getPokemonList() {
    const apiResponse: any = await fetch(`${API_URL}/pokemon`);
    const data: PokemonList = await apiResponse.json();
    return data;
}

export async function getPokemon(id: string) {
    const apiResponse: any = await fetch(`${API_URL}/pokemon/${id}`);
    const data: PokemonList = await apiResponse.json();
    return data;
}