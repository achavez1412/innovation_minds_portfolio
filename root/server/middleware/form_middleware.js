const required_optional_fields = {
    first_name:["string","required"],
    last_name:["string","required"],
    email_address:["string","required"],
    short_message:["string","optional"]
};
const field_length = 4;
const form_validator =(res,req,next)=>{
    try{
        if(!req.body){
            res.status(400).json({error:"Object Error: Request Body Required"});
        }
        
        const {first_name,last_name,email_address,short_message} = req.body;
        if(!first_name||!last_name||!email_address){
            res.status(400).json({error: "Required Fields are Missing"});
        }
    
        let request_entries = Object.entries(req.body);
        if(request_entries.length !== field_length){
            res.status(400).json({error:"FormatError: Entire Fields Missing"});
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
        next();
    } catch(error){
        console.log(error);
    }
};


module.exports={form_validator,};