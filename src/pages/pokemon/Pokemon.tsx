import AppHeader from "@/components/app-header/app-header.tsx";
import {useParams} from "react-router";
import PokemonCard, {PokemonCardSkeleton} from "@/components/pokemon-card/pokemon-card.tsx";
import {usePokemon, usePokemonSpecies} from "@/hooks/pokemon-queries.ts";

export default function Pokemon() {
    const params = useParams();
    const {data, isLoading, isError} = usePokemon(params.id);
    const {data: species} = usePokemonSpecies(data?.species?.name);

    return (
        <>
            <AppHeader/>
            {isLoading ? (
                <PokemonCardSkeleton/>
            ) : isError || !data ? (
                <p className="mt-10 text-center text-lg text-muted-foreground">Pokémon not found.</p>
            ) : (
                <PokemonCard data={data} species={species ?? null}/>
            )}
        </>
    );
}
