import React, { useState, useEffect, useCallback } from "react";
import { Container, Box, Typography, Grid, Paper, Card, CardHeader, CardContent, TextField, IconButton, Stack, Select, MenuItem, Autocomplete } from "@mui/material";
import { Button } from "@mui/material";
import RootPageCustom from "../../components/common/RootPageCustom";
import TableCustom from "../../components/common/TableCustom";
import { getUser } from "../../utils/ListApi";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Icon } from "@iconify/react";

const MasterUser = () => {
    const [firstRender, setFirstRender] = useState(false)
    const [app002p01Page, setApp002p01Page] = useState(true);

    const [app002Msg, setApp002setMsg] = useState("");
    const [app002MsgStatus, setApp002setMsgStatus] = useState("");

    // Table Data and Loading
    const [loadingData, setLoadingData] = useState(false);
    const [app002p01UserData, setApp002p01UserData] = useState([]);
    const [app002p01UserTotalData, setApp002p01UserTotalData] = useState(0)
    const [totalPage, setTotalPage] = useState(0)

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
            headerStyle: { textAlign: 'center', width: 'auto' }
        },
        {
            dataField: "name",
            text: "Username",
            sort: true,
            align: "center",
            headerStyle: { textAlign: 'center', width: 'auto' },
        },
        {
            dataField: "role",
            text: "Role",
            sort: true,
            align: "center",
            headerStyle: { textAlign: 'center', width: 'auto' }
        },
        {
            dataField: "email",
            text: "Email",
            sort: true,
            align: "center",
            headerStyle: { textAlign: 'center', width: 'auto' }
        },
        {
            dataField: "action",
            text: "Action",
            headerStyle: { textAlign: 'center', width: 'auto' },
            formatter: (cellContent, row) => (
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                    <IconButton aria-label="edit" size="small" onClick={() => console.log('Edit user:', row)} color="info"><EditIcon fontSize="inherit" /></IconButton>
                    <IconButton aria-label="delete" size="small" onClick={() => console.log('Delete user:', row)} color="error"><DeleteIcon fontSize="inherit" /></IconButton>
                </Box>
            ),
        },
    ];

    const getAllUser = useCallback(async () => {
        setLoadingData(true);
        try {
            const response = await getUser(app002p01UserDataParam);
            if (response?.data) {
                setApp002p01UserData(response?.data?.data ? response.data.data : []);
                setApp002p01UserTotalData(response?.data?.count_data ? response.data.count_data : 0);
                setTotalPage(response?.data?.total_pages ? response.data?.total_pages : 0);
            }
        } catch (error) {
            console.error("Gagal mengambil data:", error);

        } finally {
            setLoadingData(false);
        }
    }, [app002p01UserDataParam]);

    // Call API
    useEffect(() => {
        getAllUser();
    }, [getAllUser]);

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
    const [role, setRole] = useState("")
    const roleOptions = [
        { value: "ADMIN", label: "Admin" },
        { value: "USER", label: "User" },
        { value: "STAFF", label: "Staff" },
    ];
    const handleRoleChange = (event) => {
        debugger
        setRole(event.target.value)
        setSearch("")
    }

    useEffect(() => {
        setApp002p01UserDataParam(prev => ({
            ...prev,
            "page": 1,
            "size": 10,
            "sort": "",
            "order": "asc",
            "role": role,
            "search": ""
        }))
    }, [role])

    const [search, setSearch] = useState("")
    const handleSearchInputChange = (event) => {
        setSearch(event.target.value);
    };
    const updateSearch = () => {
        setApp002p01UserDataParam(prev => ({
            ...prev,
            "page": 1,
            "size": 10,
            "sort": "",
            "order": "asc",
            "search": search
        }));
    };


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
                    maxWidth="xl"
                    sx={{
                        display: app002p01Page ? "block" : "none",
                        py: 1,
                        px: 2,
                    }}
                    
                >
                    <Stack spacing={2}>
                        <Grid
                            container
                            size={12}
                        >
                            <Typography variant="h6" fontWeight="bold">
                                Master User
                            </Typography>
                        </Grid>

                        <Grid container alignItems="center">
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
                                    onChange={handleSearchInputChange}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter') {
                                            updateSearch()
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
                                                    onClick={updateSearch}
                                                    edge="end"
                                                    size="small"
                                                >
                                                    <Icon icon="mdi:magnify" width={20} />
                                                </IconButton>
                                            ),
                                        }
                                    }}
                                />
                            </Grid>


                            <Grid size={{ xs: 4, sm: 2 }}>
                                <Autocomplete
                                    fullWidth
                                    options={roleOptions}
                                    getOptionLabel={(option) => option.label}
                                    value={roleOptions.find((opt) => opt.value === role) || null}
                                    onChange={(event, newValue) => {
                                        handleRoleChange({
                                            target: { value: newValue ? newValue.value : "" }
                                        });
                                    }}
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
                            >
                                <Button
                                    variant="contained"
                                    startIcon={<Icon icon="mdi:plus" />}
                                    sx={{
                                        textTransform: 'none',
                                        bgcolor: 'button.success',
                                        '&:hover': {
                                            bgcolor: 'button.success',
                                            opacity: 0.9,
                                        },
                                    }}
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
                            rowsPerPageOption={[5, 10, 20, 25]}

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
            </RootPageCustom>
        </React.Fragment >
    );
}

export default MasterUser;