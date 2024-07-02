import { Outlet } from "react-router-dom";
import "./App.css";
import "./css/all.css";
import Navbar from "./Components/Navbar";
import Toasts from "./Components/Toasts";
import Titlebar from "./Components/Titlebar";
import { useState, useEffect } from "react";
import { ThemeContext } from "./utils/themeContext";
import { ToastProvider } from "./utils/toastContext";

function App() {
  // Theme Toggle Function

  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? storedTheme : "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    applyTheme(theme);
  }, [theme]);

  const applyTheme = (theme) => {
    document.body.classList.remove("dark", "light");
    document.body.classList.add(theme);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={toggleTheme}>
      <main>
        <Titlebar />
        <Navbar toggleTheme={() => toggleTheme()}/>
        <ToastProvider>
        <Toasts />
        <section className="render-space">
          <Outlet />
        </section>
        </ToastProvider>
      </main>
    </ThemeContext.Provider>
  );
}
export default App;
