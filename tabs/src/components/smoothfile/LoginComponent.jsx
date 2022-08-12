import React, { useRef, useState } from "react";
import "../../assets/smoothfile/login.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useHistory } from "react-router-dom";

function LoginComponent() {

    // const { login,
    //     handleSubmit,
    //     formState: { errors }
    // } = useForm(
    //     // {
    //     //     defaultValues: {
    //     //         url: useRef("url"),
    //     //         logincode: useRef("login-code"),
    //     //         password: useRef("password")
    //     //     }
    //     // }
    // );
    const history = useHistory();
    const [inputs, setInputs] = useState({
        login_type: "normal",
        ldap_list: "0001"
    });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // let tmpInputs = {
        //     login_code: "",
        //     password: "",
        //     login_type: "normal",
        //     ldap_list: "0001"
        // }
        // tmpInputs.login_code = inputs.login_code;
        // tmpInputs.password = inputs.password;
        // console.log(JSON.stringify(tmpInputs));

        axios.post(inputs.url, JSON.stringify(inputs), {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        ).then(res => {
            // console.log(JSON.stringify(inputs));
            // console.log(res.status);
            // console.log(res.data);
            if(res.status == 200) {
                history.push('/home');
            }
        }).catch(error => console.log(error));
    }

    return (
        <div className="login">
            <h1>Login Smoothfile Component</h1>
            <form className="style-form" onSubmit={handleSubmit}>
                <h3>Login Smoothfile</h3>
                <div className="field">
                    <input type="text" required autoComplete="off" id="url"
                        name="url"
                        value={inputs.url || ""}
                        onChange={handleChange} />
                    <label htmlFor="url" title="URL *"></label>
                </div>
                <div className="field">
                    <input type="text" required autoComplete="off" id="login_code" name="login_code"
                        value={inputs.login_code || ""}
                        onChange={handleChange} />
                    <label htmlFor="login_code" title="Login Code *"></label>
                </div>
                <div className="field">
                    <input type="password" required autoComplete="off" id="password" name="password"
                        value={inputs.password || ""}
                        onChange={handleChange} />
                    <label htmlFor="password" title="Password *"></label>
                </div>
                <div className="item-form">
                    <label>Link</label>
                    <select id="linkldap" name="linkldap"
                        value={inputs.linkldap || ""}
                        onChange={handleChange}>
                        <option value="normal">No link</option>
                        <option value="haslink">Has link</option>
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