import type {NamedResource} from "./pokemon.ts";

export interface Generation {
    id: number;
    name: string;
    main_region: NamedResource;
    pokemon_species: NamedResource[];
    types: NamedResource[];
    version_groups: NamedResource[];
    abilities: NamedResource[];
    moves: NamedResource[];
}

export interface VersionGroup {
    id: number;
    name: string;
    generation: NamedResource;
    versions: NamedResource[];
}

export interface Version {
    id: number;
    name: string;
    version_group: NamedResource;
}
