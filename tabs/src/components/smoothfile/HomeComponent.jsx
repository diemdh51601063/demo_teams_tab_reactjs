import axios from "axios";
import jwtDecode from "jwt-decode";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

function HomeComponent() {

    const [listDirectory, setListDirectory] = useState([]);

    function getListDirectory() {
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
                setListDirectory(res.data.data);
            }
        }).catch(error => console.log(error));
    }
    useEffect(() => {
        getListDirectory();
    }, [])


    function showListProject() {
        return (
            <>
                <ul>
                    {
                        listDirectory.map((project, index) => {
                            return (
                                <>
                                    <li key={"project_" + index} >{project.project_name}</li>
                                    <ul>
                                        {showListChildDirectory(project.project_id, project.directoriesList)}
                                    </ul>
                                </>
                            )
                        })
                    }

                </ul>
            </>
        )
    }


    function showListChildDirectory(projectID, directoriesList) {
        let arrRootDir = [];
        let arrayParent = [];

        if (directoriesList.length > 0) {
            directoriesList.forEach((child, key) => {
                if (child.parent_directory_id === "00000000") {
                    arrRootDir.push(child);
                }
                if (child.parent_directory_id !== "00000000" && child.project_id === projectID) {
                    if (child.parent_directory_id === "00000001") {
                        arrayParent[key] = child;
                        arrayParent[key]["child"] = setListChild(child.directory_id, directoriesList, projectID);
                    }
                }
            });
        }
        console.log(arrayParent);
    }

    function setListChild(directoryID, list, projectID) {
        let tmpArr = [];
        list.forEach((item, key) => {
            if (item.parent_directory_id === directoryID && item.project_id === projectID) {
                tmpArr[key] = item;
                tmpArr[key]["tmp_child"] = setListChild(item.directory_id, list, projectID);
            }
        })
        return tmpArr;
    }

    function showList(arrayInput) {
        
    }

    return (
        <>
            <h1>Home Component</h1>
            <a href="/login">Back</a>
            <div className="menu-directory">
                {showListProject()}
            </div>
        </>
    )
}
export default HomeComponent;