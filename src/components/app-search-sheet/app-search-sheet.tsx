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

export default function AppSearchSheet({searchSheetOpen, setSearchSheetOpen, pokemon}: {
    searchSheetOpen: boolean,
    setSearchSheetOpen: (open: boolean) => void,
    pokemon: any
}) {

    function closeSheet() {
        searchSheetOpen = false;
        setSearchSheetOpen(false)
        console.log('close')
    }

    return (
        <Sheet open={searchSheetOpen} onOpenChange={() => setSearchSheetOpen(true)}>
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
                    <Pokemon pokemon={pokemon}/>
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
