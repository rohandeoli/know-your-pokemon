import type {PokemonList} from "@/model/pokemon-list.ts";
import Pokemon from "@/components/pokemon/pokemon.tsx";

export default function AppCardList(props: { pokemonData: PokemonList }) {

    const {pokemonData} = props;
    console.log(pokemonData);

    return (
        <>
            <div className="flex flex-row flex-wrap gap-3 justify-center">
                {pokemonData.results?.map(item => {
                    return <Pokemon pokemon={item}/>
                })}
            </div>
        </>
    )
}