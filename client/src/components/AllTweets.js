import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";
import moment from 'moment';



const AllTweets = (props) => {

    const [tweetList, setTweetList] = useState([]);
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get("http://localhost:8000/api/tweets")
            .then((res)=>{
                console.log(res);
                console.log(res.data);
                setTweetList(res.data);
            })
            .catch((err)=>{
                console.log(err)
            })
    },[])

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/users`, 
        {withCredentials: true}
        )
        .then((res)=>{
            console.log(res.data)
            setUser(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }, [])

    const logout = (e) => {
        axios.post(`http://localhost:8000/api/users/logout`,
        {},
        {
            withCredentials: true
        },
        )
        .then((res)=>{
            console.log(res);
            console.log(res.data);
            navigate("/")
        })
        .catch((err)=>{
            console.log(err);
        })
    }

   
    


    return(
        <div className="tweetPage">
            

            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundImage: "linear-gradient(to bottom right, #72B2E4, #92E1E2)"
                
            }}>
                <ul style={{
                        listStyle: "none",
                        margin: "2em",
                        width: "100vw",
                        height: "5vh",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-around"
                        
                    }}>
                    
                    <li><FontAwesomeIcon size="lg" spin icon="fa-solid fa-dove" /></li>
                    <li><h4>Welcome <Link style={{textDecoration: "none", color: "black", cursor: "pointer", fontWeight: "bolder"}} to={`/user/profile/${user.username}`}>{user.username}</Link></h4></li>
                    


                    <li><Link to={"/new"}><FontAwesomeIcon size="lg" icon="fa-solid fa-plus" /></Link></li>
                    <li><button onClick={logout}><FontAwesomeIcon size="lg" color="blue" icon="fa-solid fa-right-from-bracket" /></button></li>
                    
                </ul>
            </div>


            

            <div className="gridContainer">
            {
                tweetList.map((tweet, i)=>{
                    return(
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            margin: "1em"
                        }}>

                            <Link style={{textDecoration: "none"}} to={`/tweet/${tweet._id}`}><div className="tweetBox" style={{
                                border: "1px solid black",
                                width: "48vw",
                                borderRadius: "10px",
                                padding: "1em",
                                height: "25vh",
                                color: "black",
                                padding: "1em",
                                backgroundColor: "white"
                                
                            }}>
                                <div className="userInfoTweetBox" style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-evenly"
                                }}>
                                    <h5><Link to={`/user/profile/${tweet.createdBy?.username}`}>{tweet.createdBy?.username}</Link></h5>
                                    <h6 style={{
                                        color: "#8C8C8C"
                                    }}>{moment(tweet.createdAt).subtract(3, 'days').calendar()}</h6>
                                    {/* momentjs.com ^ */}
                                    <Link to={`/tweet/edit/${tweet._id}`}><FontAwesomeIcon icon="fa-solid fa-pen-to-square" /></Link> 
                                    


                                </div>

                                <div style={{
                                    padding: "1em",
                                    display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        height: "150px"
                                }}>
                                    <h5>{tweet.tweet}</h5>
                                    
                                </div>

                                
                            </div></Link>
                            
                        </div>

                    )
                })
            }
            </div>
            
        </div>
        
    )
}

export default AllTweets;