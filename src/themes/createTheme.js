import { createTheme } from "@mui/material/styles";
import buildPalette from "./palette";
import buildComponents from "./components";
import typography from "./typography";

const createAppTheme = (mode = "dark") => {
    return createTheme({
        palette: buildPalette(mode),
        components: buildComponents(),
        // typography: {
        //     fontFamily: "Poppins, sans-serif",
        //     fontSize: 13,
        // },
        typography: typography, // <-- GUNAKAN DI SINI

    })
}
export default createAppTheme;