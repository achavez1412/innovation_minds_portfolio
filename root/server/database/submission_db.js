//const DB = require("./submission_db.json");
const path = require("path");
const fs = require("fs");
const DB_path = path.join(__dirname, "./submission_db.json");

var submission_file;
var submission_file_js_arr;
//retrieves all entries listed along the language option
//might have return the object or the array of all selected tags
const post_entries=(field_data)=>{
    try{
        submission_file = fs.readFileSync(DB_path,"utf-8");
        submission_file_js_arr = JSON.parse(submission_file);

        //some more checks here
        
        //check if conversion worked even if no error
        //assumes also that the json formatted as [{},{}] rather than object {__:{},__:{}}
        if(!Array.isArray(submission_file_js_arr)){
            throw new Error("Something Went Wrong With the Conversion");
        }

        submission_file_js_arr.push(field_data);
        submission_file_js_arr = JSON.stringify(submission_file_js_arr,null, 2);
        fs.writeFileSync(DB_path,submission_file_js_arr, "utf-8");
        console.log("SERVER CONFIRMED: DATA POSTED");
    } catch(error){
        console.log("Error: ",error);
    }
};

module.exports={
    post_entries,
}