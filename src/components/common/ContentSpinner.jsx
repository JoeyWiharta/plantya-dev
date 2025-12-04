import React from 'react';
import PropTypes from 'prop-types';
import { Box, CircularProgress, Typography } from '@mui/material';

const ContentSpinner = (props) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                minHeight: '80vh',
                width: '100%',
                backgroundColor: '#121314',
            }}
        >
            <CircularProgress
                sx={{
                    color: '#64748B',
                    marginBottom: 2,
                }}
                size={50}
            />
            <Typography variant="body1" sx={{ color: '#64748B' }}>
                {props.text}
            </Typography>
        </Box>
    );
};

ContentSpinner.propTypes = {
    text: PropTypes.any,
};

export default ContentSpinner;