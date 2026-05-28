import AppHeader from "@/components/app-header/app-header.tsx";
import AppSearch from "@/components/app-search/app-search.tsx";
import AppItemList from "@/components/app-item-list/app-item-list.tsx";
import AppPagination from "@/components/app-pagination/app-pagination.tsx";
import {useSearchParams} from "react-router";
import {useItem, useItemList} from "@/hooks/pokemon-queries.ts";
import {ApiError} from "@/api/pokemon.api.ts";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import ItemCard from "@/components/item-card/item-card.tsx";

const PAGE_SIZES = [10, 20, 50, 100];
const DEFAULT_PAGE_SIZE = 20;

export default function Items() {
    const [searchParams, setSearchParams] = useSearchParams();

    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const pageSizeParam = Number(searchParams.get("pageSize"));
    const pageSize = PAGE_SIZES.includes(pageSizeParam) ? pageSizeParam : DEFAULT_PAGE_SIZE;
    const q = searchParams.get("q") ?? "";

    const listQuery = useItemList(page, pageSize);
    const searchQuery = useItem(q ? q.toLowerCase().replace(/ /g, '-') : undefined);

    const listError = listQuery.error instanceof ApiError ? listQuery.error.message : "Failed to load items.";

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
            if (query) params.set("q", query); else params.delete("q");
        });
    };

    const isError404 = searchQuery.error instanceof ApiError && searchQuery.error.status === 404;

    return (
        <>
            <AppHeader />
            <div className="container mx-auto py-6">
                <h1 className="text-3xl font-bold mb-6 px-4">Items</h1>
                <AppSearch defaultQuery={q} onSearch={handleSearch} />
                
                {listQuery.isError ? (
                    <div className="flex h-64 flex-col items-center justify-center gap-4 text-center">
                        <p className="text-lg text-destructive">{listError}</p>
                        <button 
                            onClick={() => listQuery.refetch()}
                            className="px-4 py-2 border rounded hover:bg-muted"
                        >
                            Try again
                        </button>
                    </div>
                ) : (
                    <>
                        <AppItemList 
                            itemData={listQuery.data ?? null} 
                            loading={listQuery.isLoading} 
                            skeletonCount={pageSize} 
                        />
                        <AppPagination 
                            total={listQuery.data?.count ?? 0} 
                            page={page} 
                            pageSize={pageSize}
                            onPageChange={handlePageChange} 
                        />
                    </>
                )}
            </div>

            <Sheet open={!!q} onOpenChange={(open) => !open && handleSearch("")}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Item Search Result</SheetTitle>
                        <SheetDescription>
                            Showing result for "{q}"
                        </SheetDescription>
                    </SheetHeader>
                    <div className="mt-6">
                        {searchQuery.isLoading ? (
                            <div className="flex justify-center p-8">Searching...</div>
                        ) : isError404 ? (
                            <div className="text-center p-8 text-muted-foreground">No item found with that name.</div>
                        ) : searchQuery.data ? (
                            <ItemCard name={searchQuery.data.name} />
                        ) : null}
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
}
