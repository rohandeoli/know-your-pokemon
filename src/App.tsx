import './App.css';
import {ThemeProvider} from "@/components/context/theme-provider.tsx";
import {BrowserRouter, Route, Routes} from "react-router";
import {createElement, lazy, Suspense} from "react";
import {QueryClientProvider} from "@tanstack/react-query";
import Home from "@/pages/Home/Home.tsx";
import Pokemon from "@/pages/pokemon/Pokemon.tsx";
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
