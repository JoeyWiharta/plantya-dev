const buildComponents = () => ({
    /* ================= PAPER ================= */
    MuiPaper: {
        styleOverrides: {
            root: ({ theme }) => ({
                backgroundColor: theme.palette.background.paper,
                backgroundImage: "none",
            }),
        },
    },

    /* ================= DIVIDER ================= */
    MuiDivider: {
        styleOverrides: {
            root: ({ theme }) => ({
                borderColor: theme.palette.divider,
            }),
        },
    },

    /* ================= TEXT FIELD ================= */
    MuiTextField: {
        styleOverrides: {
            root: ({ theme }) => ({
                "&.auth-field": {
                    "& .MuiOutlinedInput-root": {
                        marginTop: 1,
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: "15px",
                        transition: "all 0.3s ease",

                        "&.Mui-disabled": {
                            backgroundColor: theme.palette.action.disabledBackground,

                            "& .MuiInputBase-input": {
                                color: theme.palette.text.secondary,
                                WebkitTextFillColor: theme.palette.text.secondary,
                            },

                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: theme.palette.divider,
                            },

                            "& .MuiInputAdornment-root .MuiSvgIcon-root": {
                                color: theme.palette.text.secondary,
                            },
                        },

                        "& fieldset": {
                            borderWidth: "0.7px",
                        },

                        "&:hover:not(.Mui-disabled) fieldset": {
                            borderWidth: "2px",
                            borderColor: theme.palette.primary.light,
                        },

                        "&.Mui-focused fieldset": {
                            borderWidth: "2px",
                            borderColor: theme.palette.primary.light,
                        },

                        "& input": {
                            color: theme.palette.text.secondary,
                        },

                        "& input:not(:placeholder-shown)": {
                            color: theme.palette.text.primary,
                        },

                        "& .MuiInputBase-input::placeholder": {
                            opacity: 1
                        },

                        /* ===== Autofill Webkit ===== */
                        "& input:-webkit-autofill": {
                            WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.paper} inset !important`,
                            boxShadow: `0 0 0 1000px ${theme.palette.background.paper} inset !important`,
                            WebkitTextFillColor: `${theme.palette.text.primary} !important`,
                            transition: "background-color 5000s ease-in-out 0s !important",
                        },

                        /* ===== Autofill Firefox ===== */
                        "& input:-moz-autofill": {
                            background: `${theme.palette.background.paper} !important`,
                            color: `${theme.palette.text.primary} !important`,
                        },
                    },

                    "& .MuiFormHelperText-root": {
                        position: "absolute",
                        top: "100%",
                        left: 8,
                        right: 8,
                        marginTop: 4,
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                        overflowWrap: "break-word",
                    },
                },
            }),
        },
    },


    MuiButton: {
        styleOverrides: {
            root: ({ theme }) => ({
                "&.auth-button": {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.text.contastText,
                    borderRadius: 15,
                    fontWeight: 500,
                    letterSpacing: 1,

                    "&:hover": {
                        backgroundColor: theme.palette.primary.light,
                    },
                },

                "&.linkto-button": {
                    color: theme.palette.primary.main,
                    textTransform: "none",

                    "&:hover": {
                        textDecoration: "underline",
                        backgroundColor: "transparent",
                    },
                },
            }),
        },
    },
});

export default buildComponents;
