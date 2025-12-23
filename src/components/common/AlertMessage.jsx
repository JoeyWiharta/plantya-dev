import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Alert, IconButton, Box, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AlertMessage = (props) => {

    useEffect(() => {
        if (props.msg) {
            const timer = setTimeout(() => {
                props.stateData("");
            }, 3000);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [props.msg, props.stateData]);

    const alertClose = () => {
        props.stateData("")
    }

    return (
        <Box
            sx={{
                position: "fixed",
                top: 70, // Jarak dari atas layar
                left: 0,
                width: "100%",
                display: "flex",
                justifyContent: "center",
                zIndex: 2000, // Pastikan muncul di atas konten lain
                pointerEvents: "none", // Agar tidak memblok interaksi di halaman
            }}
        >
            <Box
                sx={{
                    width: '90%',
                    maxWidth: 1000,        // batas maksimum
                    px: { xs: 2, sm: 0 }, // padding kiri-kanan di mobile
                    pointerEvents: 'auto',
                }}
            >
                {/* Animasi saat alert muncul dan hilang */}
                <Slide
                    direction="down"
                    in={!!props.msg} // Tampilkan jika ada pesan
                    mountOnEnter
                    unmountOnExit
                >
                    {/* Komponen Alert asli Anda, tanpa perubahan kecuali mb: 2 dihapus */}
                    <Alert
                        severity={props.msgStatus ? props.msgStatus : "error"}
                        variant="filled"
                        onClose={alertClose}
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={alertClose}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{
                            // mb: 2 dihapus karena tidak lagi relevan
                            color: "inherit"
                        }}
                    >
                        {/* Logika rendering pesan asli Anda TETAP DIPERTAHANKAN */}
                        {typeof props.msg == 'string' ? props.msg : props.msg.listmessage?.map((msg, key) => (<p key={key}>{"* " + msg}</p>))}
                    </Alert>
                </Slide>
            </Box>
        </Box>
    )
}

AlertMessage.propTypes = {
    msg: PropTypes.string,
    stateData: PropTypes.func,
    msgStatus: PropTypes.string,
};

export default AlertMessage