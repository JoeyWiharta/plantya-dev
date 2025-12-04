import React, { useState } from "react";
import { Paper, Container } from "@mui/material";
import { Typography, Button, Grid } from '@mui/material';
import RootPageCustom from "../../components/common/RootPageCustom";

const Dashboard = () => {

    const [firstRender, setFirstRender] = useState(true)

    const [alertMsg, setAlertMsg] = useState("");

    return (
        <React.Fragment>
            <RootPageCustom
                msg={alertMsg}
                setMsg={setAlertMsg}
            >
                <Typography variant="h4" gutterBottom>
                    Halaman Dashboard
                </Typography>
                <Typography>
                    Ini adalah contoh bagaimana menggunakan komponen AlertMessage yang Anda buat.
                </Typography>

                <Grid container spacing={2} sx={{ mt: 3 }}>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={() => setAlertMsg("Data berhasil disimpan!")}
                        >
                            Tampilkan Alert Sukses
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => { setAlertMsg("Terjadi kesalahan pada server!") }}                        >
                            Tampilkan Alert Error
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="warning"
                            onClick={() => {
                                setAlertMsg("Warning  pada server!");
                            }}                        >
                            Tampilkan Alert Warning
                        </Button>
                    </Grid>
                </Grid>
            </RootPageCustom>
        </React.Fragment >
    );
}
export default Dashboard;
