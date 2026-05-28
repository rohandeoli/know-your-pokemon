import {useState} from "react";
import type {PokemonMove} from "@/model/pokemon.ts";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Badge} from "@/components/ui/badge.tsx";

interface FlattenedMove {
    name: string;
    level: number;
    method: string;
}

export default function PokemonMoves({ moves }: { moves: PokemonMove[] }) {
    // Get unique version groups available for this pokemon
    const versionGroups = Array.from(new Set(
        moves.flatMap(m => m.version_group_details.map(v => v.version_group.name))
    )).sort();

    // Default to the latest version group if available
    const [selectedVersion, setSelectedVersion] = useState(versionGroups[versionGroups.length - 1] || "");

    const filteredMoves: FlattenedMove[] = moves
        .map(m => {
            const detail = m.version_group_details.find(v => v.version_group.name === selectedVersion);
            if (!detail) return null;
            return {
                name: m.move.name,
                level: detail.level_learned_at,
                method: detail.move_learn_method.name
            };
        })
        .filter((m): m is FlattenedMove => m !== null)
        .sort((a, b) => {
            // Sort by level, then by name
            if (a.level !== b.level) return a.level - b.level;
            return a.name.localeCompare(b.name);
        });

    const methods = Array.from(new Set(filteredMoves.map(m => m.method))).sort();

    return (
        <Card className="w-full mt-6">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl">Moves List</CardTitle>
                <div className="flex items-center gap-2">
                    <label htmlFor="version-select" className="text-xs font-medium text-muted-foreground">Version:</label>
                    <select 
                        id="version-select"
                        value={selectedVersion}
                        onChange={(e) => setSelectedVersion(e.target.value)}
                        className="text-xs bg-transparent border rounded p-1"
                    >
                        {versionGroups.map(vg => (
                            <option key={vg} value={vg}>{vg.replace(/-/g, ' ')}</option>
                        ))}
                    </select>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {methods.map(method => {
                        const movesInMethod = filteredMoves.filter(m => m.method === method);
                        return (
                            <div key={method} className="space-y-2">
                                <h3 className="text-sm font-semibold capitalize border-b pb-1">
                                    Learned by {method.replace(/-/g, ' ')}
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1">
                                    {movesInMethod.map(move => (
                                        <div key={move.name} className="flex justify-between items-center text-sm py-1 border-b border-dotted last:border-0">
                                            <span className="capitalize">{move.name.replace(/-/g, ' ')}</span>
                                            {move.level > 0 ? (
                                                <Badge variant="outline" className="text-[10px] font-mono">Lv. {move.level}</Badge>
                                            ) : (
                                                <Badge variant="outline" className="text-[10px] opacity-50 capitalize">{method}</Badge>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
