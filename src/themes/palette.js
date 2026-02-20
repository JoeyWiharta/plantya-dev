// src/styles/buildPalette.js

import colors from "./colors/colors";

const buildPalette = (mode = "dark") => {
    const isDark = mode === "dark";

    return {
        mode,

        primary: {
            main: colors.brand.primary.main,
            light: colors.brand.primary.light,
            dark: colors.brand.primary.dark,
        },

        secondary: {
            main: colors.brand.secondary.main,
            light: colors.brand.secondary.light,
            dark: colors.brand.secondary.dark,
        },

        info: {
            main: colors.brand.info.main,
            light: colors.brand.info.light,
            dark: colors.brand.info.dark,
        },

        warning: {
            main: colors.brand.warning.main,
            light: colors.brand.warning.light,
            dark: colors.brand.warning.dark,
        },

        error: {
            main: colors.brand.error.main,
            light: colors.brand.error.light,
            dark: colors.brand.error.dark,
        },

        success: {
            main: colors.brand.success.main,
            light: colors.brand.success.light,
            dark: colors.brand.success.dark,
        },

        background: {
            default: isDark ? colors.background.default.dark : colors.background.default.light,
            paper: isDark ? colors.background.paper.dark : colors.background.paper.light,
            elevated: isDark ? colors.background.elevated.dark : colors.background.elevated.light,
        },

        layout: {
            header: isDark
                ? colors.background.paper.dark
                : colors.background.paper.light,
            sidebar: isDark
                ? colors.background.paper.dark
                : colors.background.paper.light,
            floor: isDark
                ? colors.background.default.dark
                : colors.background.default.light,
            workspace: isDark
                ? colors.background.paper.dark
                : colors.background.paper.light,

            sidebarActive: isDark
                ? "#10B98126"
                : "#ECFDF5",
        },

        text: {
            primary: isDark ? colors.text.primary.dark : colors.text.primary.light,
            secondary: colors.text.secondary,
            dark: colors.text.primary.light,
            light: colors.text.primary.dark,
        },

        divider: isDark
            ? colors.border.subtle
            : colors.border.default,

        action: {
            disabledBackground: isDark ? colors.surface.inputDisabledDark : colors.surface.inputDisabled,
        },
    };
};

export default buildPalette;