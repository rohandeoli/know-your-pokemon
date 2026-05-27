import {QueryClient} from "@tanstack/react-query";
import {ApiError} from "@/api/pokemon.api.ts";

/**
 * PokéAPI data is effectively immutable (a Pokémon's stats never change), so we
 * cache aggressively and never refetch within a session. 404s (e.g. a bad
 * search) fail fast instead of burning the default three retries.
 */
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
            refetchOnWindowFocus: false,
            retry: (failureCount, error) =>
                !(error instanceof ApiError && error.status === 404) && failureCount < 1,
        },
    },
});
