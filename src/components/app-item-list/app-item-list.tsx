import ItemCard, {ItemCardSkeleton} from "@/components/item-card/item-card.tsx";
import type {ResourceList} from "@/model/item.ts";

interface AppItemListProps {
    itemData: ResourceList | null;
    loading: boolean;
    skeletonCount: number;
}

export default function AppItemList({ itemData, loading, skeletonCount }: AppItemListProps) {
    if (loading) {
        return (
            <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {Array.from({ length: skeletonCount }).map((_, i) => (
                    <ItemCardSkeleton key={i} />
                ))}
            </div>
        );
    }

    if (!itemData || !Array.isArray(itemData.results) || itemData.results.length === 0) {
        return (
            <div className="flex h-64 items-center justify-center text-muted-foreground">
                No items found.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {itemData.results.map((item) => (
                <ItemCard key={item.name} name={item.name} />
            ))}
        </div>
    );
}
