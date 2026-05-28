import type {NamedResource, FlavorTextEntry} from "./pokemon.ts";

export interface ItemSprites {
    default: string | null;
}

export interface Item {
    id: number;
    name: string;
    cost: number;
    sprites: ItemSprites;
    flavor_text_entries: FlavorTextEntry[];
    category: NamedResource;
    effect_entries: {
        effect: string;
        short_effect: string;
        language: NamedResource;
    }[];
    held_by_pokemon: {
        pokemon: NamedResource;
        version_details: {
            rarity: number;
            version: NamedResource;
        }[];
    }[];
    machines: {
        machine: { url: string };
        version_group: NamedResource;
    }[];
}

export interface ResourceList {
    count: number;
    next: string | null;
    previous: string | null;
    results: NamedResource[];
}
