import React, {useState, useEffect} from "react";
import Login from "../components/Login";
import Register from "../components/Register";


const LogReg = (props) => {





    return(
        <div className="logreg" style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start"
        }}>
            <div className="flex-form" style={{
                height: "100vh"
            }}>
                <Login />
                <Register />
            </div>
        </div>
    )
}


export default LogReg;