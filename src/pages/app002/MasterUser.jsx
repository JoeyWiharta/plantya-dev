import React, { useState, useEffect, useCallback } from "react";
import { Container, Box, Typography, Grid, Paper, Card, CardHeader, CardContent, TextField, IconButton, Stack, Select, MenuItem, Autocomplete } from "@mui/material";
import { Button } from "@mui/material";
import RootPageCustom from "../../components/common/RootPageCustom";
import TableCustom from "../../components/common/TableCustom";
import { getUser } from "../../utils/ListApi";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Icon } from "@iconify/react";
import plusIcon from "@iconify/icons-mdi/plus";
import magnifyIcon from "@iconify/icons-mdi/magnify";
import MasterUserAdd from "./MasterUserAdd";



const MasterUser = () => {
    const [firstRender, setFirstRender] = useState(false)
    const [app002p01Page, setApp002p01Page] = useState(true);
    const [app002Msg, setApp002setMsg] = useState("");
    const [app002MsgStatus, setApp002setMsgStatus] = useState("");
    const [loadingData, setLoadingData] = useState(false);
    const [app002p01UserData, setApp002p01UserData] = useState([]);
    const [app002p01UserTotalData, setApp002p01UserTotalData] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const [search, setSearch] = useState("")
    const [role, setRole] = useState("")

    const [modalAddOpen, setModalAddOpen] = useState(false);

    // Get All Param
    const [app002p01UserDataParam, setApp002p01UserDataParam] = useState(
        {
            page: 1,
            size: 10,
            sort: "",
            order: "asc",
            search: "",
            role: "",
        }
    )

    // Header Column
    const app002UserColumns = [
        {
            dataField: "user_id",
            text: "User ID",
            sort: true,
            align: "center",
            // PERUBAHAN: Gunakan width untuk kontrol yang pasti
            width: '120px',
        },
        {
            dataField: "name",
            text: "Name",
            sort: true,
            align: "center",
            width: '200px',
        },
        {
            dataField: "role",
            text: "Role",
            sort: true,
            align: "center",
            width: '120px',
        },
        {
            dataField: "email",
            text: "Email",
            sort: true,
            align: "center",
            width: '250px',
        },
        {
            dataField: "action",
            text: "Action",
            align: "center",
            width: '150px',
            formatter: (cellContent, row) => (
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                    <IconButton aria-label="edit" size="small" onClick={() => console.log('Edit user:', row)} color="info"><EditIcon fontSize="inherit" /></IconButton>
                    <IconButton aria-label="delete" size="small" onClick={() => console.log('Delete user:', row)} color="error"><DeleteIcon fontSize="inherit" /></IconButton>
                </Box>
            ),
        },
    ];


    const getAllUser = useCallback(async (param) => {
        setLoadingData(true);
        try {
            const response = await getUser(param);

            setApp002p01UserData(response?.data?.data ? response.data.data : []);
            setApp002p01UserTotalData(response?.data?.count_data ? response.data.count_data : 0);
            setTotalPage(response?.data?.total_pages ? response.data?.total_pages : 0);

        } catch (error) {
            console.error("Gagal mengambil data:", error);

        } finally {
            setLoadingData(false);
        }
    });

    // Call API
    useEffect(() => {
        getAllUser(app002p01UserDataParam);
    }, [app002p01UserDataParam]);

    // Handle Page, Rows, and Sort Function
    const handleChangePage = (newPage) => {
        setApp002p01UserDataParam(prev => ({
            ...prev,
            page: newPage + 1
        }));
    };

    const handleChangeRowsPerPage = (newRowsPerPage) => {
        setApp002p01UserDataParam(prev => ({
            ...prev,
            size: newRowsPerPage,
            page: 1
        }));
    };

    const handleRequestSort = (property, order) => {
        setApp002p01UserDataParam(prev => ({
            ...prev,
            sort: property,
            order: order,
            page: 1
        }));
    };

    // Search and Filtering
    const roleOptions = [
        { value: "ADMIN", label: "Admin" },
        { value: "USER", label: "User" },
        { value: "STAFF", label: "Staff" },
    ];
    const handleRoleChange = (event) => {
        debugger
        setRole(event)
        setSearch("")

        setApp002p01UserDataParam(prev => ({
            ...prev,
            "page": 1,
            "role": event,
            "search": ""
        }))
    }

    const handleSearchState = () => {
        setApp002p01UserDataParam(prev => ({
            ...prev,
            page: 1,
            search: search
        }));
    }

    const handleModalAddOpen = () => {
        debugger
        setModalAddOpen(true)
    }

    const handleModalAddClose = () => {
        debugger
        setModalAddOpen(false)
    }





    return (
        <React.Fragment>
            <RootPageCustom
                msgStateGet={app002Msg}
                msgStateSet={setApp002setMsg}
                msgStateGetStatus={app002MsgStatus}
                setFirstRender={setFirstRender}
            >
                <Container
                    disableGutters
                    maxWidth={false}
                    sx={{
                        display: app002p01Page ? "block" : "none",
                        py: 1,
                        px: 2,
                    }}

                >
                    <Stack spacing={2}
                        sx={{ overflowX: 'hidden' }}
                    >

                        <Grid
                            container
                            size={12}
                        >
                            <Typography variant="h6" fontWeight="bold">
                                Master User
                            </Typography>
                        </Grid>

                        <Grid container alignItems="center" size={12}>
                            <Grid
                                size={{ xs: 4, sm: 3 }}
                                sx={{
                                    pr: 2
                                }}
                            >
                                <TextField
                                    fullWidth
                                    placeholder="Search"
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value)
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSearchState()
                                        }
                                    }}
                                    size="small"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            '& fieldset': {
                                                borderColor: 'custom.line',
                                                borderWidth: 1.5,
                                            },

                                            '&:hover fieldset': {
                                                borderColor: 'custom.line',
                                                borderWidth: 2.5
                                            },

                                            '&.Mui-focused fieldset': {
                                                borderColor: 'custom.line',
                                                borderWidth: 2.5
                                            },
                                        },
                                    }}
                                    slotProps={{
                                        input: {
                                            endAdornment: (
                                                <IconButton
                                                    aria-label="search button"
                                                    onClick={handleSearchState}
                                                    edge="end"
                                                    size="small"
                                                >
                                                    <Icon icon={magnifyIcon} width={20} />
                                                </IconButton>
                                            ),
                                        }
                                    }}
                                />
                            </Grid>


                            <Grid container size={{ xs: 4, sm: 2 }}>
                                <Autocomplete
                                    fullWidth
                                    options={roleOptions}
                                    getOptionLabel={(option) => option.label}
                                    value={roleOptions.find((opt) => opt.value === role) || null}
                                    onChange={(event, newValue) => { handleRoleChange(newValue ? newValue.value : ""); }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            placeholder="Role"
                                            size="small"
                                            fullWidth={true}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 2,
                                                    '& fieldset': {
                                                        borderColor: 'custom.line',
                                                        borderWidth: 1.5,
                                                    },

                                                    '&:hover fieldset': {
                                                        borderColor: 'custom.line',
                                                        borderWidth: 2.5
                                                    },

                                                    '&.Mui-focused fieldset': {
                                                        borderColor: 'custom.line',
                                                        borderWidth: 2.5
                                                    },
                                                },
                                            }}
                                        />
                                    )}
                                    isOptionEqualToValue={(opt, val) => opt.value === val.value}
                                    clearOnEscape
                                />
                            </Grid>

                            <Grid
                                container
                                size={{ xs: 4, sm: 7 }}
                                justifyContent="flex-end"
                                alignItems="center"
                                sx={{
                                    pl: 2
                                }}
                            >
                                <Button
                                    variant="contained"
                                    endIcon={<Icon icon={plusIcon} />}
                                    sx={{
                                        textTransform: 'none',
                                        bgcolor: 'button.success',
                                        '&:hover': {
                                            bgcolor: 'button.success',
                                            opacity: 0.9,
                                        },
                                    }}
                                    onClick={handleModalAddOpen}
                                >
                                    Add User
                                </Button>
                            </Grid>



                        </Grid>



                        <TableCustom
                            keyField="user_id"
                            loadingData={loadingData}
                            columns={app002UserColumns}
                            appdata={app002p01UserData}
                            appdataTotal={app002p01UserTotalData}
                            totalPage={totalPage}
                            rowsPerPageOption={[2, 10, 20, 25]}

                            page={app002p01UserDataParam.page - 1}
                            rowsPerPage={app002p01UserDataParam.size}
                            sortField={app002p01UserDataParam.sort}
                            sortOrder={app002p01UserDataParam.order}


                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            onRequestSort={handleRequestSort}
                        />

                    </Stack>
                </Container>

                <MasterUserAdd
                    modalAddOpen={modalAddOpen}
                    handleModalAddClose={handleModalAddClose}
                    fullWidth={true}
                    maxWidth={"xs"}
                >
                </MasterUserAdd>

            </RootPageCustom>
        </React.Fragment >
    );
}

export default MasterUser;