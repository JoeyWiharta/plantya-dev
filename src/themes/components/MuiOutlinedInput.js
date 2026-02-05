const MuiOutlinedInput = {
    MuiOutlinedInput: {
        styleOverrides: {
            root: ({ theme }) => ({
                ".MuiInputLabel-root:hover + & .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.primary.light,
                },

                "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.primary.light,
                },

                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.primary.light,
                },
            }),

            notchedOutline: {
                legend: {
                    fontSize: "13px",
                },
            },
        },
    },
};

export default MuiOutlinedInput;
