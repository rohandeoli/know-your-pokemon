import './App.css';
import {ThemeProvider} from "@/components/context/theme-provider.tsx";
import {BrowserRouter, Route, Routes} from "react-router";
import {createElement} from "react";
import Home from "@/pages/Home/Home.tsx";

const routeConfig = [
    {path: "/", component: Home},
    {path: "/home", component: Home},
];

function App() {

  return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
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
