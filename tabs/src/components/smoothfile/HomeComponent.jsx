import axios from "axios";
import jwtDecode from "jwt-decode";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "../../assets/smoothfile/home.css";
import { Tree } from '@fluentui/react-northstar'
import { TriangleDownIcon, TriangleEndIcon } from '@fluentui/react-icons-northstar'
import { TreeView } from "devextreme-react";


function HomeComponent() {

    const [listDirectory, setListDirectory] = useState([]);
    const [displaySubMenu, setDisplaySubMenu] = useState('sub-menu hide-menu');

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
                                    <li key={"project_" + index} className="sub-menu" >{project.project_name}
                                        {showListChildDirectory(project.project_id, project.directoriesList)}
                                    </li>
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
        let i = 0;

        if (directoriesList.length > 0) {
            directoriesList.forEach((child, key) => {
                if (child.parent_directory_id === "00000000") {
                    arrRootDir.push(child);
                }
                if (child.parent_directory_id !== "00000000" && child.project_id === projectID) {
                    if (child.parent_directory_id === "00000001") {
                        arrayParent[i] = child;
                        arrayParent[i]["child"] = setListChild(child.directory_id, directoriesList, projectID);
                        i++;
                    }
                }
            });
        }
        if (arrayParent.length > 0) {
            return showList(arrayParent);
        }
    }

    function setListChild(directoryID, list, projectID) {
        let tmpArr = [];
        let i = 0;
        list.forEach((item, key) => {
            if (item.parent_directory_id === directoryID && item.project_id === projectID) {
                tmpArr[i] = item;
                tmpArr[i]["child"] = setListChild(item.directory_id, list, projectID);
                i++;
            }
        })
        return tmpArr;
    }

    function showList(arrayParent) {
        if (arrayParent.length > 0) {
            // return (
            //     <ul>
            //         {arrayParent.map((item, key) => {
            //             return (
            //                 <>
            //                     <li style={{ paddingLeft: '20px' }} key={'item_' + key} className={displaySubMenu} onClick={showSubMenu} > {item.directory_name}
            //                         {item.child.length > 0 ? (showList(item.child)) : ""}
            //                     </li>
            //                 </>
            //             )
            //         })}
            //     </ul>
            // )
            let currentItem = arrayParent[0];
            return (
                <div className="form">
                    <TreeView id="simple-treeview"
                        items={arrayParent}
                        width={300}
                        onItemClick={arrayParent[0]} />
                    {currentItem.price
                        && <div id="product-details">
                            {/* <img src={currentItem.image} /> */}
                            <div className="name">{currentItem.text}</div>
                            <div className="price">{`$${currentItem.price}`}</div>
                        </div>
                    }
                </div>
            );
        }
    }

    // function showSubMenu(e) {
    //     if (displaySubMenu === "sub-menu") {
    //         setDisplaySubMenu("sub-menu hide-menu")
    //     } else {
    //         setDisplaySubMenu("sub-menu");
    //     }
    // }

    return (
        <>
            <h1>Home Component</h1>
            <a href="/login">Back</a>
            <div className="flex-box2">
                <div className="menu-directory">
                    {showListProject()}
                </div>
                <div className="list-file">
                    <h1>jjjkjkkj</h1>
                </div>
            </div>

        </>
    )
}
export default HomeComponent;