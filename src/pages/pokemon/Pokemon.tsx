import {usePokemonDataContext} from "@/components/context/pokemon-data-provider.tsx";
import AppHeader from "@/components/app-header/app-header.tsx";
import {useParams} from "react-router";
import {getPokemon} from "@/api/pokemon.api.ts";
import {useEffect} from "react";
import PokemonCard from "@/components/pokemon-card/pokemon-card.tsx";

const getPokemonDataFromName = async (params) => {

    const name = params.id || '';
    const res = await getPokemon(name);
    return res;
}

export default function Pokemon() {

    const {data, updateData} = usePokemonDataContext();
    const params = useParams();

    useEffect(() => {
        const fetchData = async () => {
            if (!data) {
                try {
                    const result = await getPokemonDataFromName(params);
                    updateData(result); // Update the context with the fetched data
                } catch (error) {
                    console.error('Error fetching Pokemon:', error);
                }
            }
        };

        fetchData();
    }, [data, params]); // Dependencies array

    console.log(data);
    return (
        <>
            <AppHeader/>
            <PokemonCard data={data}/>
        </>
    );
};