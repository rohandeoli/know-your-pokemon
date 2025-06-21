import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu.tsx";
import {Link} from "react-router";
import {ModeToggle} from "@/components/theme-toggle/mode-toggle.tsx";
import "./app-header.css";

export default function AppHeader() {
    return (
        <>
            <div className={"app-header"}>
                <h3>Know Your Pokemon</h3>
                <NavigationMenu viewport={false}>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link to={'/home'}>Home</Link>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link to={'/items'}>Items</Link>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link to={'/games'}>Games</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
                <div className={"toggle-container"}>
                    <ModeToggle/>
                </div>
            </div>
        </>
    );
}