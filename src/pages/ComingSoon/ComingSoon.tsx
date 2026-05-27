import AppHeader from "@/components/app-header/app-header.tsx";

export default function ComingSoon({title}: { title: string }) {
    return (
        <>
            <AppHeader/>
            <div className="mt-20 flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-semibold">{title}</h1>
                <p className="text-muted-foreground">Coming soon.</p>
            </div>
        </>
    );
}
