require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}))
app.use(cookieParser());



require("./config/mongoose.config");
require("./routes/tweets.routes")(app);
require("./routes/users.routes")(app);





app.listen(process.env.MY_PORT, ()=> console.log("Connected to the port!"));