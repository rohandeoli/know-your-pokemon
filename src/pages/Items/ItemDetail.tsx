import {useParams, Link} from "react-router";
import {useItem} from "@/hooks/pokemon-queries.ts";
import AppHeader from "@/components/app-header/app-header.tsx";
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from "@/components/ui/card.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {ChevronLeft} from "lucide-react";

export default function ItemDetail() {
    const { id } = useParams();
    const { data, isLoading, isError } = useItem(id);

    if (isLoading) {
        return (
            <>
                <AppHeader />
                <div className="container mx-auto py-10 px-4">
                    <Skeleton className="h-[400px] w-full max-w-4xl mx-auto" />
                </div>
            </>
        );
    }

    if (isError || !data) {
        return (
            <>
                <AppHeader />
                <div className="text-center py-20">Item not found.</div>
            </>
        );
    }

    const flavorText = data.flavor_text_entries.find(e => e.language.name === 'en')?.flavor_text.replace(/[\n\f\r]+/g, " ");
    const effect = data.effect_entries.find(e => e.language.name === 'en')?.effect;

    return (
        <>
            <AppHeader />
            <div className="container mx-auto py-10 px-4">
                <Link to="/items" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
                    <ChevronLeft className="h-4 w-4 mr-1" /> Back to Items
                </Link>

                <Card className="max-w-4xl mx-auto">
                    <CardHeader className="flex flex-col md:flex-row items-center gap-6 border-b pb-6">
                        {data.sprites.default && (
                            <img 
                                src={data.sprites.default} 
                                alt={data.name} 
                                className="h-24 w-24 object-contain rendering-pixelated bg-muted p-4 rounded-lg"
                            />
                        )}
                        <div className="text-center md:text-left flex-1">
                            <CardTitle className="text-4xl capitalize mb-2">{data.name.replace(/-/g, ' ')}</CardTitle>
                            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-2">
                                <Badge variant="secondary" className="capitalize text-md py-1 px-3">
                                    {data.category.name.replace(/-/g, ' ')}
                                </Badge>
                                <Badge variant="outline" className="text-md py-1 px-3">
                                    Cost: {data.cost} Poké
                                </Badge>
                            </div>
                            <CardDescription className="text-lg">
                                #{data.id}
                            </CardDescription>
                        </div>
                    </CardHeader>

                    <CardContent className="pt-8 space-y-10">
                        {flavorText && (
                            <section>
                                <h3 className="text-xl font-semibold mb-3">Description</h3>
                                <p className="text-muted-foreground leading-relaxed">{flavorText}</p>
                            </section>
                        )}

                        {effect && (
                            <section>
                                <h3 className="text-xl font-semibold mb-3">Effect</h3>
                                <p className="text-muted-foreground leading-relaxed">{effect}</p>
                            </section>
                        )}

                        {data.held_by_pokemon.length > 0 && (
                            <section>
                                <h3 className="text-xl font-semibold mb-4">Held by Pokémon</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {data.held_by_pokemon.map((entry) => (
                                        <Link 
                                            key={entry.pokemon.name} 
                                            to={`/pokemon/${entry.pokemon.name}`}
                                            className="flex items-center p-3 border rounded-lg hover:bg-muted transition-colors"
                                        >
                                            <span className="capitalize font-medium">{entry.pokemon.name.replace(/-/g, ' ')}</span>
                                            <Badge variant="secondary" className="ml-auto text-xs">
                                                {entry.version_details[0].rarity}% chance
                                            </Badge>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
