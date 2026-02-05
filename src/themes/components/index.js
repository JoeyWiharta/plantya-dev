import MuiPaper from "./MuiPaper";
import MuiDivider from "./MuiDivider";
import MuiTextField from "./MuiTextField";
import MuiButton from "./MuiButton";
import MuiInputLabel from "./MuiInputLabel";
import MuiOutlinedInput from "./MuiOutlinedInput";

const buildComponents = () => ({
    ...MuiPaper,
    ...MuiDivider,
    ...MuiTextField,
    ...MuiButton,
    ...MuiInputLabel,
    ...MuiOutlinedInput,
});

export default buildComponents;