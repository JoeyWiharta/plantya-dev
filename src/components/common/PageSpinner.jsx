import React from "react";
import PropTypes from "prop-types";
import { Backdrop, CircularProgress, Typography } from "@mui/material";

const PageSpinner = (props) => {
    return (
        <Backdrop
            open={props.open}
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                color: "#fff",
                flexDirection: "column",
                backdropFilter: "blur(4px)",
                backgroundColor: "rgba(0,0,0,0.3)",
                transition: "all 0.3s ease-in-out",
            }}
        >
            <CircularProgress color="inherit" size={60} />
            {props.text && (
                <Typography variant="h6" sx={{ mt: 2 }}>
                    {props.text}
                </Typography>
            )}
        </Backdrop>
    );
};

PageSpinner.propTypes = {
    open: PropTypes.any,
    text: PropTypes.any,
};

export default PageSpinner;
