import {usePokemonEncounters} from "@/hooks/pokemon-queries.ts";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";

export default function PokemonLocations({ pokemonId }: { pokemonId: string }) {
    const { data, isLoading, isError } = usePokemonEncounters(pokemonId);

    if (isLoading) {
        return (
            <Card className="w-full mt-6">
                <CardHeader>
                    <Skeleton className="h-6 w-48" />
                </CardHeader>
                <CardContent className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} className="h-12 w-full" />
                    ))}
                </CardContent>
            </Card>
        );
    }

    if (isError || !data || data.length === 0) {
        return null;
    }

    // Sort locations by version
    const encountersByLocation = data;

    return (
        <Card className="w-full mt-6">
            <CardHeader>
                <CardTitle className="text-xl">Where to Catch</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {encountersByLocation.slice(0, 10).map((encounter) => (
                        <div key={encounter.location_area.name} className="border-b pb-4 last:border-0 last:pb-0">
                            <h3 className="font-semibold capitalize mb-3 text-primary">
                                {encounter.location_area.name.replace(/-/g, ' ')}
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {encounter.version_details.map((vd) => (
                                    <div key={vd.version.name} className="flex flex-col gap-1 p-2 bg-muted/50 rounded-md">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium capitalize">{vd.version.name.replace(/-/g, ' ')}</span>
                                            <Badge variant="outline" className="text-[10px]">{vd.max_chance}% max</Badge>
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {vd.encounter_details.map((ed, idx) => (
                                                <div key={idx} className="flex justify-between">
                                                    <span className="capitalize">{ed.method.name.replace(/-/g, ' ')} (Lv. {ed.min_level}-{ed.max_level})</span>
                                                    <span>{ed.chance}%</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    {encountersByLocation.length > 10 && (
                        <p className="text-xs text-center text-muted-foreground italic">
                            Showing first 10 locations. This Pokémon can be found in {encountersByLocation.length} areas.
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
