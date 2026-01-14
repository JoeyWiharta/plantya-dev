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
import { getCluster, deleteCluster } from "../../utils/ListApi";
import ClusterAdd from "./ClusterAdd";
import PopupDeleteAndRestore from "../../components/common/PopupDeleteAndRestore";
import { Trash2, SquarePen, Plus, Search, RotateCcw } from "lucide-react";
import ClusterEdit from "./ClusterEdit";

const MasterCluster = () => {
    // State First Page, Message, and Loading Effect
    const [firstRender, setFirstRender] = useState(false)
    const [app003p01Page, setApp003p01Page] = useState(true);

    const [app003Msg, setApp003setMsg] = useState("");
    const [app003MsgStatus, setApp003setMsgStatus] = useState("");
    const [loadingData, setLoadingData] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false)

    // State Data Cluster, Filtering, and Param
    const [search, setSearch] = useState("")
    const [app003ClusterData, setApp003ClusterData] = useState([]);
    const [app003ClusterTotalData, setApp003ClusterTotalData] = useState(0)
    const [app003TotalPage, app003SetTotalPage] = useState(0)
    const [app003ClusterDataParam, setApp003ClusterDataParam] = useState(
        {
            page: 1,
            size: 10,
            sort: "",
            order: "asc",
            search: "",
        }
    )


    // State Add, Edit, and Delete Cluster
    const [modalAddOpen, setModalAddOpen] = useState(false);
    const [modalEditOpen, setModalEditOpen] = useState(false);
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [app003ClusterEditData, setApp003ClusterEditData] = useState(null);
    const [app003ClusterDeleteData, setApp003ClusterDeleteData] = useState(null)

    // Table Configuration Active Cluster (Header Table, Handle Page and Rows, Handle Sort)
    const app003ClusterColumns = [
        {
            dataField: "cluster_id",
            text: "Cluster ID",
            sort: true,
            headerAlign: "center",
            bodyAlign: 'center',
            minWidth: '100px',
        },
        {
            dataField: "cluster_name",
            text: "Cluster Name",
            sort: true,
            headerAlign: "center",
            bodyAlign: 'center',
            minWidth: '100px',
        },
        {
            dataField: "totalDevice",
            text: "Total Device (Optional)",
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
            formatter: (cellContent, app003ClusterData) => (
                <>
                    <Stack direction="row" spacing={1} justifyContent="center">
                        <Tooltip title="Update Cluster" placement="top">
                            <IconButton
                                aria-label="edit"
                                size="small"
                                onClick={() => handleModalEditOpen(app003ClusterData)}
                                color="info"
                            >
                                <SquarePen size={18} />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete Cluster" placement="top">
                            <IconButton
                                aria-label="delete"
                                size="small"
                                onClick={() => handleModalDeleteOpen(app003ClusterData)}
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
        setApp003ClusterDataParam(prev => ({
            ...prev,
            page: newPage + 1
        }));
    };

    const handleChangeRowsPerPage = (newRowsPerPage) => {
        setApp003ClusterDataParam(prev => ({
            ...prev,
            size: newRowsPerPage,
            page: 1
        }));
    };

    const handleRequestSort = (property, order) => {
        setApp003ClusterDataParam(prev => ({
            ...prev,
            sort: property,
            order: order,
            page: 1
        }));
    };

    // Data From API Active Cluster
    const getAllCluster = useCallback(async (param) => {
        setLoadingData(true);
        try {
            const response = await getCluster(param);
            console.table(response.data.clusters)
            setApp003ClusterData(response?.data?.clusters ? response.data.clusters : []);
            setApp003ClusterTotalData(response?.data?.count_data ? response.data.count_data : 0);
            app003SetTotalPage(response?.data?.total_pages ? response.data?.total_pages : 0);


        } catch (error) {
            console.error("Gagal mengambil data:", error);

        } finally {
            setLoadingData(false);
        }
    });

    useEffect(() => {
        if (app003p01Page) {
            getAllCluster(app003ClusterDataParam);
        }
    }, [app003ClusterDataParam]);


    // Search and Filtering (Free Text)
    const handleSearchState = () => {
        setApp003ClusterDataParam(prev => ({
            ...prev,
            page: 1,
            search: search
        }))

    }

    // Refresh Table Function
    const refreshTable = useCallback(() => {
        setSearch("");
        setApp003ClusterDataParam({
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
        setApp003ClusterEditData(obj)
    }

    // Form Delete Modal
    const handleModalDeleteOpen = (obj) => {
        setApp003setMsg("")
        setModalDeleteOpen(true)
        setApp003ClusterDeleteData(obj)
    }
    const app003HandleDeleteCluster = () => {
        if (app003ClusterDeleteData.cluster_id) {

            deleteClusterAction(app003ClusterDeleteData)
        }
    }
    const deleteClusterAction = useCallback(async (param) => {
        try {
            setLoadingDelete(true)
            const response = await deleteCluster(param.cluster_id)

            if (response.status === 204 || response.status === 200) {
                setApp003setMsg("Cluster Has Been Successfully Deleted.")
                setApp003setMsgStatus("success")
            } else {
                setApp003setMsg("Failed to delete Cluster.")
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
                                Master Cluster
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
                                        Add Cluster
                                    </Button>
                                </Grid>



                            </Grid>



                            <TableCustom
                                keyField="cluster_id"
                                loadingData={loadingData}
                                columns={app003ClusterColumns}
                                appdata={app003ClusterData}
                                appdataTotal={app003ClusterTotalData}
                                totalPage={app003TotalPage}
                                rowsPerPageOption={[5, 10, 20, 25]}

                                page={app003ClusterDataParam.page - 1}
                                rowsPerPage={app003ClusterDataParam.size}
                                sortField={app003ClusterDataParam.sort}
                                sortOrder={app003ClusterDataParam.order}


                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                onRequestSort={handleRequestSort}
                            />
                        </Box>

                    </Stack>
                </Container>

                {modalAddOpen && (
                    <ClusterAdd
                        modalAddOpen={modalAddOpen}
                        setModalAddOpen={setModalAddOpen}
                        refreshTable={refreshTable}
                        // Props for message
                        app003Msg={app003Msg}
                        setApp003setMsg={setApp003setMsg}
                        app003MsgStatus={app003MsgStatus}
                        setApp003setMsgStatus={setApp003setMsgStatus}
                    >
                    </ClusterAdd>
                )}

                {modalEditOpen && (
                    <ClusterEdit
                        modalEditOpen={modalEditOpen}
                        setModalEditOpen={setModalEditOpen}
                        refreshTable={refreshTable}

                        // Props for message and data
                        app003ClusterEditData={app003ClusterEditData}
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
                        onClick={app003HandleDeleteCluster}
                    />
                )}

            </RootPageCustom>
        </React.Fragment >
    );
}

export default MasterCluster;