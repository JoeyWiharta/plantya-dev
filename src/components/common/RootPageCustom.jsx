import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import AlertMessage from "./AlertMessage";

const RootPageCustom = (props) => {
    useEffect(() => {
        if (props.setFirstRender != null) {
            props.setFirstRender(true)
        }
    }, [])



    return (
        <React.Fragment>
            <Box
                sx={{
                    width: "100%",
                    p: 2,
                }}
            >
                <AlertMessage
                    msg={props.msg}
                    onClose={() => props.setMsg("")}
                />

                {props.children}
            </Box>

        </React.Fragment>
    )
}

RootPageCustom.propTypes = {
    children: PropTypes.any,
    msg: PropTypes.any,
    setMsg: PropTypes.any,
    setFirstRender: PropTypes.any,
};

export default RootPageCustom;