const TweetController = require('../controllers/tweets.controller');
const {authenticate} = require("../config/jwt.config")

module.exports = (app) =>{
    app.get("/api/tweets", TweetController.findAllTweets);

    app.post("/api/tweets", authenticate, TweetController.createTweet);

    app.get("/api/tweets/:id", TweetController.findOneTweet);

    app.delete("/api/tweets/:id", authenticate, TweetController.deleteOneTweet);

    app.put("/api/tweets/:id", authenticate, TweetController.updateTweet);

    app.get("/api/tweetsbyuser/:username", authenticate, TweetController.findAllTweetsByUser);
}