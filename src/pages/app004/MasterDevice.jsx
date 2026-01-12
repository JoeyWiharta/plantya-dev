import React, { useState, useEffect, useCallback, act } from "react";
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
    Box
} from "@mui/material";
import RootPageCustom from "../../components/common/RootPageCustom";
import TableCustom from "../../components/common/TableCustom";
import { getDevice, deleteDevice } from "../../utils/ListApi";
import PopupDeleteAndRestore from "../../components/common/PopupDeleteAndRestore";
import { Trash2, SquarePen, Plus, Search, RotateCcw } from "lucide-react";
import DeviceAdd from "./DeviceAdd";
import DeviceEdit from "./DeviceEdit";

const MasterDevice = () => {
    // State First Page, Message, and Loading Effect
    const [firstRender, setFirstRender] = useState(false)
    const [app003p01Page, setApp003p01Page] = useState(true);

    const [app003Msg, setApp003setMsg] = useState("");
    const [app003MsgStatus, setApp003setMsgStatus] = useState("");
    const [loadingData, setLoadingData] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false)
    const [loadingRestore, setLoadingRestore] = useState(false)

    // State Data Device, Filtering, and Param
    const [search, setSearch] = useState("")
    const [app003DeviceData, setApp003DeviceData] = useState([]);
    const [app003DeviceTotalData, setApp003DeviceTotalData] = useState(0)
    const [app003TotalPage, app003SetTotalPage] = useState(0)
    const [app003DeviceDataParam, setApp003DeviceDataParam] = useState(
        {
            page: 1,
            size: 10,
            sort: "",
            order: "asc",
            search: "",
        }
    )


    // State Add, Edit, and Delete Device
    const [modalAddOpen, setModalAddOpen] = useState(false);
    const [modalEditOpen, setModalEditOpen] = useState(false);
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [modalRestoreOpen, setModalRestoreOpen] = useState(false);
    const [app003DeviceEditData, setApp003DeviceEditData] = useState(null);
    const [app003DeviceDeleteData, setApp003DeviceDeleteData] = useState(null)
    const [app003DeviceRestoreData, setApp003DeviceRestoreData] = useState(null)

    // Table Configuration Active Device (Header Table, Handle Page and Rows, Handle Sort)
    const app003DeviceColumns = [
        {
            dataField: "device_id",
            text: "Device ID",
            sort: true,
            headerAlign: "center",
            bodyAlign: 'center',
            minWidth: '100px',
        },
        {
            dataField: "device_name",
            text: "Device Name",
            sort: true,
            headerAlign: "center",
            bodyAlign: 'center',
            minWidth: '100px',
        },
        {
            dataField: "device_type",
            text: "Device Type",
            sort: true,
            headerAlign: "center",
            bodyAlign: 'center',
            minWidth: '100px',
        },
        {
            dataField: "cluster_id",
            text: "Cluster ID",
            sort: true,
            headerAlign: "center",
            bodyAlign: 'center',
            minWidth: '100px',
        },
        {
            dataField: "status",
            text: "Status",
            sort: true,
            headerAlign: "center",
            bodyAlign: 'center',
            minWidth: '100px',
        },
        {
            dataField: "action",
            text: "Action",
            headerAlign: "center",
            bodyAlign: 'left',
            minWidth: '100px',
            formatter: (cellContent, app002DeviceData) => (
                <>
                    <Stack direction="row" spacing={1} justifyContent="center">
                        <Tooltip title="Update Device" placement="top">
                            <IconButton
                                aria-label="edit"
                                size="small"
                                onClick={() => handleModalEditOpen(app002DeviceData)}
                                color="info"
                            >
                                <SquarePen size={18} />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete Device" placement="top">
                            <IconButton
                                aria-label="delete"
                                size="small"
                                onClick={() => handleModalDeleteOpen(app002DeviceData)}
                                color="error"
                            >
                                <Trash2 size={18} />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </>
            ),
        },
    ];

    const handleChangePage = (newPage) => {
        setApp003DeviceDataParam(prev => ({
            ...prev,
            page: newPage + 1
        }));
    };

    const handleChangeRowsPerPage = (newRowsPerPage) => {
        setApp003DeviceDataParam(prev => ({
            ...prev,
            size: newRowsPerPage,
            page: 1
        }));
    };

    const handleRequestSort = (property, order) => {
        setApp003DeviceDataParam(prev => ({
            ...prev,
            sort: property,
            order: order,
            page: 1
        }));
    };

    // Data From API Active Device
    const getAllDevice = useCallback(async (param) => {
        setLoadingData(true);
        try {
            const response = await getDevice(param);
            console.table(response.data.devices)
            setApp003DeviceData(response?.data?.devices ? response.data.devices : []);
            setApp003DeviceTotalData(response?.data?.count_data ? response.data.count_data : 0);
            app003SetTotalPage(response?.data?.total_pages ? response.data?.total_pages : 0);


        } catch (error) {
            console.error("Gagal mengambil data:", error);

        } finally {
            setLoadingData(false);
        }
    });

    useEffect(() => {
        if (app003p01Page) {
            getAllDevice(app003DeviceDataParam);
        }
    }, [app003DeviceDataParam]);


    // Search and Filtering (Free Text)
    const handleSearchState = () => {
        setApp003DeviceDataParam(prev => ({
            ...prev,
            page: 1,
            search: search
        }))

    }

    // Refresh Table Function
    const refreshTable = useCallback(() => {
        setSearch("");
        setApp003DeviceDataParam({
            page: 1,
            size: 10,
            sort: "",
            order: "asc",
            search: "",
        });
    });

    // Form Add Modal
    const handleModalAddOpen = () => {
        setApp003setMsg("")
        setModalAddOpen(true)
    }

    // Form Edit Modal
    const handleModalEditOpen = (obj) => {
        setApp003setMsg("")
        setModalEditOpen(true)
        setApp003DeviceEditData(obj)
    }

    // Form Delete Modal
    const handleModalDeleteOpen = (obj) => {
        setApp003setMsg("")
        setModalDeleteOpen(true)
        setApp003DeviceDeleteData(obj)
    }
    const app003HandleDeleteDevice = () => {
        if (app003DeviceDeleteData.device_id) {
            deleteDeviceAction(app003DeviceDeleteData)
        }
    }
    const deleteDeviceAction = useCallback(async (param) => {
        setLoadingData(true)
        try {
            const response = await deleteDevice(param.Device_id)

            if (response.status === 204 || response.status === 200) {
                setApp003setMsg("Device Has Been Successfully Deleted.")
                setApp003setMsgStatus("success")
            } else {
                setApp003setMsg("Failed to delete Device.")
                setApp003setMsgStatus("error")
            }
        } catch (error) {
            debugger
            console.log(error)
            setApp003setMsg(error?.response?.data?.detail || "System is Unavailable. Please Try Again Later.")
            setApp003setMsgStatus("error")
        } finally {
            setModalDeleteOpen(false)
            setLoadingDelete(false)
            refreshTable();
        }
    })

    return (
        <React.Fragment>
            <RootPageCustom
                msgStateGet={app003Msg}
                msgStateSet={setApp003setMsg}
                msgStateGetStatus={app003MsgStatus}
                setFirstRender={setFirstRender}
            >
                <Container
                    disableGutters
                    maxWidth={false}
                    sx={{
                        display: app003p01Page ? "block" : "none",
                        // py: 1,
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
                                Master Device
                            </Typography>
                        </Grid>

                        <Grid
                            container
                            size={12}
                            sx={{
                                mb: 2
                            }}
                        >

                        </Grid>

                        <Box >
                            <Grid container alignItems="center" size={12} sx={{ mb: 2, justifyContent: 'space-between' }}>
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
                                                        <Search size={18} />
                                                    </IconButton>
                                                ),
                                            }
                                        }}
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
                                        endIcon={<Plus size={18} />}
                                        sx={{
                                            textTransform: 'none',
                                            '&:hover': {
                                                bgcolor: '#61A05A'
                                            },
                                        }}
                                        onClick={handleModalAddOpen}
                                    >
                                        Add Device
                                    </Button>
                                </Grid>



                            </Grid>



                            <TableCustom
                                keyField="device_id"
                                loadingData={loadingData}
                                columns={app003DeviceColumns}
                                appdata={app003DeviceData}
                                appdataTotal={app003DeviceTotalData}
                                totalPage={app003TotalPage}
                                rowsPerPageOption={[5, 10, 20, 25]}

                                page={app003DeviceDataParam.page - 1}
                                rowsPerPage={app003DeviceDataParam.size}
                                sortField={app003DeviceDataParam.sort}
                                sortOrder={app003DeviceDataParam.order}


                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                onRequestSort={handleRequestSort}
                            />
                        </Box>

                    </Stack>
                </Container>

                {modalAddOpen && (
                    <DeviceAdd
                        modalAddOpen={modalAddOpen}
                        setModalAddOpen={setModalAddOpen}
                        refreshTable={refreshTable}
                        // Props for message
                        app003Msg={app003Msg}
                        setApp003setMsg={setApp003setMsg}
                        app003MsgStatus={app003MsgStatus}
                        setApp003setMsgStatus={setApp003setMsgStatus}
                    >
                    </DeviceAdd>
                )}

                {modalEditOpen && (
                    <DeviceEdit
                        modalEditOpen={modalEditOpen}
                        setModalEditOpen={setModalEditOpen}
                        refreshTable={refreshTable}

                        // Props for message and data
                        app003DeviceEditData={app003DeviceEditData}
                        app003Msg={app003Msg}
                        setApp003setMsg={setApp003setMsg}
                        app003MsgStatus={app003MsgStatus}
                        setApp003setMsgStatus={setApp003setMsgStatus}
                    />
                )}

                {modalDeleteOpen && (
                    <PopupDeleteAndRestore
                        status={"delete"}
                        modalOpen={modalDeleteOpen}
                        modalClose={() => setModalDeleteOpen(false)}
                        loading={loadingDelete}
                        onClick={app003HandleDeleteDevice}
                    />
                )}

            </RootPageCustom>
        </React.Fragment >
    );
}

export default MasterDevice;