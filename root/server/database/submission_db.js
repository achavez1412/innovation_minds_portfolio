const DB = require("./submission_db.json");
const fs = require("fs");

var submission_file;
var submission_file_js_arr;
//retrieves all entries listed along the language option
//might have return the object or the array of all selected tags
const post_entries=(field_data)=>{
    try{
        submission_file = fs.readFileSync(DB,"utf-8");
        submission_file_js_arr = JSON.parse(submission_file);

        //some more checks here
        
        //check if conversion worked even if no error
        if(!Array.isArray(submission_file_js_arr)){
            throw new Error("Something Went Wrong With the Conversion");
        }
        submission_file_js_arr.push(field_data);
        submission_file = JSON.stringify(submission_file_js_arr);
        fs.writeFileSync(DB,submission_file, "utf-8");

    } catch(error){
        console.log("Error: ",error);
    }
};

module.exports={
    post_entries,
}