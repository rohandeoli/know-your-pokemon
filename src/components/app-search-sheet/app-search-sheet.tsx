import {Button} from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import Pokemon from "@/components/pokemon/pokemon.tsx";

export default function AppSearchSheet({searchSheetOpen, setSearchSheetOpen, pokemon, error}: {
    searchSheetOpen: boolean,
    setSearchSheetOpen: (open: boolean) => void,
    pokemon: any,
    error?: { status?: number, message?: string }
}) {

    function closeSheet() {
        // searchSheetOpen = false;
        setSearchSheetOpen(false)
    }

    return (
        <Sheet open={searchSheetOpen} onOpenChange={setSearchSheetOpen}>
            {/*<SheetTrigger asChild>*/}
            {/*    <Button variant="outline">Open</Button>*/}
            {/*</SheetTrigger>*/}
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Search Result</SheetTitle>
                    <SheetDescription>
                        Search result is based on the exact match of the search query.
                    </SheetDescription>
                </SheetHeader>
                {/*<div className="grid flex-1 auto-rows-min gap-6 px-4">*/}
                {/*    <div className="grid gap-3">*/}
                {/*        <Label htmlFor="sheet-demo-name">Name</Label>*/}
                {/*        <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />*/}
                {/*    </div>*/}
                {/*    <div className="grid gap-3">*/}
                {/*        <Label htmlFor="sheet-demo-username">Username</Label>*/}
                {/*        <Input id="sheet-demo-username" defaultValue="@peduarte" />*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="grid w-full flex-1 auto-rows-min gap-6 px-4">
                    {/*<Pokemon pokemon={pokemon} isSearch={true}/>*/}
                    {error?.status === 404 ? (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-lg text-gray-500">No results found</p>
                        </div>
                    ) : error ? (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-lg text-red-500">
                                {error.message || 'An error occurred while fetching the results'}
                            </p>
                        </div>
                    ) : (
                        <Pokemon pokemon={pokemon} isSearch={true}/>
                    )}

                </div>
                <SheetFooter>
                    {/*<Button type="submit">Save changes</Button>*/}
                    <SheetClose asChild>
                        <Button onClick={() => closeSheet()} variant="outline">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
