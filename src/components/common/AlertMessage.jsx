import React from 'react';
import PropTypes from 'prop-types';
import { Alert, IconButton, Collapse } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AlertMessage = (props) => {
    if (!props.msg) {
        return null
    }

    return (
        <Collapse in={!!props.msg}>
            <Alert
                severity="error"    
                variant="outlined"
                onClose={props.onClose}
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={props.onClose}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                sx={{
                    mb: 2,
                }}
            >
                {props.msg}
            </Alert>
        </Collapse>
    )
}

AlertMessage.propTypes = {
    msg: PropTypes.string,
    onClose: PropTypes.func.isRequired,
};

export default AlertMessage