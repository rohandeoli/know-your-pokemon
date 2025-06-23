import "./home.css";
import AppHeader from "@/components/app-header/app-header.tsx";
import AppSearch from "@/components/app-search/app-search.tsx";
import AppCardList from "@/components/app-card-list/app-card-list.tsx";
import {useEffect, useState} from "react";
import type {PokemonList} from "@/model/pokemon-list.ts";
import {getPokemonList} from "@/api/pokemon.api.ts";
import AppPagination from "@/components/app-pagination/app-pagination.tsx";
import AppSearchSheet from "@/components/app-search-sheet/app-search-sheet.tsx";

export default function Home() {

    const [pokemonList, setPokemonList] = useState({});
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [searchValue, setSearchValue] = useState({});
    const [searchSheetOpen, setSearchSheetOpen] = useState(false);


    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const apiResponse: PokemonList = await getPokemonList((page - 1) * pageSize, pageSize);
                setPokemonList(apiResponse);
                setTotal(apiResponse.count);
            } catch (error) {
                console.error('Error fetching Pokemon list:', error);
            }
        };

        fetchPokemon();

    }, [page, pageSize]);

    const handlePageChange = (page: number) => {
        setPage(page);
        setLoading(true);
        setPokemonList({});
        setTotal(0);
        setLoading(false);
    }

    function setSearchResult(result: any) {
        setSearchValue(result);
        setSearchSheetOpen(true);
    }

    return (
        <>
            <AppHeader/>
            <AppSearch setSearchResult={setSearchResult}/>
            <AppCardList pokemonData={pokemonList}/>
            <AppPagination total={total} onPageChange={handlePageChange}/>
            <AppSearchSheet searchSheetOpen={searchSheetOpen} setSearchSheetOpen={setSearchSheetOpen}
                            pokemon={searchValue}/>
        </>
    )
};