import {Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Fullscreen} from "lucide-react";
import {useEffect, useState} from "react";
import {getPokemon} from "@/api/pokemon.api.ts";
import {Badge} from "@/components/ui/badge.tsx";
import {useNavigate} from "react-router";
import {usePokemonDataContext} from "@/components/context/pokemon-data-provider.tsx";

const IconButton = (props: any) => {
    const {navigate, pokemon, setData} = props;

    const handleClick = () => {
        setData(pokemon);
        navigate(`/pokemon/${pokemon.name}`);
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={handleClick}
            className="text-primary hover:text-primary/80"
        >
            <Fullscreen className="h-5 w-5"/>
        </Button>
    );
};


export default function Pokemon(props: { pokemon: any, isSearch?: boolean }) {
    const {pokemon, isSearch} = props;
    const [pokeData, setPokeData] = useState<any>({});
    const navigate = useNavigate();
    const {updateData} = usePokemonDataContext();

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const apiResponse: any = await getPokemon(pokemon.name);
                setPokeData(apiResponse);
            } catch (error) {
                console.error('Error fetching Pokemon list:', error);
            }
        };
        fetchPokemon();
    }, []);


    return (
        <>
            <Card
                className={`w-full ${isSearch ? '' : 'sm:w-1/2 md:w-1/3 lg:w-1/4'} transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer`}>
                <CardHeader className="flex items-center justify-between">
                    <CardTitle>{pokemon.name}</CardTitle>
                    <CardAction>
                        <IconButton navigate={navigate} pokemon={pokeData} setData={updateData}/>
                    </CardAction>
                </CardHeader>
                <CardContent className="h-[200px] flex items-center justify-center">
                    <img
                        src={pokeData?.sprites?.other.dream_world.front_default}
                        alt={pokemon.name}
                        className="max-h-[180px] w-auto object-contain"
                    />
                </CardContent>
                <CardFooter className="flex-row">
                    {pokeData?.types?.map((type: any, index: number) => {
                        return <Badge variant={index == 0 ? 'default' : 'outline'}
                                      className="mr-2">{type.type.name}</Badge>
                    })}
                </CardFooter>
            </Card>
        </>
    );
}