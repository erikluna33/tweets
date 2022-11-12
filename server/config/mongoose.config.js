const mongoose = require('mongoose');
// const databaseName = "tweets";

mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(()=>{
        console.log("Connected to the database")
    })
    .catch((err)=>{
        console.log(`There is a problem in connecting to the databse. The problem is ${err}`)
    })