import buildPalette from "../palette";

export const applyCssVars = (mode = "dark") => {
    const root = document.documentElement;

    const palette = buildPalette(mode);

    /* ================= BRAND ================= */
    root.style.setProperty("--color-primary", palette.primary.main);
    root.style.setProperty("--color-primary-light", palette.primary.light);
    root.style.setProperty("--color-primary-dark", palette.primary.dark);

    root.style.setProperty("--color-secondary", palette.secondary.main);
    root.style.setProperty("--color-info", palette.info.main);
    root.style.setProperty("--color-success", palette.success.main);
    root.style.setProperty("--color-warning", palette.warning.main);
    root.style.setProperty("--color-error", palette.error.main);

    /* ================= BACKGROUND ================= */
    root.style.setProperty("--color-bg-default", palette.background.default);
    root.style.setProperty("--color-bg-paper", palette.background.paper);
    root.style.setProperty("--color-bg-elevated", palette.background.elevated);

    /* ================= TEXT ================= */
    root.style.setProperty("--color-text-primary", palette.text.primary);
    root.style.setProperty("--color-text-secondary", palette.text.secondary);

    /* ================= BORDER ================= */
    root.style.setProperty("--color-border", palette.divider);
};
