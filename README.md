# Know Your Pokémon

A React single-page app for browsing and searching Pokémon, backed by the public [PokéAPI](https://pokeapi.co/). Browse a paginated list, search a Pokémon by name, and open a detail view with its sprite, types, height/weight, base stats, abilities, and Pokédex entry. Light/dark theme included.

## Tech stack

- **React 19** + **TypeScript** + **Vite 6**
- **Tailwind CSS v4** (configured in `src/index.css`, no `tailwind.config`) with **shadcn/ui** components
- **react-router v7** for routing
- **TanStack Query v5** as the data/cache layer

## Prerequisites

- Node.js 20+ and npm

## Setup

```bash
npm install
```

Create a `.env` file pointing at the PokéAPI base URL:

```bash
VITE_API_URL=https://pokeapi.co/api/v2
```

This variable is required — all API calls read `import.meta.env.VITE_API_URL`.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check (`tsc -b`) then build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Serve the production build locally |

## Project structure

```
src/
  api/         PokéAPI fetch wrappers + ApiError
  hooks/       TanStack Query hooks (usePokemonList, usePokemon, usePokemonSpecies)
  model/       Domain types (Pokemon, PokemonSpecies, PokemonList)
  lib/         Shared helpers (cn, pokemonSprite) and the configured QueryClient
  components/  Feature components + shadcn primitives (components/ui)
  pages/       Route pages (Home, Pokemon detail)
```

Data flows through query hooks rather than ad-hoc fetches; the list card and the detail page share a cache key, so opening a Pokémon you've already seen is instant. See `CLAUDE.md` for a deeper architecture overview.

## Deployment

This is a client-side SPA using `BrowserRouter`. When deploying, configure your host to rewrite all routes to `index.html` so deep links like `/pokemon/25` resolve.
