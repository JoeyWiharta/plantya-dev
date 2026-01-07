import { createTheme } from "@mui/material/styles";

const baseColors = {
  // Brand Colors
  green: "#007C4F",
  greenLight: "#00A86B",
  red: "#DC3545",
  blue: "#1976D2",
  lightBlue: "#60A5FA",
  darkBlue: "#24427D",
  yellow: "#FFC107",

  // Neutral Colors
  white: "#FFFFFF",
  grey: "#A3B2AC",

  // Background Colors untuk DARK MODE
  darkBlack: "#1A1A1A",
  lightBlack: "#2A2A2A",
  darkGrey: "#222222",
};

const darkTheme = createTheme({
  palette: {
    mode: "dark",

    tonalOffset: 0,
    contrastThreshold: 0,

    // Brand Colors
    primary: {
      main: baseColors.green,
      light: baseColors.greenLight,
    },
    secondary: {
      main: baseColors.grey,
      dark: baseColors.darkGrey,
    },
    info: {
      main: baseColors.blue,
      light: baseColors.lightBlue,
      dark: baseColors.darkBlue,
    },
    success: {
      main: baseColors.green,
    },
    error: {
      main: baseColors.red,
    },
    warning: {
      main: baseColors.yellow,
    },

    // Background Colors - DARK MODE
    background: {
      default: baseColors.darkBlack, // #1A1A1A
      paper: baseColors.lightBlack, // #2A2A2A
    },

    // Text Colors - DARK MODE
    text: {
      primary: baseColors.white, // #FFFFFF
      secondary: baseColors.grey, // #A3B2AC
    },

    divider: "#2c2e31",

    action: {
      hover: "#1F1F1F",
      selected: "#1F1F1F",
    },
  },

  typography: {
    fontFamily: "Poppins, sans-serif",
  },

  components: {
    MuiPaper: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          backgroundColor: `${baseColors.lightBlack} !important`,
          backgroundImage: "none !important",
          ...(ownerState?.variant === "elevation" && {
            backgroundColor: `${baseColors.lightBlack} !important`,
          }),
          ...(ownerState?.variant === "outlined" && {
            backgroundColor: `${baseColors.lightBlack} !important`,
          }),
        }),
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&.auth-field": {


            "& .MuiOutlinedInput-root": {
              marginTop: 1,
              backgroundColor: theme.palette.secondary.dark,
              borderRadius: "15px",
              transition: "all 0.3s ease",

              "&.Mui-disabled": {
                backgroundColor: "#3a3a3a",
                "& .MuiInputBase-input": {
                  color: "#b0b0b0",
                  WebkitTextFillColor: "#b0b0b0",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#555555",
                },
                "& .MuiInputAdornment-root .MuiSvgIcon-root": {
                  color: "#b0b0b0",
                },
              },

              "& fieldset": { borderWidth: "0.7px" },
              "&:hover:not(.Mui-disabled) fieldset": { borderWidth: "2px", borderColor: theme.palette.primary.light, },
              "&.Mui-focused fieldset": { borderWidth: "2px", borderColor: theme.palette.primary.light },
              "&.Mui-autofilled fieldset": { borderWidth: "2px", borderColor: theme.palette.primary.light },

              // Autofill untuk Webkit browsers
              "& input:-webkit-autofill": {
                WebkitBoxShadow: `0 0 0 1000px ${theme.palette.secondary.dark} inset !important`,
                boxShadow: `0 0 0 1000px ${theme.palette.secondary.dark} inset !important`,
                WebkitTextFillColor: `${theme.palette.text.primary} !important`,
                transition: "background-color 5000s ease-in-out 0s !important",
              },
              "& input:-webkit-autofill:hover": {
                WebkitBoxShadow: `0 0 0 1000px ${theme.palette.secondary.dark} inset !important`,
                boxShadow: `0 0 0 1000px ${theme.palette.secondary.dark} inset !important`,
              },
              "& input:-webkit-autofill:focus": {
                WebkitBoxShadow: `0 0 0 1000px ${theme.palette.secondary.dark} inset !important`,
                boxShadow: `0 0 0 1000px ${theme.palette.secondary.dark} inset !important`,
              },

              // Autofill untuk Firefox
              "& input:-moz-autofill": {
                background: `${theme.palette.secondary.dark} !important`,
                color: `${theme.palette.text.primary} !important`,
              },
              "& input:-moz-autofill:hover": {
                background: `${theme.palette.secondary.dark} !important`,
                color: `${theme.palette.text.primary} !important`,
              },
              "& input:-moz-autofill:focus": {
                background: `${theme.palette.secondary.dark} !important`,
                color: `${theme.palette.text.primary} !important`,
              },

              // Input styling
              "& input": { color: theme.palette.text.secondary },
              "& input:not(:placeholder-shown)": { color: theme.palette.text.primary },
              "& .MuiInputBase-input::placeholder": {
                color: theme.palette.text.secondary,
                borderWidth: "2px"
              },
            },

            "& .MuiInputBase-input::placeholder": {
              color: theme.palette.text.secondary,
              opacity: 1,
            },

            // ✅ Helper text dalam normal flow
            "& .MuiFormHelperText-root": {
              position: "absolute",
              top: "100%",
              left: "8px",
              right: "8px",
              marginTop: "4px",
              marginBottom: 0,
              fontSize: "0.75rem",
              lineHeight: 1.3,
              // Biarkan text wrap
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
            color: theme.palette.text.primary,
            borderRadius: 15,
            fontWeight: 600,
            "&:hover": {
              backgroundColor: theme.palette.primary.light,
            },
          },

          "&.linkto-button": {
            color: theme.palette.primary.light,
            textTransform: "none",
            "&:hover": {
              textDecoration: "underline",
              backgroundColor: "transparent",
            },
          },
        }),
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderColor: theme.palette.divider,
        }),
      },
    },
  },
});

// Export untuk kompatibilitas future
export const lightTheme = {};
export const themes = {
  dark: darkTheme,
  light: null,
};

export default darkTheme;