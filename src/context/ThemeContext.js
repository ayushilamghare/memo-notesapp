import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

const themes = {
  orange: {
    name: "Orange",
    primary: "from-orange-400 to-orange-500",
    primaryHover: "from-orange-500 to-orange-600",
    secondary: "from-amber-300 to-orange-400",
    accent: "text-orange-500",
    accentLight: "text-orange-400",
    bgGradient: "from-white via-white to-white",
    bgLight: "bg-white",
    bgLighter: "bg-white",
    border: "border-orange-200",
    badge: "bg-orange-100",
    hoverBg: "hover:bg-orange-100",
    logoBg: "from-orange-400 via-amber-300 to-orange-500",
    logo: "text-orange-500",
    buttonText: "text-white"
  },
  blue: {
    name: "Blue",
    primary: "from-indigo-400 to-indigo-500",
    primaryHover: "from-indigo-500 to-indigo-600",
    secondary: "from-blue-300 to-blue-400",
    accent: "text-rose-500",
    accentLight: "text-rose-400",
    bgGradient: "from-blue-100/50 via-rose-100/40 to-blue-100/50",
    bgLight: "bg-blue-100/50",
    bgLighter: "bg-blue-50/40",
    border: "border-blue-200/50",
    badge: "bg-blue-200/70",
    hoverBg: "hover:bg-blue-200/30",
    logoBg: "from-rose-300 via-pink-300 to-rose-400",
    logo: "text-rose-500",
    buttonText: "text-white"
  },
  purple: {
    name: "Purple",
    primary: "from-purple-400 to-purple-500",
    primaryHover: "from-purple-500 to-purple-600",
    secondary: "from-violet-300 to-purple-400",
    accent: "text-purple-600",
    accentLight: "text-purple-500",
    bgGradient: "from-violet-100/50 via-purple-100/40 to-violet-100/50",
    bgLight: "bg-purple-100/50",
    bgLighter: "bg-purple-50/40",
    border: "border-purple-200/50",
    badge: "bg-purple-200/70",
    hoverBg: "hover:bg-purple-200/30",
    logoBg: "from-purple-400 via-violet-300 to-purple-500",
    logo: "text-purple-600",
    buttonText: "text-white"
  },
  teal: {
    name: "Teal",
    primary: "from-teal-400 to-teal-500",
    primaryHover: "from-teal-500 to-teal-600",
    secondary: "from-cyan-300 to-teal-400",
    accent: "text-teal-600",
    accentLight: "text-teal-500",
    bgGradient: "from-teal-100/50 via-cyan-100/40 to-teal-100/50",
    bgLight: "bg-teal-100/50",
    bgLighter: "bg-teal-50/40",
    border: "border-teal-200/50",
    badge: "bg-teal-200/70",
    hoverBg: "hover:bg-teal-200/30",
    logoBg: "from-teal-400 via-cyan-300 to-teal-500",
    logo: "text-teal-600",
    buttonText: "text-white"
  }
};

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState("orange");

  const switchTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  const theme = themes[currentTheme];

  return (
    <ThemeContext.Provider value={{ theme, currentTheme, switchTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}
