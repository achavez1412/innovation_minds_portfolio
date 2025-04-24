const mongoose = require("mongoose");

const connect_DB = async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/Portfolio_Local",{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log("✅ MongoDB Instance Connected Successfully");
    }
    catch(error){
        console.log("❌ MongoDB Connection Failed",error.message);
        process.exit();
    }
};

module.exports = connect_DB;