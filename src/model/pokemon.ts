export interface NamedResource {
    name: string;
    url: string;
}

export interface PokemonSprites {
    front_default: string | null;
    other: {
        dream_world: { front_default: string | null };
        "official-artwork": { front_default: string | null };
    };
}

export interface PokemonTypeSlot {
    slot: number;
    type: NamedResource;
}

export interface PokemonStat {
    base_stat: number;
    effort: number;
    stat: NamedResource;
}

export interface PokemonAbility {
    ability: NamedResource;
    is_hidden: boolean;
    slot: number;
}

export interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    base_experience: number;
    sprites: PokemonSprites;
    types: PokemonTypeSlot[];
    stats: PokemonStat[];
    abilities: PokemonAbility[];
    species: NamedResource;
}

export interface FlavorTextEntry {
    flavor_text: string;
    language: NamedResource;
    version: NamedResource;
}

export interface Genus {
    genus: string;
    language: NamedResource;
}

export interface PokemonSpecies {
    flavor_text_entries: FlavorTextEntry[];
    genera: Genus[];
}
