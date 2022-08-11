import React from "react";
import "../../assets/smoothfile/login.css";
import { useForm } from "react-hook-form";

function LoginComponent() {

    //const {data, handleSubmit } = useForm();

    const sendAPI = (data) => {

        console.log(data);
    }

    return (
        <div className="login">
            <h1>Login Smoothfile Component</h1>
            <form className="style-form" onSubmit={sendAPI}>
                <h3>Login Smoothfile</h3>
                {/* <div className="item-form">
                    <label>URL *</label>
                    <input type="text" />
                </div>
                <div className="item-form">
                    <label>Login Code *</label>
                    <input type="text" />
                </div>
                <div className="item-form">
                    <label>Password *</label>
                    <input type="text" />
                </div> */}
                <div className="field">
                    <input type="text" required autoComplete="off" id="url" name="url"/>
                    <label htmlFor="url" title="URL *"></label>
                </div>
                <div className="field">
                    <input type="text" required autoComplete="off" id="login-code" name="login-code"/>
                    <label htmlFor="login-code" title="Login Code *"></label>
                </div>
                <div className="field">
                    <input type="password" required autoComplete="off" id="password" name="password"/>
                    <label htmlFor="password" title="Password *"></label>
                </div>
                <div className="item-form">
                    {/* <input type="text" required autoComplete="off" id="link"/>
                    <label htmlFor="link" title="Link"></label> */}
                    <label>Link</label>
                    <select autoComplete="off" id="link">
                        <option value="nolink">No link</option>
                    </select>
                    
                </div>
                
                <div className="item-form">
                    <button type="submit"> <p>Log In</p></button>
                </div>
                <div className="item-form content">
                    <p>
                        By granting Smooth File for Microsoft Teams access to Smooth File, you are agreeing to Smooth File Terms of Service and Privacy Policy.
                    </p>
                    <p style={{marginTop:"20px"}}>
                        Copyright © 株式会社プロット | Create Next Communication 2022.
                    </p>
                </div>
            </form>
        </div>
    )
}
export default LoginComponent;