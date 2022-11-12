const TweetModel = require(`../models/tweets.model`);
const jwt = require("jsonwebtoken");
const User = require("../models/users.model");

module.exports = {
    findAllTweets: (req, res) => {
        TweetModel.find({})
        .populate("createdBy", "username email")
            .then((showAllTweets)=>{
                console.log("Inside find all tweets");
                res.json(showAllTweets);
            })
            .catch((err)=>{
                console.log('errors');
                res.json(err);
            })
    },
     createTweet: (req, res)=>{

        const newTweetObject = new TweetModel(req.body)

        const decodedJWT = jwt.decode(req.cookies.usertoken,{
            complete: true
        })

        newTweetObject.createdBy = decodedJWT.payload.id




        //  TweetModel.create(req.body)
            newTweetObject.save()
            .then((newTweet)=>{
                console.log("Success in creating a tweet");
                console.log(newTweet);
                return res.json(newTweet);
            })
            .catch((err)=>{
                console.log("Error in creating tweet!")
                res.status(400).json(err)
            })
     },
     findOneTweet: (req, res)=>{
         TweetModel.findById({_id:req.params.id})
            .then((tweetObject)=>{
                console.log("Found tweet id was a success!");
                console.log(tweetObject);
                return res.json(tweetObject);
            })
            .catch((err)=>{
                console.log(err);
                return res.json(err);
            })
     },
     deleteOneTweet: (req, res)=>{
         TweetModel.deleteOne({_id:req.params.id})
            .then((deleteTweet)=>{
                return res.json(deleteTweet)
            })
            .catch((err)=>{
                console.log("There was an error in deleting tweet.");
                return res.json(err);
            })
     },
     updateTweet: (req, res)=>{
         TweetModel.findOneAndUpdate({_id:req.params.id},
            req.body,
            {new: true, runValidators: true})
            .then((updatedTweet)=>{
                console.log(updatedTweet);
                res.json(updatedTweet)
            })
            .catch((err)=>{
                console.log(`There was an error in updating tweet. The errors was ${err}`);
            })
     },
     findAllTweetsByUser: (req, res)=> {
         if(req.jwtpayload.username !== req.params.username){
             console.log("Not the user");
             User.findOne({username: req.params.username})
                .then((userNotLoggedIn)=>{
                    TweetModel.find({createdBy: userNotLoggedIn._id})
                    .populate("createdBy", "username")
                    .then((allTweetsFromUser)=>{
                        console.log(allTweetsFromUser);
                        res.json(allTweetsFromUser)
                    })
                })
                .catch((err)=>{
                    console.log(err);
                    res.status(400).json(err);
                })
         }
         else{
             console.log("current user");
             console.log("req.jwtpayload.id", req.jwtpayload.id);
             TweetModel.find({createdBy: req.jwtpayload.id})
                .populate("createdBy", "username")
                .then((allTweetsFromLoggedInUser)=>{
                    console.log(allTweetsFromLoggedInUser);
                    res.json(allTweetsFromLoggedInUser);
                })
                .catch((err)=>{
                    console.log(err);
                    res.status(400).json(err);
                })
         }
     }
}