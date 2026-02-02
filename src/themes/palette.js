import colors from "./colors";

const buildPalette = (mode = "dark") => {
    const isDark = mode === "dark";

    return {
        mode,

        /* ================= BRAND ================= */
        primary: {
            main: colors.brand.primary,
            light: colors.brand.primaryLight,
        },

        success: {
            main: colors.brand.primary,
        },

        info: {
            main: colors.brand.info,
            light: colors.brand.infoLight,
            dark: colors.brand.infoDark,
        },

        warning: {
            main: colors.brand.warning,
        },

        error: {
            main: colors.brand.danger,
        },


        /* ================= BACKGROUND ================= */
        background: {
            default: isDark
                ? colors.background.dark
                : colors.background.light,

            paper: isDark
                ? colors.background.paperDark
                : colors.background.paperLight,

            elevated: isDark
                ? colors.background.elevatedDark
                : colors.background.elevatedLight,
        },

        text: {
            primary: isDark ? colors.text.white : colors.text.black,
            secondary: colors.text.muted,
            contastText: colors.text.white
        },

        divider: isDark
            ? colors.border.subtle
            : colors.border.default,

        action: {
            hover: isDark ? "#1F1F1F" : "#E5E7EB",
            selected: isDark ? "#1F1F1F" : "#E5E7EB",
        },
    };
};

export default buildPalette;
