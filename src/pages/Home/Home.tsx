import "./home.css";
import AppHeader from "@/components/app-header/app-header.tsx";
import AppSearch from "@/components/app-search/app-search.tsx";
import AppCardList from "@/components/app-card-list/app-card-list.tsx";
import {useState} from "react";
import AppPagination from "@/components/app-pagination/app-pagination.tsx";
import AppSearchSheet from "@/components/app-search-sheet/app-search-sheet.tsx";
import {usePokemon, usePokemonList} from "@/hooks/pokemon-queries.ts";
import {ApiError} from "@/api/pokemon.api.ts";

type SearchError = { status?: number, message?: string };

export default function Home() {

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [submittedQuery, setSubmittedQuery] = useState('');
    const [searchSheetOpen, setSearchSheetOpen] = useState(false);

    const listQuery = usePokemonList(page, pageSize);
    const searchQuery = usePokemon(submittedQuery || undefined);

    const handlePageChange = (nextPage: number, nextPageSize: number) => {
        setPage(nextPage);
        setPageSize(nextPageSize);
    };

    const handleSearch = (query: string) => {
        setSubmittedQuery(query);
        setSearchSheetOpen(true);
    };

    const searchError: SearchError | undefined =
        searchQuery.error instanceof ApiError
            ? {status: searchQuery.error.status, message: searchQuery.error.message}
            : searchQuery.error
                ? {message: searchQuery.error.message}
                : undefined;

    return (
        <>
            <AppHeader/>
            <AppSearch onSearch={handleSearch}/>
            <AppCardList pokemonData={listQuery.data ?? null}/>
            <AppPagination total={listQuery.data?.count ?? 0} onPageChange={handlePageChange}/>
            <AppSearchSheet searchSheetOpen={searchSheetOpen} setSearchSheetOpen={setSearchSheetOpen}
                            pokemon={searchQuery.data ?? null} error={searchError}
                            loading={searchQuery.isLoading}/>
        </>
    )
};
