import React from "react";
import { Box, Grid, Container, Paper, Typography, Card, CardContent } from "@mui/material"
import { Swiper, SwiperSlide } from 'swiper/react'
import Icon from "@mdi/react";
import { mdiCircleMedium, mdiAccessPoint, mdiWater } from '@mdi/js';
import { useTheme } from '@mui/material/styles';
import LoginBg from "../assets/LoginBg.webp";
import SmallIcon from "../assets/SmallIcon.png";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';



// import required modules

const NonAuthLayout = ({ children }) => {
    const theme = useTheme();

    const cardContent = [
        {
            icon: mdiWater,
            title: 'Humidity',
            desc: "Test Humidity",
        },
        {
            icon: "Later",
            title: 'Temperature',
            desc: "Test Temperature",
        },
        {
            icon: "Later",
            title: 'Temperature 2',
            desc: "Test Temperature 2",
        },
        {
            icon: "Later",
            title: 'pH',
            desc: "Test pH",
        }
    ]

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
                elevation={4}
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
                        src={LoginBg}
                        alt="Background"
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            position: 'absolute',
                            zIndex: 1,
                        }}
                    />

                    <Box
                        sx={{
                            position: 'absolute',
                            zIndex: 2,
                            textAlign: 'left',
                            color: 'white',
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            p: 5,
                            // bgcolor: 'darkRed'
                        }}
                    >
                        <Box >
                            <Box display={"flex"} flexDirection={"row"} alignItems={"center"} gap={1} bgcolor={"rgba(0, 0, 0, 0.5)"} borderRadius={25} width={"fit-content"} px={2} py={1}>
                                <img
                                    src={SmallIcon}
                                    alt="Logo"
                                    style={{
                                        height: 30,
                                        width: 30,
                                    }}
                                />
                                <Typography variant="h5" fontWeight="medium">Plantya</Typography>
                            </Box>
                        </Box>

                        <Box display={"flex"} flexDirection={"column"} gap={2}>
                            <Box>
                                <Typography variant="h6" fontWeight="medium">
                                    Smart Monitoring for
                                </Typography>
                                <Typography variant="h6" fontWeight="medium">
                                    Modern Growth.
                                </Typography>
                            </Box>
                            <Box sx={{ opacity: 0.8 }}>
                                <Typography variant="body2" fontWeight="light">
                                    Harness the power of machine learning to optimize your
                                </Typography>
                                <Typography variant="body2" fontWeight="light">
                                    plantation's yield. Real-time insights, right at your fingertips.
                                </Typography>
                            </Box>

                            <Box display={"flex"} flexDirection={"row"} sx={{ bgcolor: 'darkRed' }}>
                                <Card sx={{ width: '80%', borderRadius: 4 }}> {/* Atur lebar card sesuai kebutuhan */}
                                    <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"} py={1} px={2}>
                                        <Box display={"flex"} flexDirection={"row"} gap={1} alignItems={"center"} letterSpacing={1}>
                                            <Icon path={mdiCircleMedium} size={1} color={theme.palette.primary.main} />
                                            <Typography variant="body2" fontWeight={"normal"}>LIVE METRICS</Typography>
                                        </Box>
                                        <Box>
                                            <Icon path={mdiAccessPoint} size={0.9} />
                                        </Box>
                                    </Box>


                                    <Swiper
                                        slidesPerView={"auto"} // Tampilkan card sesuai lebar masing-masing
                                        freeMode={true} // Mode bebas scroll
                                        loop={true} // Infinite loop - kembali ke depan setelah habis
                                        grabCursor={true} // Kursor berubah jadi grab saat hover
                                        mousewheel={true} // Enable mouse wheel scroll (opsional)
                                    >
                                        {cardContent.map((item) => (
                                            <SwiperSlide key={item.id}> {/* Width auto untuk card yang fleksibel */}

                                                <CardContent
                                                    sx={{
                                                        bgcolor: 'red',
                                                        display: 'flex',
                                                        flexDirection: 'row'
                                                    }}>
                                                    <Box>
                                                        <Icon path={item.icon} size={1} />
                                                    </Box>

                                                    <Box>
                                                        <Typography>{item.title}</Typography>
                                                        <Typography>{item.desc}</Typography>
                                                    </Box>
                                                </CardContent>

                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </Card>
                            </Box>
                        </Box>
                    </Box>



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
        </Container >
    );
};
export default NonAuthLayout;