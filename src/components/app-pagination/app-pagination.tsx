import {ChevronLeft, ChevronRight} from 'lucide-react';

export default function AppPagination(props: {
    total: number,
    page: number,
    pageSize: number,
    onPageChange: (page: number, pageSize: number) => void,
}) {
    const {total, page, pageSize, onPageChange} = props;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    const goToPage = (nextPage: number) => {
        if (nextPage < 1 || nextPage > totalPages || nextPage === page) return;
        onPageChange(nextPage, pageSize);
    };

    const handlePageSizeChange = (newSize: number) => {
        // Reset to the first page when the page size changes.
        onPageChange(1, newSize);
    };

    const visiblePages: number[] = [];
    if (page > 1) visiblePages.push(page - 1);
    visiblePages.push(page);
    if (page < totalPages) visiblePages.push(page + 1);

    return (
        <div className="flex flex-col items-center space-y-4 p-6">
            {/* Pagination Controls */}
            <div className="flex items-center space-x-2">
                {/* Previous Button */}
                <button
                    onClick={() => goToPage(page - 1)}
                    disabled={page === 1}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                >
                    <ChevronLeft className="h-4 w-4"/>
                    <span className="sr-only">Go to previous page</span>
                </button>

                {/* Page Numbers */}
                <div className="flex items-center space-x-1">
                    {visiblePages.map((p) => (
                        <button
                            key={p}
                            onClick={() => goToPage(p)}
                            className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-10 w-10 ${
                                p === page
                                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                                    : 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
                            }`}
                        >
                            {p}
                        </button>
                    ))}
                </div>

                {/* Next Button */}
                <button
                    onClick={() => goToPage(page + 1)}
                    disabled={page === totalPages}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                >
                    <ChevronRight className="h-4 w-4"/>
                    <span className="sr-only">Go to next page</span>
                </button>
            </div>

            {/* Page Size Selector */}
            <div className="flex items-center space-x-2">
                <label htmlFor="pageSize" className="text-sm font-medium">
                    Items per page:
                </label>
                <select
                    id="pageSize"
                    value={pageSize}
                    onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-w-[70px]"
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </div>

        </div>
    );
};
