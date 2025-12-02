import React from "react";
// import { Col, Container, Row } from "reactstrap";
import { Box, Grid, Container } from "@mui/material"

const NonAuthLayout = ({ children }) => {
    return (
        <Container
            maxWidth={false}
            disableGutters
            sx={{
                minHeight: '100vh',
                p: 0,
                m: 0,
            }}
        >
            <Grid
                container
                sx={{
                    minHeight: "100vh",
                    alignItems: "stretch",
                }}
            >
                <Grid
                    size={{ xs: 12, sm: 6, md: 6, lg: 6 }}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {children}
                </Grid>
                <Grid
                    size={{ xs: 12, sm: 6, md: 6, lg: 6 }}
                    sx={{
                        p: 0,
                        position: "relative",
                        display: {
                            xs: 'none',
                            sm: "flex",
                        },
                        flexDirection: "column",
                    }}
                >
                    <Box
                        sx={{
                            flex: 1,
                            position: "relative",
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        <Box
                            component="img"
                            src="/NonAuthBackground.png"
                            alt="Background"
                            sx={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                        <Box
                            component="img"
                            src="/BaseLogo.png"
                            alt="Logo"
                            sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                maxWidth: "50%",
                            }}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};


export default NonAuthLayout;
