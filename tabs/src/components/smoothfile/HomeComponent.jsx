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
import { faGrip } from "@fortawesome/free-solid-svg-icons";
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { UserProvider } from "./context/UserContext";
import { BasicTable } from "./TableFile";
import TableComponent from "./TableComponent";
import { Link, useHistory } from "react-router-dom";


function HomeComponent() {
    const history = useHistory();
    const [listTree, setListTree] = useState([]);
    const [listFile, setListFile] = useState([]);
    const [styleMenu, setStyleMenu] = useState("menu-project");
    const [styleListFile, setStyleListFile] = useState("list-file");
    const [typeDisplay, setTypeDisplay] = useState('list');
    const [listSearchResult, setListSearchResult] = useState([]);
    const [displayListResult, setDisplayListResult] = useState('display-result-search-none');
    const [isLoading, setIsLoading] = useState(false);

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

                let projectInit = res.data.data[0];

                axios.get(`https://asean-dev.smoothfile.jp/smoothfile6/admin/api/file/list/02?user_id=${userId}&directory_id=00000001&project_id=${projectInit.project_id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }).then(resFile => {
                    if (resFile.status === 200) {
                        setListFile(resFile.data.data);
                    }
                }).catch(error => console.log(error));
            } else if (res.status === 401) {
                history.push('/login');
            }
        }).catch(error => {
            history.push('/login');
            console.log(error)
        });
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

    function changeTypeDisplay() {
        if (typeDisplay === 'list') {
            setTypeDisplay('grid')
        } else {
            setTypeDisplay('list')
        }
        setListSearchResult([]);
        setDisplayListResult("display-result-search-none");
    }

    function searchFile(e) {
        setIsLoading(true);
        setListSearchResult([]);
        if (e.target.value.length >= 3) {
            setDisplayListResult("display-result-search-block");
        } else {
            setDisplayListResult("display-result-search-none");
        }
        if (e.target.value.length >= 3) {
            let token = localStorage.getItem("token");
            let loginInfo = jwtDecode(token);
            let data = {
                'type': 1,
                'user_id': loginInfo.data.user_id,
                'file_name': e.target.value,
                'page': 0
            }
            axios.post(`https://asean-dev.smoothfile.jp/smoothfile6/admin/api/file/search/02`, JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => {
                if (res.status === 200) {
                    setIsLoading(false);
                    setListSearchResult(res.data.data.result);
                }
            }).catch(error => console.log(error));
        }
    }

    return (
        <>
            <h1>Home Component</h1>
            <Link to="/login" style={{ marginRight: "10px" }}> Back </Link>
            <Link to="/demo" style={{ marginRight: "10px" }}> Demo </Link>

            <div className="top-menu-project">
                <div className="top-menu-left">
                    <FontAwesomeIcon icon={faBars} className="icon-style" onClick={hideMenu} />
                    <FontAwesomeIcon icon={faCloudArrowUp} className="icon-style" />
                    <FontAwesomeIcon icon={faRightLeft} className="icon-style" />
                </div>
                <div className='top-menu-right'>

                    <div className="form-search">
                        <div className="div-form-search">
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="icon-search" />
                            <input type="text" name="search" placeholder="Search..." onChange={searchFile} autocomplete="off" />
                        </div>

                        <div>

                        </div>

                    </div>


                    {typeDisplay === "list"
                        ?
                        <FontAwesomeIcon icon={faGrip} onClick={changeTypeDisplay} />
                        :
                        <FontAwesomeIcon icon={faList} onClick={changeTypeDisplay} />
                    }

                </div>
            </div>

            <div className={displayListResult}>
                <div className="list-result-search" >
                    <div className="layer-list">
                        <div className="title-result-search">
                            Search Result
                        </div>

                        {isLoading === true ?
                            <div className="spinner-container">
                                <div className="loading-spinner">
                                </div>
                            </div>
                            :
                            <div className="result-search">
                                {(listSearchResult.length > 0) ?
                                    <>
                                        {listSearchResult.map((data, key) => {
                                            return (
                                                <p key={key}>{data.file_name}</p>
                                            )
                                        })}</>
                                    :
                                    <h4>No result</h4>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="flex-box2">
                <div className={styleMenu}>
                    <div className="list-project">
                        {showListProject()}
                    </div>
                </div>

                <div className={styleListFile}>
                    {listFile.length > 0
                        ?
                        <TableComponent listFile={listFile} typeDisplay={typeDisplay} />
                        : ""
                    }
                </div>
            </div>
            {/* <div>
                <UserProvider value={listTest} >
                    {/*có thể truyền nhiều biến và phương thức cập nhật của biến dó vd: <FoodContext.Provider value={{ name, location, setName, setLocation }}> */}
            {/*<BasicTable />
                </UserProvider>
            </div> */}
        </>
    )
}
export default HomeComponent;

