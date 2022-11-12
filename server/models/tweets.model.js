const mongoose = require('mongoose');

const TweetSchema = new mongoose.Schema({
    tweet:{
        type: String,
        required:[true, "A tweet is required."],
        minlength: [1, "Tweet's length must be at least 1 character!"]
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps:true})


const TweetModel = mongoose.model('Tweet', TweetSchema);
module.exports = TweetModel;