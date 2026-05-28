import AppHeader from "@/components/app-header/app-header.tsx";
import {useGenerationList, useGeneration} from "@/hooks/pokemon-queries.ts";
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from "@/components/ui/card.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Link} from "react-router";

function GenerationCard({ name }: { name: string }) {
    const { data, isLoading } = useGeneration(name);

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                </CardContent>
            </Card>
        );
    }

    if (!data) return null;

    return (
        <Link to={`/games/${data.name}`} className="block group transition-transform hover:scale-[1.02]">
            <Card className="h-full group-hover:border-primary transition-colors">
                <CardHeader>
                    <CardTitle className="capitalize group-hover:text-primary transition-colors">{data.name.replace(/-/g, ' ')}</CardTitle>
                    <CardDescription className="capitalize">
                        Region: {data.main_region.name}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {data.version_groups.map((vg) => (
                            <Badge key={vg.name} variant="outline" className="capitalize">
                                {vg.name.replace(/-/g, ' ')}
                            </Badge>
                        ))}
                    </div>
                    <div className="text-sm text-muted-foreground">
                        <p>{data.pokemon_species.length} new Pokémon species</p>
                        <p>{data.types.length} new types</p>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}

export default function Games() {
    const { data: genList, isLoading } = useGenerationList();

    return (
        <>
            <AppHeader />
            <div className="container mx-auto py-6 px-4">
                <h1 className="text-3xl font-bold mb-6">Games & Generations</h1>
                
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 9 }).map((_, i) => (
                            <Skeleton key={i} className="h-48 w-full" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {genList?.results.map((gen) => (
                            <GenerationCard key={gen.name} name={gen.name} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
