import axios from "axios";
import jwtDecode from "jwt-decode";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "../../assets/smoothfile/home.css";
import { TreeView } from "devextreme-react";
import { useCallback } from "react";


function HomeComponent() {

    const [listProject, setListProject] = useState([]);
    const [displaySubMenu, setDisplaySubMenu] = useState('sub-menu hide-menu');
    const [listTree, setListTree] = useState([]);
    const [currentItem, setCurrentItem] = useState();
    const [listFile, setListFile] = useState([]);

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
                console.log(res.data.data);
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
                loadListProjectTest(res.data.data);
            }
        }).catch(error => console.log(error));
    }
    useEffect(() => {
        getListProject();
    }, [])

    function loadListProjectTest(list) {
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
        console.log(listTree);
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

    return (
        <>
            <h1>Home Component</h1>
            <a href="/login">Back</a>
            <div className="flex-box2">
                <div className="menu-directory">
                    {showListProject()}
                </div>
                <div className="list-file">
                    {listFile.length > 0 ?
                        listFile.map((file, ind) => {
                            return (
                                <>
                                    <div>{file.file_name}</div>
                                </>
                            )
                        })
                        :
                        ""
                    }
                </div>
            </div>

        </>
    )
}
export default HomeComponent;