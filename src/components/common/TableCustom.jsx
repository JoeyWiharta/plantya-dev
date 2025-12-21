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
    Box,
    CircularProgress,
    Typography,
    Pagination,
    PaginationItem,
    Select,
    MenuItem,
} from "@mui/material";
import { Icon } from '@iconify/react';
import chevronDoubleLeft from '@iconify/icons-mdi/chevron-double-left';
import chevronDoubleRight from '@iconify/icons-mdi/chevron-double-right';
import chevronLeft from '@iconify/icons-mdi/chevron-left';
import chevronRight from '@iconify/icons-mdi/chevron-right';
import sortUp from "@iconify/icons-fa/sort-up";
import sortDown from "@iconify/icons-fa/sort-down";
import sort from "@iconify/icons-fa/sort";

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

    const totalPages = props.totalPage || 1;
    const isFirstPage = page === 0;
    const isLastPage = page + 1 >= totalPages;

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.background.tableHead,
            borderBottom: `1px solid ${theme.palette.custom.line}`,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            padding: '8px 16px',
        },
        [`&.${tableCellClasses.body}`]: {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            padding: '8px 16px',
        },
    }));

    // Fungsi untuk menampilkan nomor halaman
    const renderPageNumbers = () => {
        const maxVisiblePages = 3;
        let startPage, endPage;

        if (totalPages <= maxVisiblePages) {
            startPage = 1;
            endPage = totalPages;
        } else {
            const maxPagesBeforeCurrent = Math.floor(maxVisiblePages / 2);
            const maxPagesAfterCurrent = Math.ceil(maxVisiblePages / 2) - 1;

            if (page + 1 <= maxPagesBeforeCurrent) {
                startPage = 1;
                endPage = maxVisiblePages;
            } else if (page + 1 + maxPagesAfterCurrent >= totalPages) {
                startPage = totalPages - maxVisiblePages + 1;
                endPage = totalPages;
            } else {
                startPage = page + 1 - maxPagesBeforeCurrent;
                endPage = page + 1 + maxPagesAfterCurrent;
            }
        }

        const pages = Array.from(
            { length: endPage - startPage + 1 },
            (_, i) => startPage + i
        );

        return pages.map((pageNum) => (
            <Box
                key={pageNum}
                component="button"
                onClick={() => handleChangePage(null, pageNum - 1)}
                sx={{
                    border: "1px solid",
                    borderColor: pageNum === page + 1 ? 'primary.main' : 'custom.line',
                    borderRadius: 2,
                    minWidth: 36,
                    height: 36,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    bgcolor: pageNum === page + 1 ? 'primary.main' : 'background.paper',
                    color: pageNum === page + 1 ? 'primary.contrastText' : 'text.primary',
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        bgcolor: pageNum === page + 1 ? 'primary.dark' : 'action.hover',
                        borderColor: pageNum === page + 1 ? 'primary.dark' : 'text.secondary',
                    }
                }}
            >
                {pageNum}
            </Box>
        ));
    };

    return (
        <>
            <TableContainer
                sx={{
                    borderRadius: 2,
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
                            borderBottom: '1px solid',
                            borderBottomColor: 'custom.line',
                            position: 'sticky',
                            top: 0,
                            zIndex: 1,
                        }}
                    >
                        <TableRow>
                            {props.columns.map((column) => (
                                <StyledTableCell
                                    key={column.dataField}
                                    align={column.align || 'left'}
                                    sx={{
                                        borderBottom: 'none',
                                        width: column.width || 'auto',
                                    }}
                                >
                                    {column.sort ? (
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: column.align === 'center' ? 'center' :
                                                    column.align === 'right' ? 'flex-end' : 'flex-start',
                                                gap: 0.5,
                                                cursor: 'pointer',
                                                userSelect: 'none',
                                                '&:hover': {
                                                    color: 'primary.main',
                                                    '& .sort-icon': {
                                                        color: 'primary.main',
                                                    }
                                                }

                                            }}
                                            onClick={() => handleRequestSort(null, column.dataField)}
                                        >
                                            <Typography
                                                variant="body2"
                                                component="span"
                                                fontWeight="bold"
                                            >
                                                {column.text}
                                            </Typography>

                                            {/* Icon Sort Section */}
                                            <Box sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                ml: 0.5,
                                                flexShrink: 0,
                                            }}>
                                                {sortField === column.dataField ? (
                                                    sortOrder === 'asc' ? (
                                                        <Icon icon={sortUp} />
                                                    ) : (
                                                        <Icon icon={sortDown} />
                                                    )
                                                ) : (
                                                    <Icon icon={sort} />
                                                )}
                                            </Box>
                                        </Box>
                                    ) : (
                                        <Typography
                                            variant="body2"
                                            component="span"
                                            fontWeight="bold"
                                        >
                                            {column.text}
                                        </Typography>
                                    )}
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
                                            sx={{
                                                borderBottom: 'none',
                                                borderTop: 'none',
                                                width: column.width || 'auto',
                                            }}
                                            size="small"
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
                display: "flex",
                flexDirection: { xs: 'column', lg: 'row' },
                alignItems: "center",
                justifyContent: "space-between",
                mt: 2,
                px: 1,
                gap: { xs: 2, lg: 1 },
            }}>
                <Typography variant="body2" sx={{ order: { xs: 1, lg: 1 } }}>
                    Showing {from} to {to} of {props.appdataTotal} entries
                </Typography>

                {/* PAGINATION SECTION */}
                <Box sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: 1,
                    order: { xs: 2, lg: 2 },
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }}>
                    {/* First Page Button (<<) */}
                    <Box
                        component="button"
                        onClick={() => !isFirstPage && handleChangePage(null, 0)}
                        sx={{
                            border: "1px solid",
                            borderColor: 'custom.line',
                            borderRadius: 2,
                            minWidth: 36,
                            height: 36,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: isFirstPage ? 'default' : 'pointer',
                            bgcolor: 'background.paper',
                            color: 'text.primary',
                            transition: 'all 0.2s ease',
                            '&:hover': !isFirstPage && {
                                bgcolor: 'action.hover',
                                borderColor: 'primary.main',
                                color: 'primary.main',
                            },
                        }}
                    >
                        <Icon icon={chevronDoubleLeft} width={20} height={20} />
                    </Box>

                    {/* Previous Page Button (<) */}
                    <Box
                        component="button"
                        onClick={() => !isFirstPage && handleChangePage(null, page - 1)}
                        sx={{
                            border: "1px solid",
                            borderColor: 'custom.line',
                            borderRadius: 2,
                            minWidth: 36,
                            height: 36,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: isFirstPage ? 'default' : 'pointer',
                            bgcolor: 'background.paper',
                            color: 'text.primary',
                            transition: 'all 0.2s ease',
                            '&:hover': !isFirstPage && {
                                bgcolor: 'action.hover',
                                borderColor: 'primary.main',
                                color: 'primary.main',
                            },
                        }}
                    >
                        <Icon icon={chevronLeft} width={20} height={20} />
                    </Box>

                    {/* Page Numbers */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        {renderPageNumbers()}
                    </Box>

                    {/* Next Page Button (>) */}
                    <Box
                        component="button"
                        onClick={() => !isLastPage && handleChangePage(null, page + 1)}
                        sx={{
                            border: "1px solid",
                            borderColor: 'custom.line',
                            borderRadius: 2,
                            minWidth: 36,
                            height: 36,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: isLastPage ? 'default' : 'pointer',
                            bgcolor: 'background.paper',
                            color: 'text.primary',
                            transition: 'all 0.2s ease',
                            '&:hover': !isLastPage && {
                                bgcolor: 'action.hover',
                                borderColor: 'primary.main',
                                color: 'primary.main',
                            },
                        }}
                    >
                        <Icon icon={chevronRight} width={20} height={20} />
                    </Box>

                    {/* Last Page Button (>>) */}
                    <Box
                        component="button"
                        onClick={() => !isLastPage && handleChangePage(null, totalPages - 1)}
                        sx={{
                            border: "1px solid",
                            borderColor: 'custom.line',
                            borderRadius: 2,
                            minWidth: 36,
                            height: 36,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: isLastPage ? 'default' : 'pointer',
                            bgcolor: 'background.paper',
                            color: 'text.primary',
                            transition: 'all 0.2s ease',
                            '&:hover': !isLastPage && {
                                bgcolor: 'action.hover',
                                borderColor: 'primary.main',
                                color: 'primary.main',
                            },
                        }}
                    >
                        <Icon icon={chevronDoubleRight} width={20} height={20} />
                    </Box>
                </Box>

                {/* Show entries selector */}
                <Box sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: 1,
                    order: { xs: 3, lg: 3 },
                }}>
                    <Typography variant="body2">Show</Typography>
                    <Select
                        size="small"
                        value={rowsPerPage}
                        onChange={handleChangeRowsPerPage}
                        sx={{
                            height: 32,
                            minWidth: 60,
                            fontSize: 14,
                            '& .MuiSelect-select': {
                                padding: '4px 10px',
                                minHeight: 'auto',
                            }
                        }}
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