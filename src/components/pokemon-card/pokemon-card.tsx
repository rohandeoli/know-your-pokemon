import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Badge} from "@/components/ui/badge.tsx";

export default function PokemonCard({data}: any) {
    return (
        <>
            <Card className="w-[95%] mx-auto mt-10">
                <CardContent className="flex flex-row flex-wrap gap-2">
                    <Card className="w-[30%]">
                        <CardHeader>
                            <CardTitle>{data?.name}</CardTitle>
                            <CardDescription>
                                #{data?.id}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <img src={data?.sprites?.other.dream_world.front_default} alt={data?.name}/>
                            <div className={"mt-8"}>
                                {data?.types?.map((type: any, index: number) => {
                                    return <Badge variant={index == 0 ? 'default' : 'outline'}
                                                  className="mr-2">{type.type.name}</Badge>
                                })}
                            </div>
                            <div className="mt-8">
                                <em className={"font-bold"}>Height:</em> {data?.height / 10}m <br/>
                            </div>
                            <div className="mt-2">
                                <em className={"font-bold"}>Weight:</em> {data?.weight / 10}kg <br/>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="w-[69%]">
                        <CardContent>
                            <h1>Pokemon Card 2</h1>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        </>
    )
}