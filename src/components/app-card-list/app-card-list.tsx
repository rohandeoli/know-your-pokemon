import type {PokemonList} from "@/model/pokemon-list.ts";
import Pokemon from "@/components/pokemon/pokemon.tsx";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";

function PokemonCardSkeleton() {
    return (
        <Card className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <CardHeader className="flex items-center justify-between">
                <Skeleton className="h-5 w-24"/>
                <Skeleton className="h-8 w-8"/>
            </CardHeader>
            <CardContent className="h-[200px] flex items-center justify-center">
                <Skeleton className="h-[150px] w-[150px]"/>
            </CardContent>
            <CardFooter className="flex-row gap-2">
                <Skeleton className="h-5 w-12 rounded-full"/>
                <Skeleton className="h-5 w-12 rounded-full"/>
            </CardFooter>
        </Card>
    );
}

export default function AppCardList(props: { pokemonData: PokemonList | null, loading?: boolean, skeletonCount?: number }) {

    const {pokemonData, loading, skeletonCount = 20} = props;
    const showSkeletons = loading && !pokemonData?.results;

    return (
        <div className="flex flex-row flex-wrap gap-3 justify-center">
            {showSkeletons
                ? Array.from({length: skeletonCount}).map((_, i) => <PokemonCardSkeleton key={i}/>)
                : pokemonData?.results?.map((item) => <Pokemon key={item.name} pokemon={item}/>)}
        </div>
    )
}
