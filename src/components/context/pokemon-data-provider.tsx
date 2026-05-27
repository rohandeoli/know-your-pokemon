import {createContext, type PropsWithChildren, useContext, useMemo, useState} from "react";
import type {Pokemon} from "@/model/pokemon.ts";

type PokemonData = Pokemon | null;

type PokemonDataContextType = {
    data: PokemonData;
    updateData: (data: PokemonData) => void;
};

const PokemonDataContext = createContext<PokemonDataContextType>({
    data: null,
    updateData: () => {
    },
});

export function PokemonDataProvider({children}: PropsWithChildren) {
    const [data, setData] = useState<PokemonData>(null);

    // Memoize the context value to prevent unnecessary rerenders
    const contextValue = useMemo<PokemonDataContextType>(() => ({
        data,
        updateData: (newData: PokemonData) => setData(newData),
    }), [data]);

    return (
        <PokemonDataContext.Provider value={contextValue}>
            {children}
        </PokemonDataContext.Provider>
    );
}

export function usePokemonDataContext() {
    return useContext(PokemonDataContext);
}
