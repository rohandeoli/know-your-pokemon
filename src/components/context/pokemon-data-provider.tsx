import {createContext, type PropsWithChildren, useContext, useMemo, useState} from "react";

type PokemonDataContextType = {
    data: any
    setData: (data: any) => void
}

const PokemonDataContext = createContext<PokemonDataContextType>({
        data: null,
        setData: () => {
        },
    }
)

export function PokemonDataProvider({children}: PropsWithChildren) {
    const [data, setData] = useState(null);

    // Memoize the context value to prevent unnecessary rerenders
    const contextValue = useMemo(() => ({
        data,
        updateData: (newData) => {
            setData(newData);
        }
    }), [data]);

    return (
        <PokemonDataContext.Provider value={contextValue}>
            {children}
        </PokemonDataContext.Provider>
    )
}

export function usePokemonDataContext() {
    const context = useContext(PokemonDataContext);

    if (context === undefined) {
        throw new Error("usePokemonDataContext must be used within a PokemonDataProvider");
    }

    return context;
}


// import {createContext, useContext, useEffect, useState} from "react"
//
// type PokemonDataProviderProps = {
//     children: React.ReactNode
//     defaultData?: any
//     storageKey?: string
// }
//
// type PokemonDataProviderState = {
//     data: any
//     setData: (data: any) => void
// }
//
// const initialState: PokemonDataProviderState = {
//     data: null,
//     setData: () => null,
// }
//
// const PokemonDataProviderContext = createContext<PokemonDataProviderState>(initialState)
//
// export function PokemonDataProvider({
//                                   children,
//                                   defaultData = null,
//                                   storageKey = "vite-pokemon-data-provider",
//                                   ...props
//                               }: PokemonDataProviderProps) {
//     const [data, setData] = useState<any>(null)
//
//     // useEffect(() => {
//     //     const root = window.document.documentElement
//     //
//     //     root.classList.remove("light", "dark")
//     //
//     //     if (theme === "system") {
//     //         const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
//     //             .matches
//     //             ? "dark"
//     //             : "light"
//     //
//     //         root.classList.add(systemTheme)
//     //         return
//     //     }
//     //
//     //     root.classList.add(theme)
//     // }, [theme])
//
//     const value = {
//         data,
//         setData: (data: any) => {}
//     }
//
//     return (
//         <PokemonDataProviderContext.Provider {...props} value={value}>
//             {children}
//         </PokemonDataProviderContext.Provider>
//     )
// }
//
// export const useTheme = () => {
//     const context = useContext(PokemonDataProviderContext)
//
//     if (context === undefined)
//         throw new Error("useTheme must be used within a ThemeProvider")
//
//     return context
// }