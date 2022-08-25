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
import { faFilePdf } from '@fortawesome/fontawesome-free-regular';
import { faFileWord } from '@fortawesome/fontawesome-free-regular';
import { faFileExcel } from '@fortawesome/fontawesome-free-regular';
import { faFile } from '@fortawesome/fontawesome-free-regular';
import { faFileZipper } from '@fortawesome/free-solid-svg-icons';
import { faFilePowerpoint } from '@fortawesome/fontawesome-free-regular';
import { faRectangleList } from '@fortawesome/free-solid-svg-icons';
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


export default function TableComponent(props) {
    const rows = props.listFile.sort((a, b) => (a.file_size < b.file_size ? -1 : 1));
    const classes = useStyles2();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    // const [typeDisplay, setTypeDisplay] = useState('list');

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    function returnIcon(fileName) {
        var fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length);
        switch (fileExtension) {
            case 'pdf':
                return <FontAwesomeIcon className="style-icon-pdf" icon={faFilePdf} />
            case 'doc':
                return <FontAwesomeIcon className="style-icon-word" icon={faFileWord} />
            case 'png':
            case 'jpg':
                return <FontAwesomeIcon className="style-icon-image" icon={faFileImage} />
            case 'csv':
            case 'xlsx':
            case 'xls':
                return <FontAwesomeIcon className="style-icon-excel" icon={faFileExcel} />
            case 'pptx':
                return <FontAwesomeIcon className="style-icon-pptx" icon={faFilePowerpoint} />
            case 'zip':
                return <FontAwesomeIcon className="style-icon-zip" icon={faFileZipper} />
            default:
                return <FontAwesomeIcon className="style-icon-file" icon={faFile} />
        }
    }

    function formatDate(string) {
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toLocaleDateString([], options);
    }

    function showTableBody() {
        if (props.typeDisplay === 'list') {
            return (
                <>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left"><strong>File Name</strong></TableCell>
                            <TableCell align="right"><strong>Size</strong></TableCell>
                            <TableCell align="right"><strong>Updated</strong></TableCell>
                            <TableCell align="center"><strong>Actions</strong></TableCell>
                            <TableCell align="center"><strong>Details</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                        ).map((row, key) => (
                            <TableRow key={key}>
                                <TableCell align="left">
                                    {returnIcon(row.file_name)}
                                    <span className='text-item-table-list'>{row.file_name}</span>
                                </TableCell>
                                <TableCell align="right">{row.file_size}</TableCell>
                                <TableCell align="right">{formatDate(row.update_date)} <br /> by {row.update_user}</TableCell>
                                <TableCell align="center">...</TableCell>
                                <TableCell align="center"> <FontAwesomeIcon icon={faRectangleList} className="icon-footer" /></TableCell>
                            </TableRow>
                        ))}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }} />
                        )}
                    </TableBody>
                </>
            )
        } else {
            return (
                <>
                    <TableBody>
                        <Grid container spacing={2}>
                            {(rowsPerPage > 0
                                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : rows
                            ).map((row) => (
                                <Grid item xs={12} sm={6} md={3}>
                                    <Paper className={classes}>
                                        <div className='item-grid'>
                                            <div className='icon-in-grid'>
                                                {returnIcon(row.file_name)}
                                            </div>
                                            <p className='text-hidden'><strong>{row.file_name}</strong></p>
                                            <span>{formatDate(row.update_date)} by {row.update_user}</span>
                                            <div className='footer-item-grid'>
                                                <span>{row.file_size}</span>
                                                {/* <span> */}
                                                <FontAwesomeIcon icon={faRectangleList} className="icon-footer" />
                                                {/* </span> */}
                                            </div>
                                        </div>
                                    </Paper>
                                </Grid>
                            ))}

                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }} />
                            )}
                        </Grid>
                    </TableBody>
                </>
            )
        }
    }

    return (
        <>
            <TableContainer>
                <Table className={classes.table} aria-label="custom pagination table">

                    {showTableBody()}

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