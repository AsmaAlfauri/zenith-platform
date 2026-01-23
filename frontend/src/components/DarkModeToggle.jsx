import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const DarkModeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-1 sm:px-4 sm:py-2 rounded-md bg-gray-200 dark:bg-gray-700 
                 text-gray-800 dark:text-gray-200 font-medium text-sm sm:text-base 
                 transition-colors duration-300 ease-in-out hover:bg-gray-300 dark:hover:bg-gray-600"
    >
      {theme === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
};

export default DarkModeToggle;
