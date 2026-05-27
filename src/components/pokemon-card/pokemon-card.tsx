import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {pokemonSprite} from "@/lib/utils.ts";
import type {Pokemon, PokemonSpecies} from "@/model/pokemon.ts";
import PokemonEvolutionChain from "@/components/pokemon-evolution-chain/pokemon-evolution-chain.tsx";
import PokemonTypeMatchups from "@/components/pokemon-type-matchups/pokemon-type-matchups.tsx";

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
            <CardContent className="flex flex-row flex-wrap gap-4">
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

    return (
        <Card className="w-[95%] mx-auto mt-10">
            <CardContent className="flex flex-row flex-wrap gap-4">
                {/* Identity */}
                <Card className="w-full md:w-[30%]">
                    <CardHeader>
                        <CardTitle className="capitalize">{data.name}</CardTitle>
                        <CardDescription>
                            #{data.id}{genus ? ` · ${genus}` : ""}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {sprite ? (
                            <img src={sprite} alt={data.name} className="mx-auto max-h-[220px] w-auto object-contain"/>
                        ) : (
                            <div className="flex h-[220px] items-center justify-center text-muted-foreground">
                                No image
                            </div>
                        )}
                        <div className="mt-8 flex flex-wrap gap-2">
                            {data.types?.map((type) => (
                                <Badge key={type.type.name} variant={type.slot === 1 ? 'default' : 'outline'}
                                       className="capitalize">
                                    {type.type.name}
                                </Badge>
                            ))}
                        </div>
                        <div className="mt-8">
                            <em className="font-bold">Height:</em> {data.height / 10} m
                        </div>
                        <div className="mt-2">
                            <em className="font-bold">Weight:</em> {data.weight / 10} kg
                        </div>
                    </CardContent>
                </Card>

                {/* Pokédex entry, base stats, abilities */}
                <Card className="w-full md:flex-1">
                    <CardContent className="space-y-8 pt-6">
                        {description && (
                            <section>
                                <h2 className="mb-2 text-lg font-semibold">Pokédex entry</h2>
                                <p className="text-sm text-muted-foreground">{description}</p>
                            </section>
                        )}

                        <section>
                            <h2 className="mb-3 text-lg font-semibold">Base stats</h2>
                            <div className="space-y-2">
                                {data.stats?.map((stat) => {
                                    const label = STAT_LABELS[stat.stat.name] ?? stat.stat.name;
                                    const pct = Math.min(100, Math.round((stat.base_stat / 255) * 100));
                                    return (
                                        <div key={stat.stat.name} className="flex items-center gap-3">
                                            <span className="w-16 shrink-0 text-sm text-muted-foreground">{label}</span>
                                            <span className="w-8 shrink-0 text-right text-sm font-medium tabular-nums">
                                                {stat.base_stat}
                                            </span>
                                            <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                                                <div className="h-full rounded-full bg-primary" style={{width: `${pct}%`}}/>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                        <section>
                            <h2 className="mb-3 text-lg font-semibold">Abilities</h2>
                            <div className="flex flex-wrap gap-2">
                                {data.abilities?.map((ability) => (
                                    <Badge key={ability.ability.name} variant="outline" className="capitalize">
                                        {ability.ability.name.replace(/-/g, " ")}
                                        {ability.is_hidden ? " (hidden)" : ""}
                                    </Badge>
                                ))}
                            </div>
                        </section>

                        <PokemonTypeMatchups types={data.types?.map((t) => t.type.name) ?? []} />
                    </CardContent>
                </Card>
                
                {species?.evolution_chain?.url && (
                    <PokemonEvolutionChain url={species.evolution_chain.url} />
                )}
            </CardContent>
        </Card>
    );
}
