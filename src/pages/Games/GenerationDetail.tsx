import {useParams, Link} from "react-router";
import {useGeneration} from "@/hooks/pokemon-queries.ts";
import AppHeader from "@/components/app-header/app-header.tsx";
import {Card, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {ChevronLeft, Users, Zap, BookOpen} from "lucide-react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";

export default function GenerationDetail() {
    const { id } = useParams();
    const { data, isLoading, isError } = useGeneration(id);

    if (isLoading) {
        return (
            <>
                <AppHeader />
                <div className="container mx-auto py-10 px-4">
                    <Skeleton className="h-[500px] w-full max-w-5xl mx-auto" />
                </div>
            </>
        );
    }

    if (isError || !data) {
        return (
            <>
                <AppHeader />
                <div className="text-center py-20">Generation not found.</div>
            </>
        );
    }

    return (
        <>
            <AppHeader />
            <div className="container mx-auto py-10 px-4">
                <Link to="/games" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
                    <ChevronLeft className="h-4 w-4 mr-1" /> Back to Games
                </Link>

                <div className="max-w-5xl mx-auto">
                    <header className="mb-10 text-center md:text-left">
                        <h1 className="text-4xl font-bold capitalize mb-2">{data.name.replace(/-/g, ' ')}</h1>
                        <p className="text-xl text-muted-foreground capitalize">Main Region: {data.main_region.name}</p>
                        
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
                            <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-full text-sm font-medium">
                                <Users className="h-4 w-4" /> {data.pokemon_species.length} Species
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-full text-sm font-medium">
                                <Zap className="h-4 w-4" /> {data.moves.length} Moves
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-full text-sm font-medium">
                                <BookOpen className="h-4 w-4" /> {data.abilities.length} Abilities
                            </div>
                        </div>
                    </header>

                    <Tabs defaultValue="pokemon" className="w-full">
                        <TabsList className="w-full justify-start mb-8 bg-transparent border-b rounded-none h-auto p-0 gap-8">
                            <TabsTrigger value="pokemon" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-2 px-0 font-semibold text-md">New Pokémon</TabsTrigger>
                            <TabsTrigger value="moves" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-2 px-0 font-semibold text-md">New Moves</TabsTrigger>
                            <TabsTrigger value="abilities" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-2 px-0 font-semibold text-md">New Abilities</TabsTrigger>
                            <TabsTrigger value="versions" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-2 px-0 font-semibold text-md">Games</TabsTrigger>
                        </TabsList>

                        <TabsContent value="pokemon">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {data.pokemon_species.map((species) => (
                                    <Link 
                                        key={species.name} 
                                        to={`/pokemon/${species.name}`}
                                        className="p-3 border rounded-lg text-center hover:bg-muted hover:border-primary transition-all group"
                                    >
                                        <span className="capitalize font-medium group-hover:text-primary">{species.name.replace(/-/g, ' ')}</span>
                                    </Link>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="moves">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {data.moves.map((move) => (
                                    <div key={move.name} className="p-3 border rounded-lg capitalize text-sm">
                                        {move.name.replace(/-/g, ' ')}
                                    </div>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="abilities">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {data.abilities.map((ability) => (
                                    <div key={ability.name} className="p-3 border rounded-lg capitalize text-sm">
                                        {ability.name.replace(/-/g, ' ')}
                                    </div>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="versions">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {data.version_groups.map((vg) => (
                                    <Card key={vg.name}>
                                        <CardHeader>
                                            <CardTitle className="capitalize text-lg">{vg.name.replace(/-/g, ' ')}</CardTitle>
                                        </CardHeader>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    );
}
