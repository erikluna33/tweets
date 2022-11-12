import axios from "axios";
import React, {useState, useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Profile = (props) => {

    const [userTweetList, setUserTweetList] = useState([]);
    const {username, user} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/tweetsbyuser/${username}`,
        
        {
            withCredentials: true
        }
        )
        .then((res)=>{
            console.log(res.data)
            setUserTweetList(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }, [])


    return(
        <div className="profileContainer">
            <div style={{
                backgroundImage: "linear-gradient(to bottom right, #72B2E4, #92E1E2)",
                width: "100vw",
                height: "10vh",
                display: "flex",
                flexDirection: "row",
                alignItems: 'center',
                justifyContent: "space-around"
            }}>
                <h2>Welcome {username}</h2>
                <h3 style={{
                    border: "1px solid black",
                    width: "5vw",
                    height: "7vh",
                    borderRadius: "30px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "bolder",
                    backgroundColor: "#ffff"
                }}>{username.slice(0,2).toUpperCase()}</h3>
                 <Link style={{margin: "1em"}} to={"/home"}><FontAwesomeIcon size="lg" icon="fa-solid fa-house" /></Link>
            </div>
            <div style={{
                margin: "1em"
            }} className="profileCard">
                <h1>Profile picture</h1>
                <h3>{username}</h3>
                
                
            </div>

            <div className="gridContainer">
            {
                userTweetList.map((tweet, i)=>{
                    return(
                        <div style={{
                            border: "1px solid black",
                            width: "30vw",
                            borderRadius: "10px",
                            padding: "1em",
                            height: "25vh",
                            color: "black",
                            padding: "1em",
                            backgroundColor: "white",
                            margin: "1em"
                            
                        }}>
                            <h5>{tweet.tweet}</h5>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}

export default Profile;