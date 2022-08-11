import React from "react";
import { Link } from "react-router-dom";
import "../../assets/smoothfile/style.css"

function SmoothfileIndexComponent() {
    return (
        <>
            <div className="smoothfile-login">
                <div className="smoothfile-div-center">
                    <h1 style={{ textAlign: "center" }}>Smoothfile Component</h1>
                    <h2 style={{ textAlign: "center" }}>Log in to grant access to Smooth File</h2>
                    <div className="smoothfile-test">
                        <Link className="smoothfile-btn-center-text" to="/login"> <button className="smoothfile-btn-center">Log In</button></Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SmoothfileIndexComponent;