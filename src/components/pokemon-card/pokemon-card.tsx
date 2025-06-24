import {Card, CardContent} from "@/components/ui/card.tsx";

export default function PokemonCard({data}: any) {
    return (
        <>
            <Card className="w-[95%] mx-auto mt-10">
                <CardContent className="flex flex-row flex-wrap gap-2">
                    <Card className="w-[40%]">
                        <CardContent>
                            <h1>Pokemon Card</h1>
                        </CardContent>
                    </Card>
                    <Card className="w-[59%]">
                        <CardContent>
                            <h1>Pokemon Card 2</h1>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        </>
    )
}