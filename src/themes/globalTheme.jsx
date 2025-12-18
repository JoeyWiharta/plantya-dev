import { createTheme } from "@mui/material/styles";

const baseColors = {
  green: '#07AB0E',
  red: '#DC3545',
  blue: '#1976D2',
  darkBlue: '#24427D',
  white: '#FAFAFA',
  grey: '#676767',
  black: '#16181A',
  deepBlack: '#121314',
  hover: '#1F1F1F',
  yellow: "#ff8c00ff",

  bgHeaderTable: "#27272A",
  buttonSuccess: "#007C4F",
  line: '#2c2e31',
};

const globalTheme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  palette: {
    primary: {
      main: baseColors.darkBlue
    },
    secondary: {
      main: baseColors.black,
    },
    info: {
      main: baseColors.blue,
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

    background: {
      default: baseColors.deepBlack,
      paper: baseColors.black,
      tableHead: baseColors.bgHeaderTable,
    },

    text: {
      primary: baseColors.white,
      secondary: baseColors.grey,
    },

    action: {
      hover: baseColors.hover,
      active: baseColors.line,
    },

    custom: {
      line: baseColors.line,
    },

    button: {
      success: baseColors.buttonSuccess,
    },



  },

  components: {

    // Textfield Styling
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          // Styling Textfield for Login and Register
          "&.auth-field": {
            "& .MuiOutlinedInput-root": {
              marginTop: 1,
              backgroundColor: theme.palette.background.paper,
              borderRadius: "15px",
              transition: "all 0.3s ease",

              "& fieldset": {
                borderColor: "transparent",
                borderWidth: "1px",
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
            backgroundColor: theme.palette.primary.main,
            borderStyle: 'none',
            borderRadius: '15px',
            fontWeight: 600,
            '&:hover': {
              borderWidth: "1px",
              borderStyle: 'solid',
              borderColor: theme.palette.info.main,
              backgroundColor: theme.palette.info.main,
              transition: "all 0.7s ease",
            },
          },

          // Button Signup / Sign in Direction
          '&.linkto-button': {
            fontWeight: 600,
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
            border: '1px solid',
            borderColor: theme.palette.custom.line,
          },
        }),
      }
    },

    MuiPopover: {
      styleOverrides: {
        paper: ({ theme }) => ({
          '&.sidebar-popover': {
            backgroundColor: theme.palette.background.paper,
            borderRadius: 10,
            border: `1px solid ${theme.palette.custom.line}`,
            transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out"
          }
        })
      }
    }

    // Other Component if needed
  },
});

export default globalTheme;
