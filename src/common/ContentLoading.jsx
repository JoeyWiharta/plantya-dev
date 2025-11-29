import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const ContentLoading = ({ text = "Loading..." }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                minHeight: '80vh',
                width: '100%',
                backgroundColor: '#0F1624',
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
                {text}
            </Typography>
        </Box>
    );
};

export default ContentLoading;