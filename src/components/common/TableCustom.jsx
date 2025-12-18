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
            backgroundColor: theme.palette.background.tableHead,
            borderBottom: `1px solid ${theme.palette.custom.line}`,
            whiteSpace: 'nowrap',
        },
        [`&.${tableCellClasses.body}`]: {
            whiteSpace: 'nowrap',
        },
    }));

    return (
        <>
            <TableContainer
                sx={{
                    borderRadius: 2,
                    overflowX: 'auto',
                    border: '1px solid',
                    borderColor: 'custom.line',
                    position: 'relative',
                    overflowX: 'auto',

                }}
            >

                <Table
                    size="small"
                    aria-label="a dense table"
                    width="100%"
                    sx={{
                        border: 'none',
                        tableLayout: 'fixed',
                    }}
                >
                    <TableHead
                        sx={{
                            bgcolor: 'background.tableHead',
                            border: '1px solid',
                            borderColor: 'custom.line',
                            borderBottom: '1px solid',
                            borderBottomColor: 'custom.line',
                            position: 'sticky',
                            top: 0,
                            zIndex: 1,
                        }}
                    >
                        <TableRow
                            sx={{
                                border: '1px solid',
                                borderColor: 'custom.line',
                                borderBottom: 'none'

                            }}
                        >
                            {props.columns.map((column) => (
                                <StyledTableCell
                                    key={column.dataField}
                                    align={column.align || 'left'}
                                    style={{ ...column.headerStyle }}
                                    sortDirection={sortField === column.dataField ? sortOrder : false}
                                    size="medium"
                                    sx={{
                                        borderBottom: 'none'
                                    }}
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

                    <TableBody
                        sx={{
                            bgcolor: 'background.paper'
                        }}
                    >
                        {props.appdata.map((row) => (
                            <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={row[props.keyField]}
                                sx={{
                                    borderBottom: '1px solid',
                                    borderColor: 'custom.line'
                                }}>

                                {props.columns.map((column) => {
                                    const value = row[column.dataField];
                                    return (
                                        <StyledTableCell
                                            key={column.dataField}
                                            align={column.align || 'left'}
                                            sx={{ borderBottom: 'none', borderTop: 'none' }}
                                            size="small"
                                            padding="normal"
                                        >
                                            {column.formatter ? column.formatter(value, row) : value}
                                        </StyledTableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                        {props.appdata.length === 0 && !props.loadingData && (
                            <TableRow>
                                <StyledTableCell colSpan={props.columns.length} align="center">
                                    <Typography variant="body2">No records to display</Typography>
                                </StyledTableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>


            <Box sx={{
                display: "flex", alignItems: "center", justifyContent: "space-between", mt: 2, px: 1, visibility: props.loadingData ? 'hidden' : 'visible'
            }}>
                <Typography variant="body2">
                    Showing {from} to {to} of {props.appdataTotal} entries
                </Typography>

                <Pagination
                    count={props.totalPage ? props.totalPage : 1}
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
                            borderColor: 'custom.line',
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
                            borderColor: 'custom.line',
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