import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {useItem} from "@/hooks/pokemon-queries.ts";
import {Badge} from "@/components/ui/badge.tsx";
import {Link} from "react-router";

export function ItemCardSkeleton() {
    return (
        <Card className="h-full">
            <CardHeader className="pb-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="mt-2 h-4 w-1/2" />
            </CardHeader>
            <CardContent>
                <Skeleton className="mx-auto h-12 w-12" />
                <Skeleton className="mt-4 h-4 w-full" />
                <Skeleton className="mt-2 h-4 w-5/6" />
            </CardContent>
        </Card>
    );
}

export default function ItemCard({ name }: { name: string }) {
    const { data, isLoading, isError } = useItem(name);

    if (isLoading) return <ItemCardSkeleton />;
    if (isError || !data) return null;

    const flavorTextEntry = data.flavor_text_entries.find(e => e.language.name === 'en');
    const flavorText = flavorTextEntry?.flavor_text?.replace(/[\n\f\r]+/g, " ");

    return (
        <Link to={`/items/${data.name}`} className="block group transition-transform hover:scale-[1.02]">
            <Card className="h-full flex flex-col group-hover:border-primary transition-colors">
                <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                        <CardTitle className="capitalize text-lg group-hover:text-primary transition-colors">{data.name.replace(/-/g, ' ')}</CardTitle>
                        <Badge variant="secondary" className="capitalize">
                            {data.category.name.replace(/-/g, ' ')}
                        </Badge>
                    </div>
                    <CardDescription>
                        Cost: {data.cost} Poké
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col gap-4">
                    {data.sprites.default && (
                        <img 
                            src={data.sprites.default} 
                            alt={data.name} 
                            className="mx-auto h-12 w-12 object-contain rendering-pixelated"
                        />
                    )}
                    {flavorText && (
                        <p className="text-sm text-muted-foreground line-clamp-3">
                            {flavorText}
                        </p>
                    )}
                </CardContent>
            </Card>
        </Link>
    );
}
