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
    evolution_chain?: NamedResource;
}

export interface EvolutionDetail {
    item: NamedResource | null;
    trigger: NamedResource;
    gender: number | null;
    held_item: NamedResource | null;
    known_move: NamedResource | null;
    known_move_type: NamedResource | null;
    location: NamedResource | null;
    min_level: number | null;
    min_happiness: number | null;
    min_beauty: number | null;
    min_affection: number | null;
    needs_overworld_rain: boolean;
    party_species: NamedResource | null;
    party_type: NamedResource | null;
    relative_physical_stats: number | null;
    time_of_day: string;
    trade_species: NamedResource | null;
    turn_upside_down: boolean;
}

export interface ChainLink {
    is_baby: boolean;
    species: NamedResource;
    evolution_details: EvolutionDetail[];
    evolves_to: ChainLink[];
}

export interface EvolutionChain {
    id: number;
    baby_trigger_item: NamedResource | null;
    chain: ChainLink;
}

export interface TypeRelations {
    double_damage_from: NamedResource[];
    double_damage_to: NamedResource[];
    half_damage_from: NamedResource[];
    half_damage_to: NamedResource[];
    no_damage_from: NamedResource[];
    no_damage_to: NamedResource[];
}

export interface TypeDetail {
    id: number;
    name: string;
    damage_relations: TypeRelations;
}
