const MuiInputLabel = {
    MuiInputLabel: {
        styleOverrides: {
            root: ({ theme }) => ({
                fontSize: "13px",

                ".auth-field:hover &": {
                    color: theme.palette.primary.light,
                },

                "&.Mui-focused": {
                    color: theme.palette.primary.light,
                },
            }),

            shrink: {
                transform: "translate(14px, -9px) scale(1)",
                fontSize: "13px",
            },
        },
    },
};

export default MuiInputLabel;
