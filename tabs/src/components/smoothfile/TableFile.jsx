// import { DataGrid } from "devextreme-react";
import React from "react";
import { useEffect } from "react";
import MaterialTable from "@material-table/core";


function TableFile(props) {
   // console.log(props.listFile);
    //const listFile = props.listFile;

    const columns = [
        { title: "File Name", field: "file_name" },
        { title: "Size", field: "file_size" },
        { title: "Updated", field: "update_date" },
        { title: "File Name", field: "file_name" },
        { title: "File Name", field: "file_name" },
    ]

    return (
        <>
            {/* <DataGrid
                rows={listFile}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            /> */}
            <MaterialTable columns={columns} data={[]} />
        </>
    )
}

export default TableFile;