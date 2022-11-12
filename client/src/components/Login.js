import React, {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';


const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();


    const login = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8000/api/users/login",
        {
            email: email,
            password: password,
        },{
            withCredentials: true,
        },
        )
        .then((res)=>{
            console.log(res, "res");
            console.log(res.data, "is res data!");
            navigate("/home");
        })
        .catch((err)=>{
            console.log(err.response.data);
            setErrorMessage(err.response.data.message)
        })
    }


    return(
        <div className="loginbox" style={{
            border: "2px solid #008CBA",
            borderRadius: "10px",
            height: "30vh",
            width: "40vw",
            textAlign: "center",
            margin: "1em"
        }}>
            <div>
            <h1>Log In</h1>
            <p className="error-text">{errorMessage ? errorMessage: ""}</p>
            <form onSubmit={login}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "10vh",
                padding: "1em",
                
            }}>
                <div>
                    <label style={{
                        margin: "1em",
                        color: "grey"
                    }}>Email </label>
                    <input style={{
                        borderTop: "none",
                        borderRight: "none",
                        borderLeft: "none",
                        borderColor: "#008CBA"
                    }} placeholder="janedoe@gmail.com"
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                    />
                </div>

                <div>
                   <label style={{
                       margin: ".3em",
                       color: "grey"
                   }}>Password </label>
                   <input style={{
                        borderTop: "none",
                        borderRight: "none",
                        borderLeft: "none",
                        borderColor: "#008CBA"
                   }} 
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                   />
                </div>
            </div>
                <div className="center">
                    <button style={{
                        backgroundColor: '#008CBA',
                        color: 'white',
                        textDecoration: 'none',
                        border: 'none',
                        fontSize: '16px',
                        padding: "10px 20px",
                        borderRadius: "10px",
                        margin: "1em",
                        cursor: "pointer"
                    }}>Sign in</button>
                </div>
            </form>
            </div>
        </div>
    )
}


export default Login;