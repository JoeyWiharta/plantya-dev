import React, { createContext, useContext, useMemo, useState } from "react";
import createAppTheme from "../themes";

const ThemeContext = createContext(null);

export const ThemeProviderCustom = ({ children }) => {
    const [mode, setMode] = useState(() => {
        return localStorage.getItem("themeMode") || "dark";
    });

    const toggleTheme = () => {
        setMode(prev => {
            const next = prev === "dark" ? "light" : "dark";
            localStorage.setItem("themeMode", next);
            return next;
        });
    };

    const theme = useMemo(() => createAppTheme(mode), [mode]);

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            {children(theme)}
        </ThemeContext.Provider>
    );
};

export const useThemeMode = () => useContext(ThemeContext);