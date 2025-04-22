//post data given from the controller
const submission_connector = require("../database/submission_db.js");

//return bool
const post_data = (data)=>{
    try{
        submission_connector.post_entries(data)
        return true;
    } catch(error){
        return false;
    }
};

module.exports ={
    post_data,
};