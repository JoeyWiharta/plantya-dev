import React, { useState, useEffect, useCallback, act } from "react";
import RootPageCustom from "../../components/common/RootPageCustom";
import TableCustom from "../../components/common/TableCustom";
import { getUser, deleteUser, getUserDeleted, restoreUser } from "../../utils/ListApi";
import MasterUserAdd from "./MasterUserAdd";
import MasterUserEdit from "./MasterUserEdit";
import PopupDeleteAndRestore from "../../components/common/PopupDeleteAndRestore";
import Icon from '@mdi/react';
import {
    Container,
    Typography,
    Grid,
    TextField,
    IconButton,
    Stack,
    Autocomplete,
    Tooltip,
    Button,
    Tab,
    Tabs,
    Box
} from "@mui/material";
import {
    mdiTrashCanOutline,
    mdiSquareEditOutline,
    mdiPlus,
    mdiMagnify,
    mdiRestore
} from '@mdi/js';

const MasterUser = () => {
    // State First Page, Message, and Loading Effect
    const [firstRender, setFirstRender] = useState(false)
    const [app002p01Page, setApp002p01Page] = useState(true);
    const [active, setActive] = useState("activeUser")
    const handleTabChange = (event, newValue) => {
        setActive(newValue);
        setRole("")
        setSearch("")
        refreshTable()
    };
    const [app002Msg, setApp002setMsg] = useState("");
    const [app002MsgStatus, setApp002setMsgStatus] = useState("");
    const [loadingData, setLoadingData] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false)
    const [loadingRestore, setLoadingRestore] = useState(false)

    // State Data User, Filtering, and Param
    const [search, setSearch] = useState("")
    const [role, setRole] = useState("")
    const [app002UserData, setApp002UserData] = useState([]);
    const [app002UserDeletedData, setApp002UserDeletedData] = useState([]);
    const [app002UserTotalData, setApp002UserTotalData] = useState(0)
    const [app002UserDeletedTotalData, setApp002UserDeletedTotalData] = useState(0)
    const [app002TotalPage, app002SetTotalPage] = useState(0)
    const [app002TotalPageDeleted, app002SetTotalPageDeleted] = useState(0)
    const [app002UserDataParam, setApp002UserDataParam] = useState(
        {
            page: 1,
            size: 10,
            sort: "",
            order: "asc",
            search: "",
            role: "",
        }
    )
    const [app002UserDeletedDataParam, setApp002UserDeletedDataParam] = useState(
        {
            page: 1,
            size: 10,
            sort: "",
            order: "asc",
            search: "",
            role: "",
        }
    )

    // State Add, Edit, and Delete User
    const [modalAddOpen, setModalAddOpen] = useState(false);
    const [modalEditOpen, setModalEditOpen] = useState(false);
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [modalRestoreOpen, setModalRestoreOpen] = useState(false);
    const [app002UserEditData, setApp002UserEditData] = useState(null);
    const [app002UserDeleteData, setApp002UserDeleteData] = useState(null)
    const [app002UserRestoreData, setApp002UserRestoreData] = useState(null)

    // Table Configuration Active User (Header Table, Handle Page and Rows, Handle Sort)
    const app002UserColumns = [
        {
            dataField: "user_id",
            text: "User ID",
            sort: true,
            headerAlign: "center",
            bodyAlign: "center",
            minWidth: '100px',
        },
        {
            dataField: "name",
            text: "Name",
            sort: true,
            headerAlign: "center",
            bodyAlign: "center",
            minWidth: '100px',
        },
        {
            dataField: "role",
            text: "Role",
            sort: true,
            headerAlign: "center",
            bodyAlign: "center",
            minWidth: '100px',
        },
        {
            dataField: "email",
            text: "Email",
            sort: true,
            headerAlign: "center",
            bodyAlign: "center",
            minWidth: '100px',
        },
        {
            dataField: "action",
            text: "Action",
            headerAlign: "center",
            bodyAlign: 'center',
            minWidth: '100px',
            formatter: (cellContent, app002UserData) => (
                <>
                    <Stack direction="row" spacing={1} justifyContent="center">
                        <Tooltip title="Update User" placement="top">
                            <IconButton
                                aria-label="edit"
                                size="small"
                                onClick={() => handleModalEditOpen(app002UserData)}
                                color="info"
                            >
                                <Icon path={mdiSquareEditOutline} size={"20px"} />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete User" placement="top">
                            <IconButton
                                aria-label="delete"
                                size="small"
                                onClick={() => handleModalDeleteOpen(app002UserData)}
                                color="error"
                            >
                                <Icon path={mdiTrashCanOutline} size={"20px"} />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </>
            ),
        },
    ];

    const handleChangePage = (newPage) => {
        setApp002UserDataParam(prev => ({
            ...prev,
            page: newPage + 1
        }));
    };

    const handleChangeRowsPerPage = (newRowsPerPage) => {
        setApp002UserDataParam(prev => ({
            ...prev,
            size: newRowsPerPage,
            page: 1
        }));
    };

    const handleRequestSort = (property, order) => {
        setApp002UserDataParam(prev => ({
            ...prev,
            sort: property,
            order: order,
            page: 1
        }));
    };

    // Table Configuration Deleted User (Header Table, Handle Page and Rows, Handle Sort)
    const app002UserDeletedColumns = [
        {
            dataField: "user_id",
            text: "User ID",
            sort: true,
            headerAlign: "center",
            bodyAlign: "center",
            minWidth: '100px',
        },
        {
            dataField: "name",
            text: "Name",
            sort: true,
            headerAlign: "center",
            bodyAlign: "center",
            minWidth: '100px',
        },
        {
            dataField: "role",
            text: "Role",
            sort: true,
            headerAlign: "center",
            bodyAlign: "center",
            minWidth: '100px',
        },
        {
            dataField: "email",
            text: "Email",
            sort: true,
            headerAlign: "center",
            bodyAlign: "center",
            minWidth: '100px',
        },
        {
            dataField: "action",
            text: "Action",
            headerAlign: "center",
            minWidth: '150px',
            formatter: (cellContent, app002UserDeletedData) => (
                <>
                    <Stack direction="row" spacing={1} justifyContent="center">
                        <Tooltip title="Restore User" placement="top">
                            <IconButton
                                aria-label="restore"
                                size="small"
                                onClick={() => handleModalRestoreOpen(app002UserDeletedData)}
                                color="info"
                            >
                                <Icon path={mdiRestore} size={"20px"} />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </>
            ),
        },
    ];

    const handleChangePageDeleted = (newPage) => {
        setApp002UserDeletedDataParam(prev => ({
            ...prev,
            page: newPage + 1
        }));
    };

    const handleChangeRowsPerPageDeleted = (newRowsPerPage) => {
        setApp002UserDeletedDataParam(prev => ({
            ...prev,
            size: newRowsPerPage,
            page: 1
        }));
    };

    const handleRequestSortDeleted = (property, order) => {
        setApp002UserDeletedDataParam(prev => ({
            ...prev,
            sort: property,
            order: order,
            page: 1
        }));
    };

    // Data From API Active User
    const getAllUser = useCallback(async (param) => {
        setLoadingData(true);
        try {
            const response = await getUser(param);
            console.table(response.data.users)
            setApp002UserData(response?.data?.users ? response.data.users : []);
            setApp002UserTotalData(response?.data?.count_data ? response.data.count_data : 0);
            app002SetTotalPage(response?.data?.total_pages ? response.data?.total_pages : 0);


        } catch (error) {
            console.error("Gagal mengambil data:", error);

        } finally {
            setLoadingData(false);
        }
    });

    useEffect(() => {
        if (app002p01Page && active == "activeUser") {
            getAllUser(app002UserDataParam);
        }
    }, [app002UserDataParam, active]);

    // Data From API Deleted User
    const getAllDeletedUser = useCallback(async (param) => {
        setLoadingData(true);
        try {
            const response = await getUserDeleted(param);
            console.table(response.data.users)
            setApp002UserDeletedData(response?.data?.users ? response.data.users : []);
            setApp002UserDeletedTotalData(response?.data?.count_data ? response.data.count_data : 0);
            app002SetTotalPageDeleted(response?.data?.total_pages ? response.data?.total_pages : 0);
        } catch (error) {
            console.error("Gagal mengambil data:", error);
        } finally {
            setLoadingData(false);
        }
    });

    useEffect(() => {
        if (app002p01Page && active == "deletedUser") {
            getAllDeletedUser(app002UserDeletedDataParam);
        }
    }, [app002UserDeletedDataParam, active]);

    // Search and Filtering (Free Text and Role)
    const roleOptions = [
        { value: "ADMIN", label: "Admin" },
        { value: "USER", label: "User" },
        { value: "STAFF", label: "Staff" },
    ];

    const handleRoleChange = (event) => {
        setRole(event)
        setSearch("")

        if (active == "activeUser") {
            setApp002UserDataParam(prev => ({
                ...prev,
                "page": 1,
                "role": event,
                "search": ""
            }))
        } else if (active == "deletedUser") {
            setApp002UserDeletedDataParam(prev => ({
                ...prev,
                "page": 1,
                "role": event,
                "search": ""
            }))
        }
    }

    const handleSearchState = () => {
        if (active == "activeUser") {
            setApp002UserDataParam(prev => ({
                ...prev,
                page: 1,
                search: search
            }))
        } else if (active == "deletedUser") {
            setApp002UserDeletedDataParam(prev => ({
                ...prev,
                page: 1,
                search: search
            }))
        }
    }

    // Refresh Table Function
    const refreshTable = useCallback(() => {
        setSearch("");
        setRole("");
        setApp002UserDataParam({
            page: 1,
            size: 10,
            sort: "",
            order: "asc",
            search: "",
            role: "",
        });
        setApp002UserDeletedDataParam({
            page: 1,
            size: 10,
            sort: "",
            order: "asc",
            search: "",
            role: "",
        });
    });

    // Form Add Modal
    const handleModalAddOpen = () => {
        setApp002setMsg("")
        setModalAddOpen(true)
    }

    // Form Edit Modal
    const handleModalEditOpen = (obj) => {
        setApp002setMsg("")
        setModalEditOpen(true)
        setApp002UserEditData(obj)
    }

    // Form Delete Modal
    const handleModalDeleteOpen = (obj) => {
        setApp002setMsg("")
        setModalDeleteOpen(true)
        setApp002UserDeleteData(obj)
    }
    const app002HandleDeleteUser = () => {
        if (app002UserDeleteData.user_id) {
            deleteUserAction(app002UserDeleteData)
        }
    }
    const deleteUserAction = useCallback(async (param) => {
        try {
            setLoadingDelete(true)
            const response = await deleteUser(param.user_id)

            if (response.status === 204 || response.status === 200) {
                setApp002setMsg("User Has Been Successfully Deleted.")
                setApp002setMsgStatus("success")
            } else {
                setApp002setMsg("Failed to delete user.")
                setApp002setMsgStatus("error")
            }
        } catch (error) {
            debugger
            console.log(error)
            setApp002setMsg(error?.response?.data?.detail || "System is Unavailable. Please Try Again Later.")
            setApp002setMsgStatus("error")
        } finally {
            setModalDeleteOpen(false)
            setLoadingDelete(false)
            refreshTable();
        }
    })

    // Form Restore Modal
    const handleModalRestoreOpen = (obj) => {
        setApp002setMsg("")
        setModalRestoreOpen(true)
        setApp002UserRestoreData(obj)
    }
    const app002HandleRestoreUser = () => {
        if (app002UserRestoreData.user_id) {
            restoreUserAction(app002UserRestoreData)
        }
    }
    const restoreUserAction = useCallback(async (param) => {
        try {
            setLoadingRestore(true)
            const response = await restoreUser(param.user_id)

            if (response.status === 201 || response.status === 200) {
                setApp002setMsg("User Has Been Successfully Restored.")
                setApp002setMsgStatus("success")
            } else {
                setApp002setMsg("Failed to restore user.")
                setApp002setMsgStatus("error")
            }
        } catch (error) {
            debugger
            console.log(error)
            setApp002setMsg(error?.response?.data?.detail || "System is Unavailable. Please Try Again Later.")
            setApp002setMsgStatus("error")
        } finally {
            setModalRestoreOpen(false)
            setLoadingRestore(false)
            refreshTable();
        }
    })

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
                        px: 1,
                    }}

                >
                    <Stack
                        // spacing={2}
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

                        <Grid
                            container
                            size={12}
                            sx={{
                                mb: 2
                            }}
                        >

                            <Tabs
                                value={active}
                                onChange={handleTabChange}
                            >
                                <Tab label="Active User" value="activeUser"
                                    sx={{
                                        textTransform: 'none',
                                    }}
                                />
                                <Tab label="Deleted User" value="deletedUser"
                                    sx={{
                                        textTransform: 'none',
                                    }}
                                />
                            </Tabs>


                        </Grid>

                        {/* Tab Active User */}
                        {active === "activeUser" && (
                            <Box>
                                <Grid container alignItems="center" size={12} sx={{ mb: 2 }}>
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
                                                            sx={{
                                                                color: 'text.secondary'
                                                            }}
                                                        >
                                                            <Icon path={mdiMagnify} size={"28px"} />
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
                                            sx={{
                                                '& .MuiAutocomplete-popupIndicator': {
                                                    color: 'text.secondary',
                                                },
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
                                        sx={{
                                            pl: 2
                                        }}
                                    >
                                        <Button
                                            variant="contained"
                                            color="success"
                                            endIcon={<Icon path={mdiPlus} size={"20px"} />}
                                            sx={{
                                                textTransform: 'none',
                                                '&:hover': {
                                                    bgcolor: '#61A05A'
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
                                    appdata={app002UserData}
                                    appdataTotal={app002UserTotalData}
                                    totalPage={app002TotalPage}
                                    rowsPerPageOption={[2, 10, 20, 25]}

                                    page={app002UserDataParam.page - 1}
                                    rowsPerPage={app002UserDataParam.size}
                                    sortField={app002UserDataParam.sort}
                                    sortOrder={app002UserDataParam.order}


                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    onRequestSort={handleRequestSort}
                                />
                            </Box>
                        )}

                        {/* Tab Deleted User */}
                        {active === "deletedUser" && (
                            <Box>
                                <Grid container alignItems="center" size={12} sx={{ mb: 2 }}>
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
                                                            sx={{
                                                                color: 'text.secondary'
                                                            }}
                                                        >
                                                            <Icon path={mdiMagnify} size={"28px"} />
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
                                            sx={{
                                                '& .MuiAutocomplete-popupIndicator': {
                                                    color: 'text.secondary',
                                                },
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
                                        sx={{
                                            pl: 2
                                        }}
                                    >
                                    </Grid>



                                </Grid>



                                <TableCustom
                                    keyField="user_id"
                                    loadingData={loadingData}
                                    columns={app002UserDeletedColumns}
                                    appdata={app002UserDeletedData}
                                    appdataTotal={app002UserDeletedTotalData}
                                    totalPage={app002TotalPageDeleted}
                                    rowsPerPageOption={[5, 10, 20, 25]}

                                    page={app002UserDeletedDataParam.page - 1}
                                    rowsPerPage={app002UserDeletedDataParam.size}
                                    sortField={app002UserDeletedDataParam.sort}
                                    sortOrder={app002UserDeletedDataParam.order}


                                    onPageChange={handleChangePageDeleted}
                                    onRowsPerPageChange={handleChangeRowsPerPageDeleted}
                                    onRequestSort={handleRequestSortDeleted}
                                />
                            </Box>
                        )}

                    </Stack>
                </Container>

                {modalAddOpen && (
                    <MasterUserAdd
                        modalAddOpen={modalAddOpen}
                        setModalAddOpen={setModalAddOpen}
                        refreshTable={refreshTable}
                        // Props for message
                        app002Msg={app002Msg}
                        setApp002setMsg={setApp002setMsg}
                        app002MsgStatus={app002MsgStatus}
                        setApp002setMsgStatus={setApp002setMsgStatus}
                    >
                    </MasterUserAdd>
                )}

                {modalEditOpen && (
                    <MasterUserEdit
                        modalEditOpen={modalEditOpen}
                        setModalEditOpen={setModalEditOpen}
                        refreshTable={refreshTable}

                        // Props for message and data
                        app002UserEditData={app002UserEditData}
                        app002Msg={app002Msg}
                        setApp002setMsg={setApp002setMsg}
                        app002MsgStatus={app002MsgStatus}
                        setApp002setMsgStatus={setApp002setMsgStatus}
                    />
                )}

                {modalDeleteOpen && (
                    <PopupDeleteAndRestore
                        status={"delete"}
                        modalOpen={modalDeleteOpen}
                        modalClose={() => setModalDeleteOpen(false)}
                        loading={loadingDelete}
                        onClick={app002HandleDeleteUser}
                    />
                )}

                {modalRestoreOpen && (
                    <PopupDeleteAndRestore
                        status={"restore"}
                        modalOpen={modalRestoreOpen}
                        modalClose={() => setModalRestoreOpen(false)}
                        loading={loadingRestore}
                        onClick={app002HandleRestoreUser}
                    />
                )}


            </RootPageCustom>
        </React.Fragment >
    );
}

export default MasterUser;