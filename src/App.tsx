import './App.css';
import {ThemeProvider} from "@/components/context/theme-provider.tsx";
import {BrowserRouter, Route, Routes} from "react-router";
import {createElement} from "react";
import Home from "@/pages/Home/Home.tsx";
import Pokemon from "@/pages/pokemon/Pokemon.tsx";
import {PokemonDataProvider} from "@/components/context/pokemon-data-provider.tsx";

const routeConfig = [
    {path: "/", component: Home},
    {path: "/home", component: Home},
    {path: '/pokemon/:id', component: Pokemon},
];

function App() {

  return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <PokemonDataProvider data={undefined} setData={undefined}>
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
          </PokemonDataProvider>
          {/*{children}*/}
          {/*<>*/}
          {/*    <h1>Hello World</h1>*/}
          {/*    <div className="flex flex-wrap items-center gap-2 md:flex-row">*/}
          {/*        <Button variant={"default"}>Button</Button>*/}
          {/*        <ModeToggle/>*/}
          {/*    </div>*/}
          {/*</>*/}
      </ThemeProvider>
  )
}

export default App
