import "./home.css";
import AppHeader from "@/components/app-header/app-header.tsx";
import AppSearch from "@/components/app-search/app-search.tsx";
import AppCardList from "@/components/app-card-list/app-card-list.tsx";
import AppPagination from "@/components/app-pagination/app-pagination.tsx";
import AppSearchSheet from "@/components/app-search-sheet/app-search-sheet.tsx";
import {useSearchParams} from "react-router";
import {usePokemon, usePokemonList} from "@/hooks/pokemon-queries.ts";
import {ApiError} from "@/api/pokemon.api.ts";

const PAGE_SIZES = [5, 10, 20, 50, 100];
const DEFAULT_PAGE_SIZE = 20;

type SearchError = { status?: number, message?: string };

export default function Home() {

    // The URL is the source of truth for list/search state: ?page=&pageSize=&q=
    const [searchParams, setSearchParams] = useSearchParams();

    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const pageSizeParam = Number(searchParams.get("pageSize"));
    const pageSize = PAGE_SIZES.includes(pageSizeParam) ? pageSizeParam : DEFAULT_PAGE_SIZE;
    const q = searchParams.get("q") ?? "";

    const listQuery = usePokemonList(page, pageSize);
    const searchQuery = usePokemon(q ? q.toLowerCase() : undefined);

    const setParams = (mutate: (params: URLSearchParams) => void) => {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            mutate(next);
            return next;
        });
    };

    const handlePageChange = (nextPage: number, nextPageSize: number) => {
        setParams((params) => {
            if (nextPage <= 1) params.delete("page"); else params.set("page", String(nextPage));
            if (nextPageSize === DEFAULT_PAGE_SIZE) params.delete("pageSize"); else params.set("pageSize", String(nextPageSize));
        });
    };

    const handleSearch = (query: string) => {
        setParams((params) => {
            params.set("q", query);
        });
    };

    // The search sheet is open whenever there's a `q`; closing it clears the query.
    const handleSheetOpenChange = (open: boolean) => {
        if (!open) {
            setParams((params) => {
                params.delete("q");
            });
        }
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
            <AppSearch defaultQuery={q} onSearch={handleSearch}/>
            <AppCardList pokemonData={listQuery.data ?? null} loading={listQuery.isLoading} skeletonCount={pageSize}/>
            <AppPagination total={listQuery.data?.count ?? 0} page={page} pageSize={pageSize}
                           onPageChange={handlePageChange}/>
            <AppSearchSheet searchSheetOpen={!!q} setSearchSheetOpen={handleSheetOpenChange}
                            pokemon={searchQuery.data ?? null} error={searchError}
                            loading={searchQuery.isLoading}/>
        </>
    )
};
