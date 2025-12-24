import React, { useState, useEffect, useMemo } from "react";
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
    Typography,
    Select,
    MenuItem,
} from "@mui/material";
import { Icon } from '@iconify/react';
import chevronLeft from '@iconify/icons-mdi/chevron-left';
import chevronRight from '@iconify/icons-mdi/chevron-right';
import sortUp from "@iconify/icons-fa/sort-up";
import sortDown from "@iconify/icons-fa/sort-down";
import sort from "@iconify/icons-fa/sort";
import { ChevronsLeft, ChevronsRight } from "lucide-react";


// Pindahkan StyledTableCell ke luar komponen agar tidak dibuat ulang setiap render
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

    // Gunakan useMemo untuk komponen yang sering berubah
    const renderPageNumbers = useMemo(() => {
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
                    minWidth: { xs: 32, sm: 32, md: 36 },
                    height: { xs: 32, sm: 32, md: 36 },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    bgcolor: pageNum === page + 1 ? 'primary.main' : 'background.paper',
                    color: pageNum === page + 1 ? 'primary.contrastText' : 'text.primary',
                    fontWeight: 500,
                    fontSize: { xs: '0.75rem', sm: '0.75rem', md: '0.875rem' },
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
    }, [page, totalPages]);

    // Optimasi render header columns dengan useMemo
    const headerColumns = useMemo(() => {
        return props.columns.map((column) => (
            <StyledTableCell
                key={column.dataField}
                align={column.align || 'left'}
                sx={{
                    borderBottom: 'none',
                    width: column.width || 'auto',
                    padding: { xs: '8px 12px', sm: '8px 12px', md: '8px 16px' },
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
                            sx={{
                                fontSize: { xs: '0.75rem', sm: '0.75rem', md: '0.875rem' },
                            }}
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
                                    <Icon icon={sortUp} width={10} />
                                ) : (
                                    <Icon icon={sortDown} width={10} />
                                )
                            ) : (
                                <Icon icon={sort} width={10} />
                            )}
                        </Box>
                    </Box>
                ) : (
                    <Typography
                        variant="body2"
                        component="span"
                        fontWeight="bold"
                        sx={{
                            fontSize: { xs: '0.75rem', sm: '0.75rem', md: '0.875rem' },
                        }}
                    >
                        {column.text}
                    </Typography>
                )}
            </StyledTableCell>
        ));
    }, [props.columns, sortField, sortOrder]);

    // Optimasi render body rows dengan useMemo
    const bodyRows = useMemo(() => {
        if (props.appdata.length === 0 && !props.loadingData) {
            return (
                <TableRow>
                    <StyledTableCell colSpan={props.columns.length} align="center">
                        <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.75rem', md: '0.875rem' } }}>
                            No records to display
                        </Typography>
                    </StyledTableCell>
                </TableRow>
            );
        }

        return props.appdata.map((row) => (
            <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={row[props.keyField]}
                sx={{
                    borderBottom: '1px solid',
                    borderColor: 'custom.line'
                }}
            >
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
                                padding: { xs: '8px 12px', sm: '8px 12px', md: '8px 16px' },
                            }}
                            size="small"
                        >
                            {column.formatter ? column.formatter(value, row) : value}
                        </StyledTableCell>
                    );
                })}
            </TableRow>
        ));
    }, [props.appdata, props.columns, props.keyField, props.loadingData]);

    return (
        <>
            <TableContainer
                sx={{
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'custom.line',
                    position: 'relative',
                    overflowX: 'auto',
                    mx: { xs: -2, sm: -2, md: 0 },
                }}
            >
                <Table
                    size="small"
                    aria-label="a dense table"
                    width="100%"
                    sx={{
                        border: 'none',
                        tableLayout: 'fixed',
                        minWidth: { xs: 600, sm: 600, md: 'auto' },
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
                            {headerColumns}
                        </TableRow>
                    </TableHead>

                    <TableBody
                        sx={{
                            bgcolor: 'background.paper'
                        }}
                    >
                        {bodyRows}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* FOOTER SECTION */}
            <Box sx={{
                display: "flex",
                flexDirection: { xs: 'column', sm: 'column', md: 'row' },
                alignItems: "center",
                justifyContent: { xs: 'center', sm: 'space-between', md: 'space-between' },
                mt: 2,
                px: 1,
                gap: { xs: 2, sm: 2, md: 1 },
            }}>
                {/* Showing entries info */}
                <Typography
                    variant="body2"
                    sx={{
                        order: { xs: 1, sm: 1, md: 1 },
                        fontSize: { xs: '0.75rem', sm: '0.75rem', md: '0.875rem' },
                        textAlign: { xs: 'center', sm: 'left', md: 'left' },
                        mb: { xs: 1, sm: 1, md: 0 },
                    }}
                >
                    Showing {from} to {to} of {props.appdataTotal} entries
                </Typography>

                {/* PAGINATION SECTION */}
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    order: { xs: 2, sm: 2, md: 2 },
                    flexWrap: { xs: 'wrap', sm: 'wrap', md: 'nowrap' },
                    justifyContent: { xs: 'center', sm: 'center', md: 'center' },
                    mb: { xs: 1, sm: 1, md: 0 },
                }}>
                    {/* First Page Button (<<) */}
                    <Box
                        component="button"
                        onClick={() => !isFirstPage && handleChangePage(null, 0)}
                        sx={{
                            border: "1px solid",
                            borderColor: 'custom.line',
                            borderRadius: 2,
                            minWidth: { xs: 28, sm: 28, md: 36 },
                            height: { xs: 28, sm: 28, md: 36 },
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
                        <ChevronsLeft size={18} />
                    </Box>

                    {/* Previous Page Button (<) */}
                    <Box
                        component="button"
                        onClick={() => !isFirstPage && handleChangePage(null, page - 1)}
                        sx={{
                            border: "1px solid",
                            borderColor: 'custom.line',
                            borderRadius: 2,
                            minWidth: { xs: 28, sm: 28, md: 36 },
                            height: { xs: 28, sm: 28, md: 36 },
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
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
                        {renderPageNumbers}
                    </Box>

                    {/* Next Page Button (>) */}
                    <Box
                        component="button"
                        onClick={() => !isLastPage && handleChangePage(null, page + 1)}
                        sx={{
                            border: "1px solid",
                            borderColor: 'custom.line',
                            borderRadius: 2,
                            minWidth: { xs: 28, sm: 28, md: 36 },
                            height: { xs: 28, sm: 28, md: 36 },
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
                            minWidth: { xs: 28, sm: 28, md: 36 },
                            height: { xs: 28, sm: 28, md: 36 },
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
                        <ChevronsRight size={18} />
                    </Box>
                </Box>

                {/* Show entries selector */}
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    order: { xs: 3, sm: 3, md: 3 },
                }}>
                    <Typography variant="body2" sx={{
                        fontSize: { xs: '0.75rem', sm: '0.75rem', md: '0.875rem' }
                    }}>
                        Show
                    </Typography>
                    <Select
                        size="small"
                        value={rowsPerPage}
                        onChange={handleChangeRowsPerPage}
                        sx={{
                            height: { xs: 28, sm: 28, md: 32 },
                            minWidth: { xs: 50, sm: 50, md: 60 },
                            fontSize: { xs: '0.75rem', sm: '0.75rem', md: '0.875rem' },
                            '& .MuiSelect-select': {
                                padding: { xs: '2px 8px', sm: '2px 8px', md: '4px 10px' },
                                minHeight: 'auto',
                            }
                        }}
                    >
                        {props.rowsPerPageOption.map((opt) => (
                            <MenuItem
                                key={opt}
                                value={opt}
                                sx={{ fontSize: { xs: '0.75rem', sm: '0.75rem', md: '0.875rem' } }}
                            >
                                {opt}
                            </MenuItem>
                        ))}
                    </Select>
                    <Typography variant="body2" sx={{
                        fontSize: { xs: '0.75rem', sm: '0.75rem', md: '0.875rem' }
                    }}>
                        entries
                    </Typography>
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