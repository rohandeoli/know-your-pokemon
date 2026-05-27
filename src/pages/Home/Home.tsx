import "./home.css";
import AppHeader from "@/components/app-header/app-header.tsx";
import AppSearch, {type SearchError} from "@/components/app-search/app-search.tsx";
import AppCardList from "@/components/app-card-list/app-card-list.tsx";
import {useEffect, useState} from "react";
import type {PokemonList} from "@/model/pokemon-list.ts";
import type {Pokemon} from "@/model/pokemon.ts";
import {getPokemonList} from "@/api/pokemon.api.ts";
import AppPagination from "@/components/app-pagination/app-pagination.tsx";
import AppSearchSheet from "@/components/app-search-sheet/app-search-sheet.tsx";

export default function Home() {

    const [pokemonList, setPokemonList] = useState<PokemonList | null>(null);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [searchResult, setSearchResult] = useState<Pokemon | null>(null);
    const [searchSheetOpen, setSearchSheetOpen] = useState(false);
    const [error, setError] = useState<SearchError | null>(null);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const offset = Math.max(0, (page - 1) * pageSize);
                const apiResponse = await getPokemonList(offset, pageSize);
                setPokemonList(apiResponse);
                setTotal(apiResponse.count);
            } catch (err) {
                console.error('Error fetching Pokemon list:', err);
            }
        };

        fetchPokemon();
    }, [page, pageSize]);

    const handlePageChange = (nextPage: number, nextPageSize: number) => {
        setPage(nextPage);
        setPageSize(nextPageSize);
        setPokemonList(null);
        setTotal(0);
    };

    const showSearchResult = (result: Pokemon | null, searchError: SearchError | null) => {
        setSearchResult(result);
        setError(searchError);
        setSearchSheetOpen(true);
    };

    return (
        <>
            <AppHeader/>
            <AppSearch onSearch={showSearchResult}/>
            <AppCardList pokemonData={pokemonList}/>
            <AppPagination total={total} onPageChange={handlePageChange}/>
            <AppSearchSheet searchSheetOpen={searchSheetOpen} setSearchSheetOpen={setSearchSheetOpen}
                            pokemon={searchResult} error={error ?? undefined}/>
        </>
    )
};
