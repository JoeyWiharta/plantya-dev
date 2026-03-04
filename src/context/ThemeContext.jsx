import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

export const ThemeProviderCustom = ({ children }) => {
    const [mode, setMode] = useState(() => {
        return localStorage.getItem("themeMode") || "system";
    })

    const applyTheme = (selectedMode) => {
        if (selectedMode === "system") {
            const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            document.documentElement.classList.toggle("dark", systemDark);
        } else {
            document.documentElement.classList.toggle("dark", selectedMode === "dark");
        }
    };

    useEffect(() => {
        applyTheme(mode);
        localStorage.setItem("themeMode", mode)
    }, [mode]);

    useEffect(() => {
        const media = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = () => {
            if (mode === "system") {
                applyTheme("system");
            }
        };
        media.addEventListener("change", handleChange);
        return () => media.removeEventListener("change", handleChange);
    }, [mode]);

    return (
        <ThemeContext.Provider value={{ mode, setMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useThemeMode = () => useContext(ThemeContext);