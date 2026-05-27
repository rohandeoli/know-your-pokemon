import {Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Fullscreen} from "lucide-react";
import {useNavigate} from "react-router";
import {Badge} from "@/components/ui/badge.tsx";
import {usePokemon} from "@/hooks/pokemon-queries.ts";
import {pokemonSprite} from "@/lib/utils.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";

export default function Pokemon(props: { pokemon: { name: string }, isSearch?: boolean }) {
    const {pokemon, isSearch} = props;
    const {data: pokeData, isLoading} = usePokemon(pokemon.name);
    const navigate = useNavigate();

    const handleOpen = () => {
        navigate(`/pokemon/${pokemon.name}`);
    };

    const sprite = pokemonSprite(pokeData);

    return (
        <Card
            className={`w-full ${isSearch ? '' : 'sm:w-1/2 md:w-1/3 lg:w-1/4'} transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer`}>
            <CardHeader className="flex items-center justify-between">
                <CardTitle className="capitalize">{pokemon.name}</CardTitle>
                <CardAction>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleOpen}
                        className="text-primary hover:text-primary/80"
                    >
                        <Fullscreen className="h-5 w-5"/>
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent className="h-[200px] flex items-center justify-center">
                {isLoading ? (
                    <Skeleton className="h-[150px] w-[150px]"/>
                ) : sprite ? (
                    <img
                        src={sprite}
                        alt={pokemon.name}
                        loading="lazy"
                        className="max-h-[180px] w-auto object-contain"
                    />
                ) : (
                    <span className="text-sm text-muted-foreground">No image</span>
                )}
            </CardContent>
            <CardFooter className="flex-row gap-2">
                {isLoading ? (
                    <>
                        <Skeleton className="h-5 w-12 rounded-full"/>
                        <Skeleton className="h-5 w-12 rounded-full"/>
                    </>
                ) : (
                    pokeData?.types?.map((type) => (
                        <Badge key={type.type.name} variant={type.slot === 1 ? 'default' : 'outline'}
                               className="capitalize">
                            {type.type.name}
                        </Badge>
                    ))
                )}
            </CardFooter>
        </Card>
    );
}
