"use client"
import React, { useRef } from 'react';
import Lottie from 'lottie-react';
import { Activity, Brain, Cpu, Sprout } from 'lucide-react';
import PropTypes from 'prop-types';
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import nonAuthIcon from "../assets/Icon/animation/nonAuthIcon.json"
import { Toaster } from '@/components/ui/sonner';

const featureContent = [
    {
        icon: Activity,
        title: 'Realtime Monitoring',
        desc: "Instant visibility into your plantation's performance.",
    },
    {
        icon: Cpu,
        title: 'Smart IoT Integration',
        desc: "A unified network of smart farming devices.",
    },
    {
        icon: Brain,
        title: 'Machine Learning Insights',
        desc: "Intelligence that evolves with your crops.",
    },
]

// const NonAuthLayout = (props) => {

//     const { mode, toggleTheme } = useThemeMode();
//     return (
//         <Container maxWidth={false} className="nonauth-root">
//             <Box className="nonauth-theme-toggle">
//                 <IconButton
//                     tabIndex={-1}
//                     sx={{
//                         color: mode == "dark" ? "warning.main" : "text.primary",
//                         bgcolor: 'background.elevated'
//                     }}
//                     onClick={toggleTheme}
//                 >
//                     {mode == "dark" ? <SunnyIcon /> : <DarkModeIcon />}
//                 </IconButton>
//             </Box>

//             <Paper elevation={10} className="nonauth-paper">
//                 <Box
//                     className="nonauth-left"
//                     display={{ xs: 'none', md: 'flex' }}
//                     bgcolor={"background.elevated"}
//                     p={5}
//                 >
//                     <Stack direction={"row"} gap={1.5} px={3}>
//                         <Icon path={mdiSprout} size={1} className="text-brand" />
//                         <Typography variant="h2" fontWeight="medium" color="text.primary">Chlora</Typography>
//                     </Stack>

//                     <Stack
//                         alignSelf={"center"}
//                         width={"60%"}
//                         height={"40%"}
//                     >
//                         <Lottie
//                             animationData={nonAuthIcon}
//                             loop
//                             style={{ width: "100%", height: "100%" }}
//                         />
//                     </Stack>


//                     <Stack
//                         alignItems="center"
//                         textAlign="center"
//                         spacing={1}
//                     >
//                         <Box>
//                             <Typography variant="h2" fontWeight="medium" >
//                                 Smart Monitoring for
//                             </Typography>
//                             <Typography variant="h2" fontWeight="medium" color="primary">
//                                 Modern Growth.
//                             </Typography>
//                         </Box>

//                         <Box sx={{ opacity: 0.8 }}>
//                             <Typography variant="h6" fontWeight="light">
//                                 Harness the power of machine learning to
//                             </Typography>
//                             <Typography variant="h6" fontWeight="light">
//                                 optimize your plantation's yield.
//                             </Typography>
//                         </Box>
//                     </Stack>

//                     <Stack>
//                         <Box className="nonauth-swiper-container" >
//                             <Card
//                                 elevation={5}
//                                 className='nonauth-swiper-card'
//                             >
//                                 <Swiper
//                                     modules={[Pagination, Autoplay, Mousewheel, FreeMode]}
//                                     slidesPerView={1}
//                                     spaceBetween={12}
//                                     loop
//                                     grabCursor
//                                     mousewheel={{ forceToAxis: true }}
//                                     freeMode={false}
//                                     autoplay={{ delay: 3000, disableOnInteraction: false }}
//                                     pagination={{ clickable: true }}
//                                     autoHeight
//                                 >
//                                     {cardContent.map((item, index) => (
//                                         <SwiperSlide
//                                             key={index}
//                                             style={{
//                                                 width: 'auto',
//                                                 display: 'flex',
//                                                 alignItems: 'center',
//                                             }}
//                                         >
//                                             <CardContent
//                                                 sx={{
//                                                     width: '100%',
//                                                     display: 'flex',
//                                                     flexDirection: 'row',
//                                                     gap: 4,
//                                                     py: 3,
//                                                     px: 4
//                                                 }}
//                                             >
//                                                 <Box display="flex" alignItems="center" color={"primary.main"}>
//                                                     <Icon path={item.icon} size={1.2} color={item.color} />
//                                                 </Box>

//                                                 <Box>
//                                                     <Typography variant="h6" fontWeight={"medium"}>
//                                                         {item.title}
//                                                     </Typography>
//                                                     <Typography variant="body1" fontWeight={"light"} sx={{ opacity: 0.7 }}>
//                                                         {item.desc}
//                                                     </Typography>
//                                                 </Box>
//                                             </CardContent>
//                                         </SwiperSlide>
//                                     ))}
//                                 </Swiper>
//                             </Card>
//                         </Box>
//                     </Stack>
//                 </Box >

//                 <Box
//                     className="nonauth-right"
//                     px={5}
//                     py={3}
//                 >
//                     {props.children}

//                     <Box
//                         className="nonauth-copyright-section"
//                     >
//                         <Typography variant="body1" color="text.secondary">
//                             © {new Date().getFullYear()} Chlora. All rights reserved.
//                         </Typography>
//                     </Box>
//                 </Box>

//             </Paper >
//         </Container >
//     );
// };

const NonAuthLayout = ({ children }) => {
    const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }))

    return (
        <>
            <Toaster />
            <div className="flex min-h-svh items-center justify-center bg-muted p-6 md:p-10">
                <div className="w-full max-w-sm md:max-w-4xl">

                    <Card className="overflow-hidden p-0">
                        <CardContent className="grid p-0 md:grid-cols-2">
                            <div className='hidden md:flex flex-col justify-between gap-6 bg-muted/50 p-8 border-r'>

                                <div className='flex flex-row items-center gap-2 '>
                                    <Sprout className='size-5 text-green-700' />
                                    <span className='text-xl font-semibold tracking-tight'>Chlora</span>
                                </div>

                                <div className='flex flex-col items-center gap-4 text-center'>
                                    <Lottie
                                        animationData={nonAuthIcon}
                                        loop
                                        className='w-48 h-48'
                                    />

                                    <div>
                                        <h2 className="text-xl font-semibold leading-snug">Smart Monitoring for</h2>
                                        <h2 className="text-xl font-semibold leading-snug text-green-700">Modern Growth.</h2>


                                        <p className="text-sm text-muted-foreground">
                                            Harness the power of machine learning to optimize your plantation's yield.
                                        </p>
                                    </div>
                                </div>

                                <Carousel
                                    plugins={[plugin.current]}
                                    onMouseEnter={plugin.current.stop}
                                    onMouseLeave={plugin.current.reset}
                                    className="w-full"
                                >
                                    <CarouselContent>
                                        {featureContent.map((item, index) => (
                                            <CarouselItem key={index}>
                                                <Card className="border shadow-none bg-background">
                                                    <CardContent className="flex flex-row items-start gap-4 p-4">
                                                        <div className="mt-0.5 shrink-0 text-green-700">
                                                            <item.icon className="size-5" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-semibold">{item.title}</p>
                                                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                </Carousel>
                            </div>

                            <div className="flex flex-col justify-center p-6 md:p-8">
                                {children}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div >
        </>
    )
}


NonAuthLayout.propTypes = {
    children: PropTypes.any,
};

export default NonAuthLayout;