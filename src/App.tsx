import "./App.css";
import { NextUIProvider } from "@nextui-org/react";
import AutoCompleteWrapper from "./components/ui/AutoCompleteWrapper";
import { darkTheme } from "./themes";

function App() {
  return (
    <NextUIProvider theme={darkTheme}>
      <AutoCompleteWrapper />
    </NextUIProvider>
  );
}

export default App;
