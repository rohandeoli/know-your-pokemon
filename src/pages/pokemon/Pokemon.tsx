import {usePokemonDataContext} from "@/components/context/pokemon-data-provider.tsx";
import AppHeader from "@/components/app-header/app-header.tsx";
import {useParams} from "react-router";
import {getPokemon, getPokemonSpecies} from "@/api/pokemon.api.ts";
import {useEffect, useState} from "react";
import PokemonCard from "@/components/pokemon-card/pokemon-card.tsx";
import type {PokemonSpecies} from "@/model/pokemon.ts";

export default function Pokemon() {

    const {data, updateData} = usePokemonDataContext();
    const params = useParams();
    const [species, setSpecies] = useState<PokemonSpecies | null>(null);

    // Fetch the Pokémon when it wasn't handed off via context (e.g. direct link / refresh).
    useEffect(() => {
        if (data) return;
        getPokemon(params.id ?? "")
            .then(updateData)
            .catch((error) => console.error("Error fetching Pokemon:", error));
    }, [data, params.id, updateData]);

    // Species carries the Pokédex flavor text and genus.
    useEffect(() => {
        const speciesName = data?.species?.name;
        if (!speciesName) return;
        getPokemonSpecies(speciesName)
            .then(setSpecies)
            .catch((error) => console.error("Error fetching species:", error));
    }, [data?.species?.name]);

    return (
        <>
            <AppHeader/>
            <PokemonCard data={data} species={species}/>
        </>
    );
}
