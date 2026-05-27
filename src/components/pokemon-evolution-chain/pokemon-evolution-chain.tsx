import { useEvolutionChain, usePokemon } from "@/hooks/pokemon-queries.ts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import { pokemonSprite } from "@/lib/utils.ts";
import type { ChainLink, EvolutionDetail } from "@/model/pokemon.ts";

// Helper to clean and capitalize PokéAPI identifier names (e.g., "water-stone" -> "Water Stone")
function formatName(name: string): string {
    return name
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatTrigger(detail?: EvolutionDetail): string {
    if (!detail) return "Special Condition";
    const triggerType = detail.trigger?.name;

    const clean = (name?: string) => name ? formatName(name) : "";

    switch (triggerType) {
        case "level-up":
            if (detail.min_level !== null) {
                let text = `Level ${detail.min_level}`;
                if (detail.time_of_day) {
                    text += ` (${formatName(detail.time_of_day)})`;
                }
                return text;
            }
            if (detail.min_happiness !== null) {
                let text = "High Happiness";
                if (detail.time_of_day) {
                    text += ` (${formatName(detail.time_of_day)})`;
                }
                return text;
            }
            if (detail.location) {
                return `Level up at ${clean(detail.location.name)}`;
            }
            if (detail.known_move) {
                return `Learn ${clean(detail.known_move.name)}`;
            }
            if (detail.known_move_type) {
                return `Learn a ${clean(detail.known_move_type.name)}-type move`;
            }
            if (detail.time_of_day) {
                return `Level up during ${formatName(detail.time_of_day)}`;
            }
            return "Level Up";

        case "use-item":
            return detail.item ? `Use ${clean(detail.item.name)}` : "Use Item";

        case "trade":
            return detail.held_item ? `Trade holding ${clean(detail.held_item.name)}` : "Trade";

        case "shed":
            return "Shed";

        default:
            return "Special Condition";
    }
}

interface EvolutionTransition {
    from: string;
    to: string;
    trigger: string;
}

function traverseChain(link: ChainLink, transitions: EvolutionTransition[] = []): EvolutionTransition[] {
    if (!link.evolves_to || link.evolves_to.length === 0) {
        return transitions;
    }

    for (const nextLink of link.evolves_to) {
        const triggerText = formatTrigger(nextLink.evolution_details?.[0]);
        transitions.push({
            from: link.species.name,
            to: nextLink.species.name,
            trigger: triggerText,
        });
        traverseChain(nextLink, transitions);
    }
    return transitions;
}

// Renders a miniature card of a single Pokemon by fetching its cached details
function EvolutionPokemonCard({ name }: { name: string }) {
    const { data: pokemon, isLoading, isError } = usePokemon(name);
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <div className="w-[130px] h-[120px] flex flex-col justify-center items-center p-2 border rounded-lg bg-card text-card-foreground">
                <Skeleton className="h-12 w-12 rounded-full" />
                <Skeleton className="mt-2 h-3.5 w-16" />
            </div>
        );
    }

    if (isError || !pokemon) {
        return (
            <div className="w-[130px] h-[120px] flex items-center justify-center p-2 border rounded-lg bg-card text-card-foreground text-xs text-muted-foreground">
                Unknown
            </div>
        );
    }

    const sprite = pokemonSprite(pokemon);

    return (
        <div
            onClick={() => navigate(`/pokemon/${pokemon.name}`)}
            className="w-[130px] h-[120px] flex flex-col justify-center items-center p-2 border rounded-lg bg-card text-card-foreground cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-sm border-primary/10 hover:border-primary/30"
        >
            <div className="h-12 w-12 flex items-center justify-center">
                {sprite ? (
                    <img src={sprite} alt={pokemon.name} className="max-h-full max-w-full object-contain" />
                ) : (
                    <span className="text-[10px] text-muted-foreground">No image</span>
                )}
            </div>
            <span className="mt-1.5 text-xs font-semibold capitalize text-center truncate w-full">
                {pokemon.name}
            </span>
            <div className="mt-1 flex gap-1 justify-center flex-wrap">
                {pokemon.types?.map((t) => (
                    <span
                        key={t.type.name}
                        className="text-[9px] px-1 py-0.2 rounded-full capitalize bg-muted font-medium text-muted-foreground border border-muted-foreground/5"
                    >
                        {t.type.name}
                    </span>
                ))}
            </div>
        </div>
    );
}

// Renders the connector arrow and transition details
function EvolutionTransitionRow({ transition }: { transition: EvolutionTransition }) {
    return (
        <div className="flex flex-row items-center justify-center gap-3 p-2 w-full max-w-sm mx-auto">
            <EvolutionPokemonCard name={transition.from} />
            <div className="flex flex-col items-center justify-center text-center flex-1 min-w-[70px]">
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <span className="text-[9px] font-medium text-primary mt-1 capitalize bg-primary/10 px-1.5 py-0.5 rounded border border-primary/15">
                    {transition.trigger}
                </span>
            </div>
            <EvolutionPokemonCard name={transition.to} />
        </div>
    );
}

export default function PokemonEvolutionChain({ url }: { url?: string }) {
    const { data: chainData, isLoading, isError } = useEvolutionChain(url);

    if (!url) return null;

    if (isLoading) {
        return (
            <Card className="w-full mt-6">
                <CardHeader>
                    <CardTitle className="text-lg">Evolution Chain</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center gap-4 py-6">
                    <Skeleton className="h-[120px] w-[130px] rounded-lg" />
                    <div className="w-[70px] flex items-center justify-center">
                        <Skeleton className="h-4 w-12" />
                    </div>
                    <Skeleton className="h-[120px] w-[130px] rounded-lg" />
                </CardContent>
            </Card>
        );
    }

    if (isError || !chainData) {
        return (
            <Card className="w-full mt-6">
                <CardHeader>
                    <CardTitle className="text-lg">Evolution Chain</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-red-500">Failed to load evolution chain.</p>
                </CardContent>
            </Card>
        );
    }

    const transitions = traverseChain(chainData.chain);

    return (
        <Card className="w-full mt-6">
            <CardHeader>
                <CardTitle className="text-lg">Evolution Chain</CardTitle>
            </CardHeader>
            <CardContent>
                {transitions.length === 0 ? (
                    <div className="text-center py-6 text-sm text-muted-foreground">
                        This Pokémon does not evolve.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {transitions.map((t) => (
                            <EvolutionTransitionRow key={`${t.from}-${t.to}`} transition={t} />
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
