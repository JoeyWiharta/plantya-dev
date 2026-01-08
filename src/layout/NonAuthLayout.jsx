import React from "react";
import { Box, Grid, Container, Paper } from "@mui/material"

const NonAuthLayout = ({ children }) => {
    return (
        <Container
            maxWidth={false}
            disableGutters
            sx={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: 'background.default',
                p: { xs: 0, sm: 2 },
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    width: { xs: '100%', sm: "90%", md: '85%', lg: "80%" },
                    height: { xs: '100%', sm: '85%', md: "80%" },
                    maxWidth: '1200px',
                    maxHeight: '800px',
                    borderRadius: 5,
                    overflow: 'hidden',
                }}
            >
                {/* LEFT SIDE */}
                <Box
                    sx={{
                        display: {
                            xs: 'none',
                            md: 'flex'
                        },
                        flex: 1,
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5,
                        overflow: 'hidden',
                        position: 'relative',
                    }}
                >
                    <Box
                        component="img"
                        src="/LoginBg.png"
                        alt="Background"
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            position: 'absolute',
                        }}
                    />
                </Box>

                {/* RIGHT SIDE */}
                <Box
                    sx={{
                        flex: 1,
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottomLeftRadius: { xs: 5, md: 0 },
                        borderBottomRightRadius: { xs: 5, md: 0 },
                        borderTopRightRadius: 5,
                        borderTopLeftRadius: 5,
                        p: { xs: 4, sm: 5, md: 6 },
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                        }}>
                        {children}
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};
export default NonAuthLayout;