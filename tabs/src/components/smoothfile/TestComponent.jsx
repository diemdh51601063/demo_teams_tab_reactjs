
import React from "react";
import { Table } from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import Paper from "@material-ui/core/Paper";


function TestComponent() {

    const listFile = [
        {
            "file_id": "00000176",
            "directory_id": "00000001",
            "file_name": "00000988_p (1).jpg",
            "file_size": 330.7,
            "comment": "abc",
            "allow_download_flag": 1,
            "checkout_user": null,
            "update_user": "Administrator",
            "update_date": "2022/08/19 11:45:42",
            "download_times": 0,
            "other_download_times": 0
        },
        {
            "file_id": "00000178",
            "directory_id": "00000001",
            "file_name": "bg-3 (1).jpg",
            "file_size": 238.9,
            "comment": "abc",
            "allow_download_flag": 1,
            "checkout_user": null,
            "update_user": "Administrator",
            "update_date": "2022/08/19 11:45:42",
            "download_times": 0,
            "other_download_times": 0
        },
        {
            "file_id": "00000175",
            "directory_id": "00000001",
            "file_name": "00000000000000004956.eml",
            "file_size": 1.6,
            "comment": "abc",
            "allow_download_flag": 1,
            "checkout_user": null,
            "update_user": "Administrator",
            "update_date": "2022/08/19 11:45:42",
            "download_times": 0,
            "other_download_times": 0
        },
        {
            "file_id": "00000177",
            "directory_id": "00000001",
            "file_name": "84C16B9A-233C-4AF1-BF1A-58B422B6F4CF.jpeg",
            "file_size": 2242.3,
            "comment": "abc",
            "allow_download_flag": 1,
            "checkout_user": null,
            "update_user": "Administrator",
            "update_date": "2022/08/19 11:45:42",
            "download_times": 0,
            "other_download_times": 0
        },
        {
            "file_id": "00000174",
            "directory_id": "00000001",
            "file_name": "アプリ.txt",
            "file_size": 0.1,
            "comment": null,
            "allow_download_flag": 1,
            "checkout_user": null,
            "update_user": "Administrator",
            "update_date": "2022/07/26 13:18:30",
            "download_times": 0,
            "other_download_times": 0
        }
    ]


    return (
        <>
        <h1>kkkkkkk</h1>
            {/* <TableContainer component={Paper}> */}
                <Table aria-label="simple table" stickyHeader>
                    <TableHead>
                        <TableRow>
                            {/* <TableCell></TableCell> */}
                            <TableCell align="right">File Name</TableCell>
                            <TableCell align="right">Size</TableCell>
                            <TableCell align="right">Updated</TableCell>
                            <TableCell align="right">Actions</TableCell>
                            <TableCell align="right">Details</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listFile.map((row) => (
                            <TableRow key={row.id}>
                                {/* <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell> */}
                                <TableCell align="right">{row.file_name}</TableCell>
                                <TableCell align="right">{row.file_size}</TableCell>
                                <TableCell align="right">{row.update_date}</TableCell>
                                <TableCell align="right">...</TableCell>
                                <TableCell align="right">...</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            {/* </TableContainer> */}
        </>
    )
}
export default TestComponent;