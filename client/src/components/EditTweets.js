import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, navigate, useNavigate, useParams} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const EditTweets = (props) => {

    const [tweet, setTweet] = useState("");
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/tweets/${id}`)
            .then((res)=>{
                console.log(res);
                console.log(res.data);
                setTweet(res.data.tweet);
            })
            .catch((err)=>{
                console.log(err)
            })
    }, [id]);

    const submitHandler = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:8000/api/tweets/${id}`,
        {
            tweet
        },
        {withCredentials: true}
        )
        .then((res)=>{
            console.log(res);
            console.log(res.data)
            navigate("/home");
        })
        .catch((err)=>{
            console.log(err);
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
                }}>Edit Tweets</h1>
                <Link to={"/home"}><FontAwesomeIcon size="lg" icon="fa-solid fa-house" /></Link>
            </div>
            
            
            <form onSubmit={submitHandler}>
                <div style={{
                    // border: "1px solid black",
                    height:"50vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"

                }}>
                    {/* <label style={{
                        color: "#71767A",
                        fontWeight: "bold",
                        fontSize: "1.5rem",
                        letterSpacing: "1.5px"
                    }}>What's happening?</label> */}
                    {/* <textarea></textarea> */}
                    <textarea style={{
                        height: "30vh",
                        width: "40vw",
                        borderRadius: "10px",
                        padding: "1em",
                        color: "#71767A",
                        fontWeight: "bold",
                        fontSize: "1rem",
                        letterSpacing: "1px"

                    }} value={tweet} onChange={(e) => setTweet(e.target.value)} type="text"/>

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
                        }}>Update</button>
                </div>
            </form>
        </div>
    )
}

export default EditTweets;