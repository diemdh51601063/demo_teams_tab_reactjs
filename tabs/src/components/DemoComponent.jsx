import React, { useEffect } from "react";
import { useState } from "react";
import { useTeams } from "msteams-react-base-component";
import LuckyWheelComponent from "./lucky_wheel/LuckyWheelComponent";


function DemoComponent() {

    // const [{ inTeams, theme }] = useTeams({});
    // const [tmpVariable, setTmpVariable] = useState(1);
    // const [message, setMessage] = useState("Loading...");

    // useEffect(() => {
    //     if (inTeams === true) {
    //         setMessage("In Microsoft Teams!");
    //     } else {
    //         if (inTeams !== undefined) {
    //             setMessage("Not in Microsoft Teams");
    //         }
    //     }
    // }, [inTeams]);


    // const showAlert = () => {
    //     setTmpVariable(prev => prev + 1);
    // }
    return (
        <>
            {/* <div className="demo-align">
                <h2>{message}</h2>
                <h1>DEMO TEAMS APP TAB</h1>
                <button type="button" onClick={showAlert}>
                    Click !!
                </button>
                <br></br>
                {tmpVariable}
            </div> */}
            <LuckyWheelComponent />
        </>
    )
}

export default DemoComponent;