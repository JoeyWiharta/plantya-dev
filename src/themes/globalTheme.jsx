// src/theme.jsx

import { createTheme } from "@mui/material/styles";

const globalTheme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  palette: {
    mode: 'dark',
    success: { main: '#07AB0E' },
    error: { main: '#DC3545' },
    info: { main: '#1976D2', secondary: '#24427D' },
    primary: { main: '#1976D2' },
    secondary: { main: '#16181A' },
    background: {
      default: "#121314", // Background utama
      secondary: "#16181A", // Background Sidebar untuk Contrast
      third: '#2c2e31', // Line Coloring
      hover: '#1F1F1F' // Background Hovering Sidebar
    },
    text: { primary: "#FAFAFA", secondary: "#676767" },
  },

  components: {

    // Textfield Styling
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          // Styling Textfield for Login and Register
          "&.auth-field": {
            "& .MuiOutlinedInput-root": {
              backgroundColor: theme.palette.background.secondary,
              borderRadius: "15px",
              transition: "all 0.3s ease",

              "& fieldset": {
                borderColor: "transparent",
                borderWidth: "2px",
              },

              "&:hover": {
                backgroundColor: "transparent !important",

                "& fieldset": {
                  borderColor: theme.palette.text.secondary,
                },
              },
              "&.Mui-focused": {
                backgroundColor: "transparent !important",

                "& fieldset": {
                  borderColor: theme.palette.text.secondary,
                },
              },
              "&.Mui-focused fieldset": {
                borderColor: theme.palette.text.secondary,
                backgroundColor: "transparent"
              },

              "&.Mui-autofilled": {
                "& fieldset": {
                  borderColor: theme.palette.text.secondary,
                  backgroundColor: "transparent"
                }
              },
              "& .MuiInputBase-input::placeholder": {
                borderColor: theme.palette.text.secondary,
                backgroundColor: "transparent"
              },
              "& input:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 1000px transparent inset !important",
                boxShadow: "0 0 0 1000px transparent inset !important",
                backgroundColor: "transparent !important",
                backgroundImage: "none !important",
                WebkitTextFillColor: `${theme.palette.text.primary} !important`,
                transition: "background-color 5000s ease-in-out 0s !important",
              },
              "& input:-webkit-autofill::placeholder": {
                color: theme.palette.text.secondary,
                backgroundColor: "transparent"
              },
              "& input:-webkit-autofill:hover::placeholder": {
                color: theme.palette.text.secondary,
              },
              // 
              "& input:-webkit-autofill:focus::placeholder": {
                color: theme.palette.text.secondary,
              },
              "& input": {
                color: theme.palette.text.secondary,
                backgroundColor: "transparent",
              },
              "& input:not(:placeholder-shown)": {
                color: theme.palette.text.primary,
              },
            },
            "& .MuiInputBase-input::placeholder": {
              color: theme.palette.text.secondary,
              opacity: 1,
            },

            "& .MuiFormHelperText-root": {
              backgroundColor: 'transparent',
              marginTop: "5px",
              marginBottom: '-20px'
            },
          },
        })
      },
    },

    // Styling Button
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          // Style for Login / Regist Button
          '&.auth-button': {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.info.secondary,
            borderStyle: 'none',
            borderRadius: '15px',
            fontWeight: 600,
            '&:hover': {
              borderWidth: "2px",
              borderStyle: 'solid',
              borderColor: theme.palette.info.main,
              backgroundColor: theme.palette.info.main,
              transition: "all 0.7s ease",
            },
          },

          // Button Signup / Sign in Direction
          '&.linkto-button': {
            fontWeight: 'bold',
            color: theme.palette.info.main,
            textTransform: "none",
            "&:hover": {
              textDecoration: 'underline',
              backgroundColor: 'transparent'
            }
          },
        }),
      },
    },

    // Styling Divider
    MuiDivider: {
      styleOverrides: {
        root: ({ theme }) => ({
          // 
          '&.auth-divider': {
            border: '1px solid theme.palette.background.third',
          },
        }),
      }
    },

    // Other Component if needed
  },
});

export default globalTheme;
