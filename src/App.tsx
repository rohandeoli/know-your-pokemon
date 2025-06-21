import './App.css'
import {Button} from "@/components/ui/button.tsx";
import {ThemeProvider} from "@/components/context/theme-provider.tsx";
import {ModeToggle} from "@/components/theme-toggle/mode-toggle.tsx";

function App() {

  return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          {/*{children}*/}
          <>
              <h1>Hello World</h1>
              <div className="flex flex-wrap items-center gap-2 md:flex-row">
                  <Button variant={"default"}>Button</Button>
                  <ModeToggle/>
              </div>
          </>
      </ThemeProvider>
  )
}

export default App
