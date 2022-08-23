import React, { useRef, useState } from "react";
import "../../assets/smoothfile/login.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";


function LoginComponent() {

    const [listLdap, setListLdap] = useState();

    const { register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const history = useHistory();
    useEffect(() => {
        getLDAPList();
    }, []);

    async function getLDAPList() {
        await axios.get(`https://asean-dev.smoothfile.jp/smoothfile6/admin/api/auth/get-ldap-list/02`).then(res => {
            if (res.status == 200) {
                setListLdap(res.data.data)
            }
        }).catch(error => console.log(error));
    }

    const onSubmit = (data) => {
        axios.post(data.url, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status == 200) {
                const loginInfo = jwtDecode(res.data.data.access_token);
                localStorage.setItem("token", res.data.data.access_token);
                history.push('/test');
            }
        }).catch(error => console.log(error));
    }

    return (
        <div className="login">
            <h1>Login Smoothfile Component</h1>
            <form className="style-form" onSubmit={handleSubmit(onSubmit)}> 
                <h3>Login Smoothfile</h3>
                <div className="field">
                    <input type="text" required autoComplete="off" id="url" name="url" {...register("url", { required: true })} 
                    value="https://asean-dev.smoothfile.jp/smoothfile6/admin/api/auth/login/02"
                    />
                    <label htmlFor="url" title="URL *"></label>
                </div>
                <div className="field">
                    <input type="text" required autoComplete="off" id="login_code" name="login_code" {...register("login_code", { required: true })} value="admin"/>
                    <label htmlFor="login_code" title="Login Code *"></label>
                </div>
                <div className="field">
                    <input type="password" required autoComplete="off" id="password" name="password" {...register("password", { required: true })} value="n00t9jaV"/>
                    <label htmlFor="password" title="Password *"></label>
                </div>
                <div className="item-form">
                    <label>Link</label>
                    <select id="link_ldap" name="link_ldap" {...register("link_ldap")}>
                        {Array.isArray(listLdap) ?
                            listLdap.map((item, index) => {
                                return (
                                    <option value={index}>{item}</option>
                                )
                            }) 
                            :
                            <option value="normal">No link</option>
                        }
                    </select>
                </div>

                <div className="item-form">
                    <button type="submit"> <p>Log In</p></button>
                </div>

                <div className="item-form content">
                    <p>
                        By granting Smooth File for Microsoft Teams access to Smooth File, you are agreeing to Smooth File <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
                    </p>
                    <p style={{ marginTop: "20px" }}>
                        Copyright © <a href="#" >株式会社プロット | Create Next Communication</a> 2022.
                    </p>
                </div>

            </form>
        </div>
    )
}
export default LoginComponent;