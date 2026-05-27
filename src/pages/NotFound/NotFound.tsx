import AppHeader from "@/components/app-header/app-header.tsx";
import {Link} from "react-router";

export default function NotFound() {
    return (
        <>
            <AppHeader/>
            <div className="mt-20 flex flex-col items-center gap-4 text-center">
                <h1 className="text-3xl font-semibold">404</h1>
                <p className="text-muted-foreground">This page doesn't exist.</p>
                <Link to="/" className="text-primary underline">Back to home</Link>
            </div>
        </>
    );
}
