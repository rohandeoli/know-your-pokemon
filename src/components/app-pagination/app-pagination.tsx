import {useState} from 'react';
import {ChevronLeft, ChevronRight} from 'lucide-react';

export default function AppPagination(props: any) {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);

    const {total, onPageChange} = props;

    // Mock data for demonstration
    const totalItems = total;
    const totalPages = Math.ceil(totalItems / pageSize);

    const handlePageClick = (page) => {
        setCurrentPage(page);
        // This is where you would call your custom method
        console.log(`Page ${page} clicked with page size ${pageSize}`);
        // Example: onPageChange(page, pageSize);
        onPageChange(page, pageSize);
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            handlePageClick(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            handlePageClick(currentPage + 1);
        }
    };

    const handlePageSizeChange = (newSize) => {
        setPageSize(newSize);
        // Reset to page 1 when changing page size
        setCurrentPage(1);
        console.log(`Page size changed to ${newSize}`);
        // Example: onPageSizeChange(1, newSize);
        onPageChange(1, newSize);
    };

    const getVisiblePages = () => {
        const pages = [];

        // Add previous page if exists
        if (currentPage > 1) {
            pages.push(currentPage - 1);
        }

        // Add current page
        pages.push(currentPage);

        // Add next page if exists
        if (currentPage < totalPages) {
            pages.push(currentPage + 1);
        }

        return pages;
    };

    return (
        <div className="flex flex-col items-center space-y-4 p-6">
            {/* Demo info */}
            {/*<div className="text-sm text-gray-600 mb-4">*/}
            {/*    <p>Total Items: {totalItems} | Page Size: {pageSize} | Total Pages: {totalPages}</p>*/}
            {/*    <p>Showing items {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, totalItems)}</p>*/}
            {/*</div>*/}

            {/* Pagination Controls */}
            <div className="flex items-center space-x-2">
                {/* Previous Button */}
                <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                >
                    <ChevronLeft className="h-4 w-4"/>
                    <span className="sr-only">Go to previous page</span>
                </button>

                {/* Page Numbers */}
                <div className="flex items-center space-x-1">
                    {getVisiblePages().map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageClick(page)}
                            className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-10 w-10 ${
                                page === currentPage
                                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                                    : 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                {/* Next Button */}
                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
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