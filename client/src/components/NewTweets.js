import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const NewTweets = (props) => {

    const [tweet, setTweet] = useState("");
    const navigate = useNavigate();
    const [errors, setErrors]= useState({});

    const submitHandler = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/tweets",
        {
            tweet
        },
        {withCredentials: true}
        )
       
        
        .then((res)=>{
            console.log(res);
            console.log(res.data);
            navigate("/home");
        })
        .catch((err)=>{
            console.log(err);
            console.log("err.response:", err.response);
            console.log("err.response.data:", err.response.data);
            console.log("err.response.data.errors:", err.response.data.errors);
            setErrors(err.response.data.errors);
            console.log(errors);
        })
    }


    return(
        <div>
            {/* <Link to={"/"}>Home</Link> */}
            <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                margin: "1em"
            }}>
                <h1 style={{
                    color: 'black'
                }}>Post Tweets</h1>
                <Link to={"/home"}><FontAwesomeIcon size="lg" icon="fa-solid fa-house" /></Link>
            </div>
            
            
            <form onSubmit={submitHandler}>
                <div style={{
                    height:"50vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"

                }}>
                    <div style={{
                        height: "30px",
                        width: "500px",
                        color: "red"
                    }}>
                    {
                        errors.tweet?
                        <h4>{errors.tweet.message}</h4>
                        :null
                    }
                    </div>
                    
                    <textarea style={{
                        height: "30vh",
                        width: "40vw",
                        borderRadius: "10px",
                        padding: "1em",
                        color: "#71767A",
                        fontWeight: "bold",
                        fontSize: "1rem",
                        letterSpacing: "1px"

                    }} placeholder="What's happening?" value={tweet} onChange={(e) => setTweet(e.target.value)} type="text"/>

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
                        }}>Tweet</button>
                </div>
            </form>

        </div>
    )
}

export default NewTweets;