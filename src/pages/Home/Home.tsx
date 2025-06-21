import "./home.css";
import AppHeader from "@/components/app-header/app-header.tsx";
import AppSearch from "@/components/app-search/app-search.tsx";
import AppCardList from "@/components/app-card-list/app-card-list.tsx";
import {useEffect, useState} from "react";
import type {PokemonList} from "@/model/pokemon-list.ts";
import {getPokemonList} from "@/api/pokemon.api.ts";

export default function Home() {

    const [pokemonList, setPokemonList] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const apiResponse: PokemonList = await getPokemonList();
                setPokemonList(apiResponse);
            } catch (error) {
                console.error('Error fetching Pokemon list:', error);
            }
        };

        fetchPokemon();

    }, []);

    return (
        <>
            <AppHeader/>
            <AppSearch setPokemonList={setPokemonList}/>
            <AppCardList pokemonData={pokemonList}/>
        </>
    )
};