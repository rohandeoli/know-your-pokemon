import type {PokemonList} from "@/model/pokemon-list.ts";
import Pokemon from "@/components/pokemon/pokemon.tsx";

export default function AppCardList(props: { pokemonData: PokemonList | null }) {

    const {pokemonData} = props;

    return (
        <div className="flex flex-row flex-wrap gap-3 justify-center">
            {pokemonData?.results?.map((item) => (
                <Pokemon key={item.name} pokemon={item}/>
            ))}
        </div>
    )
}
