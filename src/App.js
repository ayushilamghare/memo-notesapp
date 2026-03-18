import MainLayout from "./Layout/MainLayout";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <MainLayout/>
    </ThemeProvider>
  );
}
export default App