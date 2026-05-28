import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {pokemonSprite} from "@/lib/utils.ts";
import type {Pokemon, PokemonSpecies} from "@/model/pokemon.ts";
import PokemonEvolutionChain from "@/components/pokemon-evolution-chain/pokemon-evolution-chain.tsx";
import PokemonTypeMatchups from "@/components/pokemon-type-matchups/pokemon-type-matchups.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import PokemonMoves from "@/components/pokemon-moves/pokemon-moves.tsx";
import PokemonLocations from "@/components/pokemon-locations/pokemon-locations.tsx";
import {Volume2} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

const STAT_LABELS: Record<string, string> = {
    "hp": "HP",
    "attack": "Attack",
    "defense": "Defense",
    "special-attack": "Sp. Atk",
    "special-defense": "Sp. Def",
    "speed": "Speed",
};

// PokéAPI flavor text is padded with form-feed / newline control characters.
function englishFlavorText(species: PokemonSpecies | null): string {
    const entry = species?.flavor_text_entries?.find((e) => e.language.name === "en");
    return entry ? entry.flavor_text.replace(/[\n\f\r]+/g, " ") : "";
}

function englishGenus(species: PokemonSpecies | null): string {
    return species?.genera?.find((g) => g.language.name === "en")?.genus ?? "";
}

export function PokemonCardSkeleton() {
    return (
        <Card className="w-[95%] mx-auto mt-10">
            <CardContent className="flex flex-row flex-wrap gap-4 pt-6">
                <Card className="w-full md:w-[30%]">
                    <CardHeader>
                        <Skeleton className="h-6 w-32"/>
                        <Skeleton className="mt-2 h-4 w-24"/>
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="mx-auto h-[220px] w-[220px]"/>
                        <div className="mt-8 flex gap-2">
                            <Skeleton className="h-6 w-16 rounded-full"/>
                            <Skeleton className="h-6 w-16 rounded-full"/>
                        </div>
                        <Skeleton className="mt-8 h-4 w-28"/>
                        <Skeleton className="mt-2 h-4 w-28"/>
                    </CardContent>
                </Card>
                <Card className="w-full md:flex-1">
                    <CardContent className="space-y-8 pt-6">
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-32"/>
                            <Skeleton className="h-4 w-full"/>
                            <Skeleton className="h-4 w-5/6"/>
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-24"/>
                            {Array.from({length: 6}).map((_, i) => (
                                <Skeleton key={i} className="h-3 w-full"/>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    );
}

export default function PokemonCard({data, species}: { data: Pokemon | null, species: PokemonSpecies | null }) {
    if (!data) return null;

    const sprite = pokemonSprite(data);
    const description = englishFlavorText(species);
    const genus = englishGenus(species);

    const playCry = (type: 'latest' | 'legacy') => {
        const url = type === 'latest' ? data.cries.latest : data.cries.legacy;
        if (url) {
            const audio = new Audio(url);
            audio.volume = 0.5;
            audio.play().catch(e => console.error("Error playing cry:", e));
        }
    };

    return (
        <Card className="w-[95%] mx-auto mt-10 mb-10">
            <CardContent className="pt-6">
                <Tabs defaultValue="info" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 mb-8">
                        <TabsTrigger value="info">Info</TabsTrigger>
                        <TabsTrigger value="stats">Stats & Types</TabsTrigger>
                        <TabsTrigger value="moves">Moves</TabsTrigger>
                        <TabsTrigger value="locations">Locations</TabsTrigger>
                    </TabsList>

                    <TabsContent value="info" className="space-y-4 outline-none">
                        <div className="flex flex-row flex-wrap gap-4">
                            {/* Identity */}
                            <Card className="w-full md:w-[35%]">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <CardTitle className="capitalize text-3xl">{data.name}</CardTitle>
                                            <CardDescription className="text-lg">
                                                #{data.id}{genus ? ` · ${genus}` : ""}
                                            </CardDescription>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Button 
                                                variant="outline" 
                                                size="sm" 
                                                className="h-8 w-8 p-0 rounded-full"
                                                onClick={() => playCry('latest')}
                                                title="Play latest cry"
                                            >
                                                <Volume2 className="h-4 w-4" />
                                            </Button>
                                            {data.cries.legacy && (
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm" 
                                                    className="h-8 w-8 p-0 rounded-full"
                                                    onClick={() => playCry('legacy')}
                                                    title="Play legacy cry"
                                                >
                                                    <Volume2 className="h-3 w-3 opacity-50" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    {sprite ? (
                                        <img src={sprite} alt={data.name} className="mx-auto max-h-[300px] w-auto object-contain"/>
                                    ) : (
                                        <div className="flex h-[300px] items-center justify-center text-muted-foreground border rounded-lg">
                                            No image
                                        </div>
                                    )}
                                    <div className="mt-8 flex flex-wrap gap-2 justify-center">
                                        {data.types?.map((type) => (
                                            <Badge key={type.type.name} variant={type.slot === 1 ? 'default' : 'outline'}
                                                   className="capitalize text-sm py-1 px-4">
                                                {type.type.name}
                                            </Badge>
                                        ))}
                                    </div>
                                    <div className="mt-8 grid grid-cols-2 gap-4 text-center">
                                        <div className="p-3 bg-muted rounded-lg">
                                            <div className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Height</div>
                                            <div className="text-lg font-semibold">{data.height / 10} m</div>
                                        </div>
                                        <div className="p-3 bg-muted rounded-lg">
                                            <div className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Weight</div>
                                            <div className="text-lg font-semibold">{data.weight / 10} kg</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="flex-1 space-y-4">
                                {description && (
                                    <Card>
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-xl">Pokédex Entry</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-muted-foreground leading-relaxed italic">"{description}"</p>
                                        </CardContent>
                                    </Card>
                                )}

                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-xl">Abilities</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex flex-wrap gap-2">
                                        {data.abilities?.map((ability) => (
                                            <Badge key={ability.ability.name} variant="secondary" className="capitalize text-sm py-1 px-3">
                                                {ability.ability.name.replace(/-/g, " ")}
                                                {ability.is_hidden ? " (hidden)" : ""}
                                            </Badge>
                                        ))}
                                    </CardContent>
                                </Card>

                                {species?.evolution_chain?.url && (
                                    <PokemonEvolutionChain url={species.evolution_chain.url} />
                                )}
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="stats" className="outline-none">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl">Base Stats</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {data.stats?.map((stat) => {
                                        const label = STAT_LABELS[stat.stat.name] ?? stat.stat.name;
                                        const pct = Math.min(100, Math.round((stat.base_stat / 255) * 100));
                                        return (
                                            <div key={stat.stat.name} className="flex items-center gap-3">
                                                <span className="w-20 shrink-0 text-sm font-medium text-muted-foreground">{label}</span>
                                                <span className="w-10 shrink-0 text-right text-sm font-bold tabular-nums">
                                                    {stat.base_stat}
                                                </span>
                                                <div className="h-3 flex-1 overflow-hidden rounded-full bg-muted">
                                                    <div className="h-full rounded-full bg-primary transition-all duration-500" style={{width: `${pct}%`}}/>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div className="pt-4 border-t text-center">
                                        <span className="text-sm font-bold text-muted-foreground uppercase">Total: </span>
                                        <span className="text-lg font-black">{data.stats?.reduce((acc, s) => acc + s.base_stat, 0)}</span>
                                    </div>
                                </CardContent>
                            </Card>

                            <PokemonTypeMatchups types={data.types?.map((t) => t.type.name) ?? []} />
                        </div>
                    </TabsContent>

                    <TabsContent value="moves" className="outline-none">
                        <PokemonMoves moves={data.moves} />
                    </TabsContent>

                    <TabsContent value="locations" className="outline-none">
                        <PokemonLocations pokemonId={data.id.toString()} />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
