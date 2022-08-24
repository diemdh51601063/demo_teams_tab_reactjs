import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { TableHead } from '@material-ui/core';
import "../../assets/smoothfile/table_grid.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage } from '@fortawesome/fontawesome-free-regular';

import { Grid } from '@material-ui/core';


const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page" >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page" >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page" >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
    table: {
        minWidth: 500,
    },
});


//grid view
function GridItem({ classes }) {
    return (
        // From 0 to 600px wide (smart-phones), I take up 12 columns, or the whole device width!
        // From 600-690px wide (tablets), I take up 6 out of 12 columns, so 2 columns fit the screen.
        // From 960px wide and above, I take up 25% of the device (3/12), so 4 columns fit the screen.
        <Grid item xs={12} sm={6} md={3}>
            <Paper className={classes.paper}>item</Paper>
        </Grid>
    );
}


export default function TestComponent(props) {
    const rows = props.listFile.sort((a, b) => (a.file_size < b.file_size ? -1 : 1));
    const classes = useStyles2();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="custom pagination table">
                    {/* <TableHead>
                        <TableRow>
                            <TableCell align="right">File Name</TableCell>
                            <TableCell align="right">Size</TableCell>
                            <TableCell align="right">Updated</TableCell>
                            <TableCell align="right">Actions</TableCell>
                            <TableCell align="right">Details</TableCell>
                        </TableRow>
                    </TableHead> */}
                    <TableBody>
                        <Grid container spacing={2}>
                            {(rowsPerPage > 0
                                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : rows
                            ).map((row) => (
                                // <TableRow key={row.name}>
                                //     <TableCell align="right">{row.file_name}</TableCell>
                                //     <TableCell align="right">{row.file_size}</TableCell>
                                //     <TableCell align="right">{row.update_date}</TableCell>
                                //     <TableCell align="right">...</TableCell>
                                //     <TableCell align="right">...</TableCell>
                                // </TableRow>
                                // <GridItem classes={classes} />
                                <Grid item xs={12} sm={6} md={3}>
                                    <Paper className={classes}>
                                        <div>
                                            <FontAwesomeIcon className="style-icon-file" icon={faFileImage} />
                                        </div>
                                        <h2>{row.file_name}</h2>
                                    </Paper>
                                </Grid>
                            ))}

                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </Grid>
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[1, 5, 10, 25, { label: 'All', value: rows.length }]}
                                colSpan={5}
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                labelRowsPerPage=''
                                page={page}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page' },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>

        </>
    );
}