import './App.css';
import {ThemeProvider} from "@/components/context/theme-provider.tsx";
import {BrowserRouter, Route, Routes} from "react-router";
import {createElement, lazy, Suspense} from "react";
import {QueryClientProvider} from "@tanstack/react-query";
import Home from "@/pages/Home/Home.tsx";
import Pokemon from "@/pages/pokemon/Pokemon.tsx";
import Items from "@/pages/Items/Items.tsx";
import ItemDetail from "@/pages/Items/ItemDetail.tsx";
import Games from "@/pages/Games/Games.tsx";
import GenerationDetail from "@/pages/Games/GenerationDetail.tsx";
import NotFound from "@/pages/NotFound/NotFound.tsx";
import {queryClient} from "@/lib/query-client.ts";

// Dev-only: the dynamic import is dead code in production builds, so the
// devtools are tree-shaken out of the shipped bundle.
const ReactQueryDevtools = import.meta.env.DEV
    ? lazy(() => import("@tanstack/react-query-devtools").then((m) => ({default: m.ReactQueryDevtools})))
    : () => null;

const routeConfig = [
    {path: "/", component: Home},
    {path: "/home", component: Home},
    {path: '/pokemon/:id', component: Pokemon},
    {path: '/items', component: Items},
    {path: '/items/:id', component: ItemDetail},
    {path: '/games', component: Games},
    {path: '/games/:id', component: GenerationDetail},
];

function App() {

  return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <QueryClientProvider client={queryClient}>
              <BrowserRouter>
                  <Routes>
                      {routeConfig.map((route) => (
                          <Route
                              key={route.path}
                              path={route.path}
                              element={createElement(route.component, {})}
                          />
                      ))}
                      <Route path="*" element={<NotFound/>}/>
                  </Routes>
              </BrowserRouter>
              <Suspense>
                  <ReactQueryDevtools initialIsOpen={false}/>
              </Suspense>
          </QueryClientProvider>
      </ThemeProvider>
  )
}

export default App
