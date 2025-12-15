// src/components/common/TableCustom.jsx

import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import PropTypes from "prop-types";
import { tableCellClasses } from '@mui/material/TableCell';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Box,
    CircularProgress,
    Typography,
    Pagination,
    PaginationItem,
    Select,
    MenuItem,
} from "@mui/material";
import { Icon } from '@iconify/react';



const TableCustom = (props) => {

    const [page, setPage] = useState(props.page || 0)
    const [rowsPerPage, setRowsPerPage] = useState(props.rowsPerPage || 10)
    const [sortField, setSortField] = useState(props.sortField || '');
    const [sortOrder, setSortOrder] = useState(props.sortOrder || 'asc');

    useEffect(() => {
        setPage(props.page || 0)
    }, [props.page])

    useEffect(() => {
        setRowsPerPage(props.rowsPerPage || 10)
    }, [props.rowsPerPage])

    useEffect(() => {
        setSortField(props.sortField || '');
        setSortOrder(props.sortOrder || 'asc');
    }, [props.sortField, props.sortOrder])

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
        if (props.onPageChange) {
            props.onPageChange(newPage)
        }
    }

    const handleChangeRowsPerPage = (event) => {
        const newRowsPerPage = parseInt(event.target.value, 10)
        setRowsPerPage(newRowsPerPage)
        if (props.onRowsPerPageChange) {
            props.onRowsPerPageChange(newRowsPerPage)
        }
    }

    const handleRequestSort = (event, property) => {
        const isAsc = sortField === property && sortOrder === 'asc';
        const newSortOrder = isAsc ? 'desc' : 'asc';
        setSortField(property);
        setSortOrder(newSortOrder);
        if (props.onRequestSort) {
            props.onRequestSort(property, newSortOrder);
        }
    };

    const calculateRange = () => {
        const from = props.appdataTotal === 0 ? 0 : (page * rowsPerPage) + 1;
        const to = Math.min((page * rowsPerPage) + rowsPerPage, props.appdataTotal);
        return { from, to };
    };

    const { from, to } = calculateRange();




    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            color: theme.palette.text.primary,
            backgroundColor: '#807d7dff',
            borderBottom: `1px solid ${theme.palette.custom.line}`,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    return (
        <>
            <TableContainer sx={{ borderRadius: 3, overflow: 'hidden', border: '1px solid', position: 'relative' }}>
                {props.loadingData && (
                    <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)', zIndex: 1 }}>
                        <CircularProgress />
                    </Box>
                )}
                <Table sx={{ tableLayout: 'auto', borderLeft: '1px solid', borderRight: '1px solid', borderColor: 'custom.line' }}>
                    <TableHead>
                        <TableRow>
                            {props.columns.map((column) => (
                                <StyledTableCell
                                    key={column.dataField}
                                    align={column.align || 'left'}
                                    style={{ ...column.headerStyle }}
                                    sortDirection={sortField === column.dataField ? sortOrder : false}
                                >
                                    {column.sort ? (
                                        <TableSortLabel
                                            active={sortField === column.dataField}
                                            direction={sortField === column.dataField ? sortOrder : 'asc'}
                                            onClick={() => handleRequestSort(null, column.dataField)}
                                        >
                                            {column.text}
                                        </TableSortLabel>
                                    ) : (column.text)}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.appdata.map((row) => (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row[props.keyField]} sx={{ borderBottom: '1px solid', borderColor: 'custom.line' }}>
                                {props.columns.map((column) => {
                                    const value = row[column.dataField];
                                    return (
                                        <TableCell key={column.dataField} align={column.align || 'left'} sx={{ borderBottom: 'none' }}>
                                            {column.formatter ? column.formatter(value, row) : value}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                        {props.appdata.length === 0 && !props.loadingData && (
                            <TableRow>
                                <TableCell colSpan={props.columns.length} align="center">
                                    <Typography variant="body2">No records to display</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 2 }}>
                <Typography variant="body2">
                    Showing {from} to {to} of {props.appdataTotal} entries
                </Typography>

                <Pagination
                    count={props.totalPage}
                    page={page + 1}
                    onChange={(e, value) => handleChangePage(e, value - 1)}
                    showFirstButton
                    showLastButton
                    shape="rounded"
                    renderItem={(item) => (
                        <PaginationItem
                            {...item}
                            slots={{
                                first: () => <Icon icon="mdi:chevron-double-left" width={20} height={20} />,
                                previous: () => <Icon icon="mdi:chevron-left" width={20} height={20} />,
                                next: () => <Icon icon="mdi:chevron-right" width={20} height={20} />,
                                last: () => <Icon icon="mdi:chevron-double-right" width={20} height={20} />,
                            }}
                        />
                    )}
                    sx={{
                        "& .MuiPaginationItem-root": {
                            borderRadius: 2,
                            border: "1px solid",
                            borderColor: "divider",
                            minWidth: 36,
                            height: 36,
                            fontWeight: 500,
                        },
                        "& .MuiPaginationItem-icon": {
                            fontSize: 24,
                        },
                        "& .Mui-selected": {
                            bgcolor: "primary.main",
                            color: "primary.contrastText",
                            borderColor: "primary.main",
                            "&:hover": {
                                bgcolor: "primary.dark",
                            },
                        },
                    }}
                />

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="body2">Show</Typography>
                    <Select
                        size="small"
                        value={rowsPerPage}
                        onChange={handleChangeRowsPerPage}
                        sx={{ height: 32, minWidth: 30, fontSize: 14, '& .MuiSelect-select': { padding: '4px 10px' } }}
                    >
                        {props.rowsPerPageOption.map((opt) => (
                            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                        ))}
                    </Select>
                    <Typography variant="body2">entries</Typography>
                </Box>
            </Box>
        </>
    );
};

TableCustom.propTypes = {
    loadingData: PropTypes.bool.isRequired,

    keyField: PropTypes.string.isRequired,
    columns: PropTypes.array.isRequired,
    appdata: PropTypes.array.isRequired,
    appdataTotal: PropTypes.number.isRequired,

    page: PropTypes.number,
    totalPage: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number,
    rowsPerPageOption: PropTypes.array,

    onPageChange: PropTypes.func,
    onRowsPerPageChange: PropTypes.func,
    sortField: PropTypes.string,
    sortOrder: PropTypes.string,
    onRequestSort: PropTypes.func,
};

export default TableCustom;