import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function ThemeSwitcher() {
  const { currentTheme, switchTheme, themes } = useContext(ThemeContext);

  const colorMap = {
    orange: "from-orange-400 to-orange-500",
    blue: "from-indigo-400 to-indigo-500",
    purple: "from-purple-400 to-purple-500",
    teal: "from-teal-400 to-teal-500"
  };

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {Object.entries(themes).map(([key, value]) => (
        <button
          key={key}
          onClick={() => switchTheme(key)}
          className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br ${colorMap[key]} transition-all duration-300 ${
            currentTheme === key
              ? "ring-2 ring-offset-2 ring-gray-400 scale-110"
              : "hover:scale-105"
          } shadow-md flex-shrink-0`}
          title={value.name}
        />
      ))}
    </div>
  );
}
