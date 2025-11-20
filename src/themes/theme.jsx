import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});
export default theme;

// Custom Style TextField
export const textFieldCustom = {

  position: 'relative',
  "& .MuiOutlinedInput-root": {
    color: "white",
    borderRadius: "15px",

    "& fieldset": {
      borderColor: "#352F44",
      borderWidth: "2px",
      transition: "border-color 0.25s ease, box-shadow 0.25s ease",
    },
    "&:hover fieldset": {
      borderColor: "#C7FCEB",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#C7FCEB",
    },
    "&.Mui-autofilled": {
      "& fieldset": {
        borderColor: "#C7FCEB",
      },
    },
  },

  // Base placeholder style
  "& .MuiInputBase-input::placeholder": {
    color: "#ffffff",
    opacity: 1,
    fontSize: "1rem",
  },

  "& input:-webkit-autofill::placeholder": {
    fontSize: "1rem !important",
    color: "#ffffff !important",
    opacity: "1 !important",
  },
  "& input:-webkit-autofill:hover::placeholder": {
    fontSize: "1rem !important",
    color: "#ffffff !important",
    opacity: "1 !important",
  },
  "& input:-webkit-autofill:focus::placeholder": {
    fontSize: "1rem !important",
    color: "#ffffff !important",
    opacity: "1 !important",
  },

  "& .MuiSvgIcon-root": {
    color: "white",
  },

  "& input": {
    backgroundColor: "transparent !important",
    WebkitTextFillColor: "white !important",
    color: "white !important",
    caretColor: "white",
    borderRadius: "15px",
    transition: "background-color 5000s ease-in-out 0s",
    fontSize: "1rem",
    fontFamily: "inherit",
  },

  "& input:-webkit-autofill": {
    WebkitBoxShadow: "0 0 0 1000px transparent inset !important",
    WebkitTextFillColor: "white !important",
    borderRadius: "15px",
    transition: "background-color 5000s ease-in-out 0s",
    fontSize: "1rem !important",
    fontFamily: "inherit !important",
  },
  "& input:-webkit-autofill:hover": {
    WebkitBoxShadow: "0 0 0 1000px transparent inset !important",
    WebkitTextFillColor: "white !important",
    fontSize: "1rem !important",
    fontFamily: "inherit !important",
  },
  "& input:-webkit-autofill:focus": {
    WebkitBoxShadow: "0 0 0 1000px transparent inset !important",
    WebkitTextFillColor: "white !important",
    outline: "none !important",
    fontSize: "1rem !important",
    fontFamily: "inherit !important",
  },
  "& input:-webkit-autofill:active": {
    WebkitBoxShadow: "0 0 0 1000px transparent inset !important",
    WebkitTextFillColor: "white !important",
    fontSize: "1rem !important",
    fontFamily: "inherit !important",
  },

  "& input:-webkit-autofill::first-line": {
    color: "white !important",
    fontSize: "1rem !important",
    fontFamily: "inherit !important",
  },
  "& .MuiFormHelperText-root": {
    position: 'absolute',
    bottom: -20,
    left: 14,
    zIndex: 1,
    margin: 0,
  },
};