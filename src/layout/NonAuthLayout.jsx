import React from "react";
import { Box, Grid, Container, Paper, Typography, Card, CardContent, Stack, IconButton } from "@mui/material"
import { Swiper, SwiperSlide } from 'swiper/react'
import Icon from "@mdi/react";
import {
    mdiAccessPoint,
    mdiSprout,
    mdiChip,
    mdiBrain
} from '@mdi/js';
import { useTheme } from '@mui/material/styles';
import Lottie from "lottie-react";
import PropTypes from 'prop-types';
import nonAuthIcon from "../assets/Icon//animation/nonAuthIcon.json"
import {
    LightModeIcon,
    DarkModeIcon,
} from '@/assets/Icon/muiIcon';
import { Pagination, Autoplay, Mousewheel, FreeMode } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useThemeMode } from "../context/ThemeContext";


// import required modules

const NonAuthLayout = (props) => {
    const theme = useTheme();
    const { mode, toggleTheme } = useThemeMode();


    const cardContent = [
        {
            icon: mdiAccessPoint,
            title: 'Realtime Monitoring',
            desc: "Instant visibility into your plantation's performance.",
        },
        {
            icon: mdiChip,
            title: 'Smart IoT Integration',
            desc: "A unified network of smart farming devices.",
        },
        {
            icon: mdiBrain,
            title: 'Machine Learning Insights',
            desc: "Intelligence that evolves with your crops.",
        },
    ]

    return (
        <Container
            maxWidth={false}
            disableGutters
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: 'background.default',
                p: { xs: 0, sm: 2 },
                position: 'relative', // Tambahkan position: relative untuk container
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    zIndex: 10,
                }}
            >
                <IconButton
                    sx={{
                        color: mode == "dark" ? "warning.main" : "text.primary",
                        borderRadius: '50%',
                        bgcolor: 'background.paper'
                    }}
                    onClick={toggleTheme}
                >
                    {mode == "dark" ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>
            </Box>

            <Paper
                elevation={0}
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    width: '90%',
                    height: '90%',
                    maxWidth: '1200px',
                    maxHeight: '800px',
                    borderRadius: 5,
                    overflow: 'hidden',
                    boxShadow: `0px 18px 45px rgba(0, 0, 0, 0.55),0px 0px 90px rgba(0, 124, 79, 0.25)`,
                }}
            >

                {/* LEFT SIDE */}
                <Box
                    bgcolor={"background.elevated"}
                    sx={{
                        display: { xs: 'none', md: 'flex' },
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        p: 5,
                        flex: 1,
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5,
                        overflow: 'hidden',
                    }}
                >

                    <Stack display={"flex"} flexDirection={"row"} >
                        <Box
                            bgcolor={"background.paper"}
                            gap={1.5}
                            py={0.5}
                            px={1}
                            borderRadius={2}
                            display={"flex"}
                            alignItems={"start"}
                            justifyContent={"center"}
                            color={"primary.main"}
                        >
                            <Icon path={mdiSprout} size={1} />
                            <Typography variant="h5" fontWeight="medium" color="text.primary">Plantya</Typography>
                        </Box>
                    </Stack>

                    <Stack
                        sx={{
                            width: '60%',
                            height: '40%',
                            alignSelf: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Lottie
                            animationData={nonAuthIcon}
                            loop
                            style={{ width: "100%", height: "100%" }}
                        />
                    </Stack>


                    <Stack
                        alignItems="center"
                        textAlign="center"
                        spacing={1}
                    >
                        <Box>
                            <Typography variant="h5" fontWeight="medium" >
                                Smart Monitoring for
                                <br />
                                <Box color="success.main">
                                    Modern Growth.
                                </Box>
                            </Typography>

                        </Box>

                        <Box sx={{ opacity: 0.8 }}>
                            <Typography variant="body2" fontWeight="light">
                                Harness the power of machine learning to
                            </Typography>
                            <Typography variant="body2" fontWeight="light">
                                optimize your plantation's yield.
                            </Typography>
                        </Box>
                    </Stack>

                    <Stack>
                        <Box display={"flex"} justifyContent={"center"} flexDirection={"row"}
                            sx={{
                                '& .swiper': {
                                    background: 'transparent',
                                },
                                '& .swiper-pagination': {
                                    position: 'relative',
                                    mt: -1
                                },
                                '& .swiper-pagination-bullet': {
                                    backgroundColor: 'rgba(255,255,255,0.3)',
                                    opacity: 1,
                                },
                                '& .swiper-pagination-bullet-active': {
                                    backgroundColor: 'success.main',
                                },
                            }}
                        >
                            <Card
                                sx={{
                                    width: '90%',
                                    borderRadius: 4,
                                    overflow: 'hidden',
                                    boxShadow: `0px 6px 16px rgba(0, 0, 0, 0.25), 0px 0px 24px rgba(0, 124, 79, 0.18)`,
                                }}
                            >
                                <Swiper
                                    modules={[Pagination, Autoplay, Mousewheel, FreeMode]}
                                    slidesPerView={1}
                                    spaceBetween={12}
                                    loop
                                    grabCursor
                                    mousewheel={{ forceToAxis: true }}
                                    freeMode={false}
                                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                                    pagination={{ clickable: true }}
                                    autoHeight
                                >
                                    {cardContent.map((item) => (
                                        <SwiperSlide
                                            key={item.id}
                                            style={{
                                                width: 'auto',
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <CardContent
                                                sx={{
                                                    width: '100%',
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    gap: 4,
                                                    py: 3,
                                                    px: 4
                                                }}
                                            >
                                                <Box display="flex" alignItems="center" color={"primary.main"}>
                                                    <Icon path={item.icon} size={1.2} color={item.color} />
                                                </Box>

                                                <Box>
                                                    <Typography variant="body2" fontWeight={"medium"}>
                                                        {item.title}
                                                    </Typography>
                                                    <Typography variant="caption" fontWeight={"light"} sx={{ opacity: 0.7 }}>
                                                        {item.desc}
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </Card>

                        </Box>
                    </Stack>

                </Box >



                {/* </Box> */}

                {/* RIGHT SIDE */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        p: 5,
                        flex: 1,
                        borderBottomLeftRadius: { xs: 5, md: 0 },
                        borderBottomRightRadius: { xs: 5, md: 0 },
                        borderTopRightRadius: 5,
                        borderTopLeftRadius: 5,
                    }}
                >
                    {props.children}

                </Box>
            </Paper >
        </Container >
    );
};


NonAuthLayout.propTypes = {
    children: PropTypes.any,
};

export default NonAuthLayout;