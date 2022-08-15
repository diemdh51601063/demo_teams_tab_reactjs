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
        axios.get(`https://asean-dev.smoothfile.jp/smoothfile6/admin/api/project/list/02?user_id=${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            if (res.status == 200) {
                console.log('111');
                setListDirectory(res.data.data);
            }
        }).catch(error => console.log(error));
    }
    useEffect(() => {
        getListDirectory();
    }, [])


    return (
        <>
            <h1>Home Component</h1>
            <a href="/login">Back</a>
            <div className="menu-directory">
                <ul>
                    {listDirectory.map((item, ind) => {
                        return (
                            <li key={"project_" + ind}>{item.project_name}
                                <ul>
                                    {item.directoriesList.map((dir, k) => {
                                        return (
                                            <li>{dir.directory_name}</li>
                                        )
                                    })}
                                </ul>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )

}
export default HomeComponent;