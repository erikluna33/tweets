import axios from "axios";
import React, {useState, useEffect} from "react";



const Register = (props) => {

    const [confirmReg, setConfirmReg] = useState("");
    const [errors, setErrors] = useState({});
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    };

    const register = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/users/register",
        user,
        {
            withCredentials: true
        })
        .then((res)=>{
            console.log(res.data);
            setUser({
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
            });
            setConfirmReg(
                "Thanks for registering!"
            );
            setErrors({});
        })
        .catch((err)=>{
            console.log(err);
            console.log(err.response);
            setErrors(err.response.data.errors);
        })
    }


    return(
        <div className="regbox" style={{
            border: "2px solid #008CBA",
            borderRadius: "10px",
            height: "35vh",
            width: "40vw",
            textAlign: "center",
            margin: "1em"
        }}>
            <h1>Register</h1>
            {confirmReg ? <h4>{confirmReg}</h4> :null}
            <form onSubmit={register}>

               <div style={{
                   display: "flex",
                   flexDirection: "column",
                   justifyContent: "center",
                   alignItems: "center",
                   height: "10vh",
                   height: "20vh"
               }}>

                <div>
                    <label style={{
                        margin: ".3em",
                        color: "grey"
                    }}>Username </label>
                    {errors.username?(
                        <span className="error-text">{errors.username.message}</span>
                    ):null
                    }
                    <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={(e) => handleChange(e)}
                    />
                </div>

                <div className="registerBox">
                    <label style={{
                        margin: "1em",
                        color: "grey"
                    }}>Email </label>
                    {errors.email? (
                        <span className="error-text">{errors.email.message}</span>
                    ): null}
                    <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    />
                </div>

                <div className="registerBox">
                    <label style={{
                        margin: ".3em",
                        color: "grey"
                    }}>Password </label>
                    {errors.password ? (
                        <span className="error-text">{errors.password.message}</span>
                    ) : null}
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}

                    />
                </div>

                <div className="registerBox">
                    <label style={{
                        color: "grey"
                    }}>Confirm Password</label>
                    {errors.confirmPassword ? (
                        <span className="error-text">{errors.confirmPassword.message}</span>
                    ) : null}
                    <input
                        style={{
                            // border: "1px solid red",
                            marginRight: "2em",
                            marginTop: "1em"
                        }}
                        type="password"
                        name="confirmPassword"
                        value={user.confirmPassword}
                        onChange={handleChange}

                    />
                </div>

                </div> 

                <div>
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
                    }}>Register Me</button>

                </div>
            </form>
        </div>
    )
}


export default Register;