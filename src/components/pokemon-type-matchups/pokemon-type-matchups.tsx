import { useTypeDetails } from "@/hooks/pokemon-queries.ts";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import type { TypeDetail } from "@/model/pokemon.ts";

const ALL_TYPES = [
    "normal", "fire", "water", "electric", "grass", "ice", "fighting",
    "poison", "ground", "flying", "psychic", "bug", "rock", "ghost",
    "dragon", "dark", "steel", "fairy"
];

const TYPE_COLORS: Record<string, { bg: string; border: string; text: string }> = {
    normal: { bg: "bg-[#A8A77A]/10 dark:bg-[#A8A77A]/15", border: "border-[#A8A77A]/30 dark:border-[#A8A77A]/40", text: "text-[#7B7B54] dark:text-[#C4C39F]" },
    fire: { bg: "bg-[#EE8130]/10 dark:bg-[#EE8130]/15", border: "border-[#EE8130]/30 dark:border-[#EE8130]/40", text: "text-[#B3520A] dark:text-[#F39E5C]" },
    water: { bg: "bg-[#6390F0]/10 dark:bg-[#6390F0]/15", border: "border-[#6390F0]/30 dark:border-[#6390F0]/40", text: "text-[#2857C2] dark:text-[#88A9F4]" },
    electric: { bg: "bg-[#F7D02C]/10 dark:bg-[#F7D02C]/15", border: "border-[#F7D02C]/30 dark:border-[#F7D02C]/40", text: "text-[#B39200] dark:text-[#F9DD5C]" },
    grass: { bg: "bg-[#7AC74C]/10 dark:bg-[#7AC74C]/15", border: "border-[#7AC74C]/30 dark:border-[#7AC74C]/40", text: "text-[#4E8E23] dark:text-[#9AD476]" },
    ice: { bg: "bg-[#96D9D6]/10 dark:bg-[#96D9D6]/15", border: "border-[#96D9D6]/30 dark:border-[#96D9D6]/40", text: "text-[#4A9996] dark:text-[#B1E3E1]" },
    fighting: { bg: "bg-[#C22E28]/10 dark:bg-[#C22E28]/15", border: "border-[#C22E28]/30 dark:border-[#C22E28]/40", text: "text-[#8E1C18] dark:text-[#D15C58]" },
    poison: { bg: "bg-[#A33EA1]/10 dark:bg-[#A33EA1]/15", border: "border-[#A33EA1]/30 dark:border-[#A33EA1]/40", text: "text-[#732571] dark:text-[#BA69B8]" },
    ground: { bg: "bg-[#E2BF65]/10 dark:bg-[#E2BF65]/15", border: "border-[#E2BF65]/30 dark:border-[#E2BF65]/40", text: "text-[#9E7F2C] dark:text-[#EACD87]" },
    flying: { bg: "bg-[#A98FF3]/10 dark:bg-[#A98FF3]/15", border: "border-[#A98FF3]/30 dark:border-[#A98FF3]/40", text: "text-[#6B4CBF] dark:text-[#C1AEF7]" },
    psychic: { bg: "bg-[#F95587]/10 dark:bg-[#F95587]/15", border: "border-[#F95587]/30 dark:border-[#F95587]/40", text: "text-[#C21C4F] dark:text-[#FA7CA3]" },
    bug: { bg: "bg-[#A6B91A]/10 dark:bg-[#A6B91A]/15", border: "border-[#A6B91A]/30 dark:border-[#A6B91A]/40", text: "text-[#758309] dark:text-[#C1CE4F]" },
    rock: { bg: "bg-[#B6A136]/10 dark:bg-[#B6A136]/15", border: "border-[#B6A136]/30 dark:border-[#B6A136]/40", text: "text-[#837320] dark:text-[#CDBB62]" },
    ghost: { bg: "bg-[#735797]/10 dark:bg-[#735797]/15", border: "border-[#735797]/30 dark:border-[#735797]/40", text: "text-[#4C3567] dark:text-[#957FBA]" },
    dragon: { bg: "bg-[#6F35FC]/10 dark:bg-[#6F35FC]/15", border: "border-[#6F35FC]/30 dark:border-[#6F35FC]/40", text: "text-[#3D0BC8] dark:text-[#9063FD]" },
    dark: { bg: "bg-[#705746]/10 dark:bg-[#705746]/15", border: "border-[#705746]/30 dark:border-[#705746]/40", text: "text-[#4C3B2F] dark:text-[#927866]" },
    steel: { bg: "bg-[#B7B7CE]/10 dark:bg-[#B7B7CE]/15", border: "border-[#B7B7CE]/30 dark:border-[#B7B7CE]/40", text: "text-[#787895] dark:text-[#CECEDF]" },
    fairy: { bg: "bg-[#D685AD]/10 dark:bg-[#D685AD]/15", border: "border-[#D685AD]/30 dark:border-[#D685AD]/40", text: "text-[#9E4774] dark:text-[#E2A6C4]" }
};

function calculateTypeMatchups(typeDetails: TypeDetail[]): Record<string, number> {
    const matchups: Record<string, number> = {};

    for (const t of ALL_TYPES) {
        matchups[t] = 1.0;
    }

    for (const detail of typeDetails) {
        if (!detail?.damage_relations) continue;

        const rel = detail.damage_relations;

        // Double damage from (2x)
        for (const t of rel.double_damage_from || []) {
            if (matchups[t.name] !== undefined) {
                matchups[t.name] *= 2.0;
            }
        }

        // Half damage from (0.5x)
        for (const t of rel.half_damage_from || []) {
            if (matchups[t.name] !== undefined) {
                matchups[t.name] *= 0.5;
            }
        }

        // No damage from (0x)
        for (const t of rel.no_damage_from || []) {
            if (matchups[t.name] !== undefined) {
                matchups[t.name] *= 0.0;
            }
        }
    }

    return matchups;
}

export default function PokemonTypeMatchups({ types }: { types: string[] }) {
    const queryResults = useTypeDetails(types);

    const isLoading = queryResults.some((q) => q.isLoading);
    const isError = queryResults.some((q) => q.isError);

    if (isLoading) {
        return (
            <section className="space-y-3">
                <h2 className="text-lg font-semibold">Type Matchups</h2>
                <div className="space-y-3">
                    <div className="space-y-1">
                        <Skeleton className="h-4 w-28" />
                        <div className="flex gap-2">
                            <Skeleton className="h-6 w-14 rounded-full" />
                            <Skeleton className="h-6 w-14 rounded-full" />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <Skeleton className="h-4 w-28" />
                        <div className="flex gap-2">
                            <Skeleton className="h-6 w-14 rounded-full" />
                            <Skeleton className="h-6 w-14 rounded-full" />
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (isError) {
        return (
            <section className="space-y-3">
                <h2 className="text-lg font-semibold">Type Matchups</h2>
                <p className="text-xs text-red-500">Failed to load type damage relations.</p>
            </section>
        );
    }

    const typeDetails = queryResults
        .map((q) => q.data as TypeDetail)
        .filter(Boolean);

    const matchups = calculateTypeMatchups(typeDetails);

    const doubleWeak: string[] = [];
    const weak: string[] = [];
    const resist: string[] = [];
    const doubleResist: string[] = [];
    const immune: string[] = [];

    for (const [type, mult] of Object.entries(matchups)) {
        if (mult === 4.0) doubleWeak.push(type);
        else if (mult === 2.0) weak.push(type);
        else if (mult === 0.5) resist.push(type);
        else if (mult === 0.25) doubleResist.push(type);
        else if (mult === 0.0) immune.push(type);
    }

    const groups = [
        {
            label: "Weakness (4x)",
            list: doubleWeak,
            badgeClass: "bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400 font-semibold"
        },
        {
            label: "Weakness (2x)",
            list: weak,
            badgeClass: "bg-orange-500/10 border-orange-500/20 text-orange-600 dark:text-orange-400 font-medium"
        },
        {
            label: "Resistant (0.5x)",
            list: resist,
            badgeClass: "bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400 font-medium"
        },
        {
            label: "Resistant (0.25x)",
            list: doubleResist,
            badgeClass: "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-semibold"
        },
        {
            label: "Immune (0x)",
            list: immune,
            badgeClass: "bg-zinc-500/10 border-zinc-500/20 text-zinc-600 dark:text-zinc-400 font-semibold"
        }
    ].filter((g) => g.list.length > 0);

    return (
        <section className="space-y-4">
            <h2 className="text-lg font-semibold">Type Matchups</h2>
            {groups.length === 0 ? (
                <p className="text-xs text-muted-foreground">Standard (1x) damage from all types.</p>
            ) : (
                <div className="space-y-3">
                    {groups.map((group) => (
                        <div key={group.label} className="space-y-1.5">
                            <div>
                                <span className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded border ${group.badgeClass}`}>
                                    {group.label}
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                {group.list.map((typeName) => {
                                    const colors = TYPE_COLORS[typeName] || {
                                        bg: "bg-muted",
                                        border: "border-border",
                                        text: "text-foreground"
                                    };
                                    return (
                                        <span
                                            key={typeName}
                                            className={`text-[11px] px-2 py-0.5 rounded border capitalize font-semibold ${colors.bg} ${colors.border} ${colors.text}`}
                                        >
                                            {typeName}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
