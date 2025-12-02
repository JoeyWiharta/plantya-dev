import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  palette: {
    background: {
      default: "#121314",
    },
    text: {
      primary: "#FAFAFA",
    },
  },
});
export default theme;

// Custom Style TextField
export const textFieldCustom = {
  position: 'relative',
  marginTop: 1,
  "& .MuiOutlinedInput-root": {
    color: "#FAFAFA",
    borderRadius: "15px",


    "& fieldset": {
      borderColor: "#16181A",
      borderWidth: "2px",
      transition: "border-color 0.25s ease, box-shadow 0.25s ease",
    },
    "&:hover fieldset": {
      borderColor: "#676767",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#676767",
    },
    "&.Mui-autofilled": {
      "& fieldset": {
        borderColor: "#676767",
      },
    },
  },

  // Base placeholder style
  "& .MuiInputBase-input::placeholder": {
    color: "#676767",
    opacity: 1,
    fontSize: "1rem",
  },
  "& input:not(:placeholder-shown)": {
    WebkitTextFillColor: "#FAFAFA !important",
    color: "#FAFAFA !important",
    caretColor: "#FAFAFA",
  },

  "& input:-webkit-autofill::placeholder": {
    fontSize: "1rem !important",
    color: "#676767 !important",
    opacity: "1 !important",
  },
  "& input:-webkit-autofill:hover::placeholder": {
    fontSize: "1rem !important",
    color: "#676767 !important",
    opacity: "1 !important",
  },
  "& input:-webkit-autofill:focus::placeholder": {
    fontSize: "1rem !important",
    color: "#676767 !important",
    opacity: "1 !important",
  },

  "& .MuiSvgIcon-root": {
    color: "#676767",
  },

  "& input": {
    backgroundColor: "transparent !important",
    WebkitTextFillColor: "#676767 !important",
    color: "#676767 !important",
    caretColor: "#676767",
    borderRadius: "15px",
    transition: "background-color 5000s ease-in-out 0s",
    fontSize: "1rem",
    fontFamily: "inherit",
  },

  "& input:-webkit-autofill": {
    WebkitBoxShadow: "0 0 0 1000px transparent inset !important",
    WebkitTextFillColor: "#FAFAFA !important",
    borderRadius: "15px",
    transition: "background-color 5000s ease-in-out 0s",
    fontSize: "1rem !important",
    fontFamily: "inherit !important",
  },
  "& input:-webkit-autofill:hover": {
    WebkitBoxShadow: "0 0 0 1000px transparent inset !important",
    WebkitTextFillColor: "#FAFAFA !important",
    fontSize: "1rem !important",
    fontFamily: "inherit !important",
  },
  "& input:-webkit-autofill:focus": {
    WebkitBoxShadow: "0 0 0 1000px transparent inset !important",
    WebkitTextFillColor: "#FAFAFA !important",
    outline: "none !important",
    fontSize: "1rem !important",
    fontFamily: "inherit !important",
  },
  "& input:-webkit-autofill:active": {
    WebkitBoxShadow: "0 0 0 1000px transparent inset !important",
    WebkitTextFillColor: "#FAFAFA !important",
    fontSize: "1rem !important",
    fontFamily: "inherit !important",
  },

  "& input:-webkit-autofill::first-line": {
    color: "#FAFAFA !important",
    fontSize: "1rem !important",
    fontFamily: "inherit !important",
  },
  "& .MuiFormHelperText-root": {
    textWrap:"nowrap",
    position: 'absolute',
    bottom: -20,
    left: 14,
    zIndex: 1,
    margin: 0,
  },
};