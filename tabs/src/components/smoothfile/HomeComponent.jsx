import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import "../../assets/smoothfile/home.css";
import { TreeView } from "devextreme-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faRightLeft } from '@fortawesome/free-solid-svg-icons';
import { UserProvider } from "./context/UserContext";
import TestComponent from "./TestComponent";
import { BasicTable } from "./TableFile";
import { Link, useHistory } from "react-router-dom";


function HomeComponent() {
    const [listTree, setListTree] = useState([]);
    const [listFile, setListFile] = useState([]);
    const [styleMenu, setStyleMenu] = useState("menu-project");
    const [styleListFile, setStyleListFile] = useState("list-file");

    const history = useHistory();

    const listTest = [
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
        }
    ]

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
            if (res.status === 200) {
                loadListProject(res.data.data);
            }
        }).catch(error => console.log(error));
    }

    useEffect(() => {
        getListProject();
    }, [])

    const selectItem = (e) => {
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
            if (res.status === 200) {
                setListFile(res.data.data);
            } else if (res.status === 401) {
                history.push('/login');
            }
        }).catch(error => console.log(error));
    };

    function hideMenu() {
        if (styleMenu === "menu-project") {
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
            if (project.directoriesList.length > 0) {
                project.directoriesList.forEach((directory, key) => {
                    if (directory.parent_directory_id === "00000000") {
                        arrRootDir = directory;
                        arrRootDir.text = directory.directory_name;
                        arrRootDir.id = "1_" + (id + 1);
                        arrRootDir.items = setListChild(arrRootDir.id, directory.directory_id, project.directoriesList, project.project_id);
                    }
                });
                arr.push(arrRootDir);
            }
        })
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

    function returnTable() {
        if (listFile.length > 0) {
            return (
                <>
                    {
                        listFile.map((file, ind) => {
                            return (
                                <>
                                    <tr>
                                        <td style={{ textAlign: "left" }}>{file.file_name}</td>
                                        <td>{file.file_size}</td>
                                        <td>{formatDate(file.update_date)}</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </>
                            )
                        })
                    }
                </>
            )
        }
    }

    return (
        <>
            <h1>Home Component</h1>
            <Link to="/login" style={{ marginRight: "10px" }}> Back </Link>
            <Link to="/demo" style={{ marginRight: "10px" }}> Demo </Link>


            <div className="icon-menu-project">
                <FontAwesomeIcon icon={faBars} className="icon-style" onClick={hideMenu} />
                <FontAwesomeIcon icon={faCloudArrowUp} className="icon-style" />
                <FontAwesomeIcon icon={faRightLeft} className="icon-style" />
            </div>
            <div className="flex-box2">
                <div className={styleMenu}>
                    <div className="list-project">
                        {showListProject()}
                    </div>
                </div>

                <div className={styleListFile}>
                    {/* <table id="customers">
                        <tr>
                            <th>FileName</th>
                            <th>Size</th>
                            <th>Updated</th>
                            <th>Actions</th>
                            <th>Details</th>
                        </tr>

                        {returnTable()}

                    </table> */}
                    
                    <TestComponent listFile = {listFile} />
                </div>
            </div>
            <div>
                <UserProvider value={listTest} >
                    {/*có thể truyền nhiều biến và phương thức cập nhật của biến dó vd: <FoodContext.Provider value={{ name, location, setName, setLocation }}> */}
                    <BasicTable />
                </UserProvider>
            </div>
        </>
    )
}
export default HomeComponent;

