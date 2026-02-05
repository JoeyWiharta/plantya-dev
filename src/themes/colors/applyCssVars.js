import colors from "./colors";

export const applyCssVars = (mode = "dark") => {
    const root = document.documentElement;

    /* ================= BRAND ================= */
    root.style.setProperty("--color-primary", colors.brand.primary.main);
    root.style.setProperty("--color-primary-light", colors.brand.primary.light);
    root.style.setProperty("--color-primary-dark", colors.brand.primary.dark);

    root.style.setProperty("--color-secondary", colors.brand.secondary.main);
    root.style.setProperty("--color-info", colors.brand.info.main);
    root.style.setProperty("--color-success", colors.brand.success.main);
    root.style.setProperty("--color-warning", colors.brand.warning.main);
    root.style.setProperty("--color-error", colors.brand.error.main);

    /* ================= BACKGROUND ================= */
    root.style.setProperty(
        "--color-bg-default",
        colors.background.default[mode]
    );
    root.style.setProperty(
        "--color-bg-paper",
        colors.background.paper[mode]
    );
    root.style.setProperty(
        "--color-bg-elevated",
        colors.background.elevated[mode]
    );

    /* ================= TEXT ================= */
    root.style.setProperty(
        "--color-text-primary",
        colors.text.primary[mode]
    );
    root.style.setProperty(
        "--color-text-secondary",
        colors.text.secondary
    );

    /* ================= BORDER ================= */
    root.style.setProperty("--color-border", colors.border.default);
};
