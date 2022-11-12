import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import moment from "moment";


const OneTweet = (props) => {

    const [oneTweet, setOneTweet] = useState({});


    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/tweets/${id}`)
            .then((res)=>{
                console.log(res);
                console.log(res.data)
                setOneTweet(res.data);
            })
            .catch((err)=>{
                console.log(err);
            })
    }, [])



    



    



    const deleteTweet = () => {
        axios.delete(`http://localhost:8000/api/tweets/${id}`)
        .then((res)=>{
            console.log(res)
            console.log(res.data)
            setOneTweet()
            navigate("/home")
        })
        .catch((err)=>{
            console.log(err);
        })
    }




    return(
        <div style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center"
        }}>
            <div style={{
                width: "100vw",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                backgroundImage: "linear-gradient(to bottom right, #72B2E4, #92E1E2)",
                height: "10vh"
            }}>
                
            <Link style={{margin: "1em"}} to={"/home"}><FontAwesomeIcon size="lg" icon="fa-solid fa-house" /></Link>
            </div>

                <div className="tweetBox" style={{
                                border: "1px solid black",
                                width: "48vw",
                                borderRadius: "10px",
                                padding: "1em",
                                height: "25vh",
                                color: "black",
                                margin: "1em"
                            }}>
                                <div className="userInfoTweetBox" style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-evenly"
                                }}>
                                    {/* <h6>{oneTweet.createdAt}</h6> */}
                                    <h6>{moment(oneTweet.createdAt).subtract(3, 'days').calendar()}</h6>
                                </div>

                                <div style={{
                                    padding: "1em"
                                }}>
                                    <h5>{oneTweet.tweet}</h5>
                                </div>
                </div>

                <div>
                    <button onClick={deleteTweet}><FontAwesomeIcon icon="fa-solid fa-trash" /></button>

                </div>
                
        </div>
    )
}

export default OneTweet;