import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import type {Pokemon} from "@/model/pokemon.ts"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * Picks the best available sprite. `dream_world` art is missing for many
 * Pokémon, so fall back to official artwork and finally the default sprite.
 */
export function pokemonSprite(pokemon?: Pokemon | null): string | undefined {
    const sprites = pokemon?.sprites
    return (
        sprites?.other?.["official-artwork"]?.front_default ??
        sprites?.other?.dream_world?.front_default ??
        sprites?.front_default ??
        undefined
    )
}
