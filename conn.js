const mongoose=require("mongoose");
const dotenv=require('dotenv');
dotenv.config();

mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true

    }).then(()=>{
        console.log("Connected to db");
    }).catch((e)=>{
        console.log(`couldnt connect to db`);
    });
