import AppHeader from "@/components/app-header/app-header.tsx";
import {useParams} from "react-router";
import PokemonCard from "@/components/pokemon-card/pokemon-card.tsx";
import {usePokemon, usePokemonSpecies} from "@/hooks/pokemon-queries.ts";

export default function Pokemon() {
    const params = useParams();
    const {data} = usePokemon(params.id);
    const {data: species} = usePokemonSpecies(data?.species?.name);

    return (
        <>
            <AppHeader/>
            <PokemonCard data={data ?? null} species={species ?? null}/>
        </>
    );
}
