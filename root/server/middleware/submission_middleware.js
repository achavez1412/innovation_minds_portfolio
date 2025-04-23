const regex_name_str = /[\p{L}]*/;
const regex_email_str=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const required_optional_fields = {
    first_name:["string","required"],
    last_name:["string","required"],
    email_address:["string","required"],
    short_message:["string","optional"]
};
const field_length = 4;

//validator that expects the data being posted in the format {first_name:entry(string), last_name:entry(string), email_address:entry(string), short_message:entry(string)}
//validator ensures that data is formatted properly with proper authentication of entries
//indexing [0]: data type requirement, [1]:status requirement
const submission_validator=(req,res,next)=>{
    try{
        //consider res.status(ie 400).json({error:"messge"})
        //if the request body is undefined ie(not parsed or such)
        if(!req.body){
            res.status(400).json({error:"Object Error: Request Body Required"});
        }
        //check that the object has proper parameters and not empty
        let request_entries = Object.entries(req.body);
        if(request_entries.length !== field_length){
            res.status(400).json({error:"FormatError: Missing Fields Entirely"});
        }
        for(let [key,value] of request_entries){
            if(!required_optional_fields.hasOwnProperty(key)){
                res.status(400).json({error:"Object Error: Missing Required Keys"});
            }
            else if(typeof(value)!== required_optional_fields[key][0]){
                res.status(400).json({error:"TypeError: Missing Required Data Type Format"});
            }

            //if empty and required error
            if(value==="" && required_optional_fields[key][1] === "required"){
                res.status(400).json({error:"FormatError: Required Fields Must Be Filled"})
            }
        }

        console.log("SOURCE:MIDDLEWARE --- Request has been Validated by Submission_Validator");
        next();
    } catch(error){
        console.log(error);
    }
};

//TODO: validator for submission,, fields exist minimum
module.exports={
    submission_validator,
}