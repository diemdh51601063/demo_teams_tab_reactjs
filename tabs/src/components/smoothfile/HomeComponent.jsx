import axios from "axios";
import jwtDecode from "jwt-decode";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "../../assets/smoothfile/home.css";
import { TreeView } from "devextreme-react";
import { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faRightLeft } from '@fortawesome/free-solid-svg-icons';
import DataTable from "react-data-table-component";



// export const columns = [
//     {
//         name: "File Name",
//         selector: "file_name",
//         sortable: true
//     },
//     {
//         name: "Size",
//         selector: "file_size",
//         sortable: true
//     },
//     {
//         name: "Updated",
//         selector: "update_date",
//         sortable: true,
//         // cell: d => <span>{d.genres.join(", ")}</span>
//     },
//     {
//         name: "Actions",
//         selector: "update_user",
//         sortable: true
//     },
//     {
//         name: "Details",
//         selector: "comment",
//         sortable: true
//     }
// ];

function HomeComponent() {

    const [listProject, setListProject] = useState([]);
    const [listTree, setListTree] = useState([]);
    const [currentItem, setCurrentItem] = useState();
    const [listFile, setListFile] = useState([]);
    const [styleMenu, setStyleMenu] = useState("menu-project");
    const [styleListFile, setStyleListFile] = useState("list-file");

    const selectItem = (e) => {
        setCurrentItem(e.itemData);
        let token = localStorage.getItem("token");
        let loginInfo = jwtDecode(token);
        let userId = loginInfo.data.user_id;
        let directoryInfo = e.itemData;
        axios.get(`https://asean-dev.smoothfile.jp/smoothfile6/admin/api/file/list/02?user_id=${userId}&directory_id=${directoryInfo.directory_id}&project_id=${directoryInfo.project_id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            if (res.status == 200) {
                setListFile(res.data.data);
            }
        }).catch(error => console.log(error));
    };

    function getListProject() {
        let token = localStorage.getItem("token");
        let loginInfo = jwtDecode(token);
        let userId = loginInfo.data.user_id;
        axios.get(`https://asean-dev.smoothfile.jp/smoothfile6/admin/api/project/get-project-by-user/02?user_id=${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            if (res.status == 200) {
                setListProject(res.data.data);
                loadListProject(res.data.data);
            }
        }).catch(error => console.log(error));
    }
    useEffect(() => {
        getListProject();
    }, [])

    function hideMenu() {
        if (styleMenu == "menu-project") {
            setStyleMenu("menu-project-hide");
            setStyleListFile("list-file-full");
        } else {
            setStyleMenu("menu-project");
            setStyleListFile("list-file");
        }
    }

    function loadListProject(list) {
        let arr = [];
        list.forEach((project, id) => {
            let arrRootDir;
            let j = 0;
            if (project.directoriesList.length > 0) {
                project.directoriesList.forEach((directory, key) => {
                    if (directory.parent_directory_id === "00000000") {
                        arrRootDir = directory;
                        arrRootDir.text = directory.directory_name;
                        arrRootDir.id = "1_" + (id + 1);
                        arrRootDir.items = setListChild(arrRootDir.id, directory.directory_id, project.directoriesList, project.project_id);
                        j++;
                    }
                });
                arr.push(arrRootDir);
            }
        })
        setCurrentItem(arr[0]);
        setListTree(arr);
    }

    function setListChild(id, directoryID, list, projectID) {
        let tmpArr = [];
        let i = 0;
        list.forEach((item, key) => {
            if (item.parent_directory_id === directoryID && item.project_id === projectID) {
                tmpArr[i] = item;
                tmpArr[i].text = item.directory_name;
                tmpArr[i].id = id + "_" + (i + 1);
                tmpArr[i]["items"] = setListChild(tmpArr[i].id, item.directory_id, list, projectID);
                i++;
            }
        })
        return tmpArr;
    }

    function showListProject() {
        if (listTree.length > 0) {
            return (
                <>
                    <div className="form">
                        <TreeView id="simple-treeview"
                            items={listTree}
                            onItemClick={selectItem} />
                    </div>
                </>
            )
        }
    }

    function formatDate(string) {
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toLocaleDateString([], options);
    }

    // function renderTable() {
    //     let test = listFile;
    //     if (test.length > 0) {
    //         const tableData = {
    //             columns,
    //             test
    //         };
    //         setDataInTable(tableData);
    //         return (
    //             <div className="main">
    //                 <DataTableExtensions {...tableData}>
    //                     <DataTable
    //                         columns={columns}
    //                         data={test}
    //                         noHeader
    //                         defaultSortField="id"
    //                         defaultSortAsc={false}
    //                         pagination
    //                         highlightOnHover
    //                     />
    //                 </DataTableExtensions>
    //             </div>
    //         );
    //     }
    // }

    const columns33 = [
        {
            name: 'Title',
            selector: row => row.title,
        },
        {
            name: 'Year',
            selector: row => row.year,
        },
    ];

    return (
        <>
            <h1>Home Component</h1>
            <a href="/login">Back</a>
            <div className="icon-menu-project">
                <FontAwesomeIcon icon={faBars} className="icon-style" onClick={hideMenu} />
                <FontAwesomeIcon icon={faCloudArrowUp} className="icon-style" />
                <FontAwesomeIcon icon={faRightLeft} className="icon-style" />
            </div>
            {/* <MyComponent/> */}
            <div className="flex-box2">

                <div className={styleMenu}>
                    <div className="list-project">
                        {showListProject()}
                    </div>
                </div>
                <div className={styleListFile}>
                    <table id="customers">
                        <tr>
                            <th>FileName</th>
                            <th>Size</th>
                            <th>Updated</th>
                            <th>Actions</th>
                            <th>Details</th>
                        </tr>
                        {listFile.length > 0 ?
                            listFile.map((file, ind) => {
                                return (
                                    <>
                                        <tr>
                                            <td style={{ textAlign: "left" }}>{file.file_name}</td>
                                            <td>{file.file_size}</td>
                                            <td>{formatDate(file.update_date)}</td>
                                            <td>Germany</td>
                                            <td>Germany</td>
                                        </tr>
                                    </>
                                )
                            })

                            :
                            ""
                        }
                    </table>
                </div>
            </div>

        </>
    )
}
export default HomeComponent;