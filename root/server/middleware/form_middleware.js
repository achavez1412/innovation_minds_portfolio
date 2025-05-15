const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

const {REQUIRED_OPTIONAL_FIELDS} = require("../../config/enum");
const field_length = 4;

//create enum file with all variable operations perhaps config
//look into examples about enum usage

function authentication_form_access(action){
    //authnentication
    if(false){
        res.status(401).json({error:`Unauthorized ${action} Access`});
        return false;
    }
    return true;
}

function sanitizer(req=false,body_to_sanitize,return_clean=false){
    //check for proper body?
    const clean_body = DOMPurify.sanitize(body_to_sanitize);
    req.body = (req) ? clean_body : req.body;
    return (return_clean) ? clean_body : true;
}

const form_validator =(req,res,next)=>{
    try{
        if(!req.body){
            res.status(400).json({error:"Object Error: Request Body Required"});
        }
        //sanitize
        const clean_body = sanitizer(req,req.body,true);
        const {first_name,last_name,email_address,short_message} = clean_body;

        if(!first_name||!last_name||!email_address){
            res.status(400).json({error: "Required Fields are Missing"});
        }
    
        let request_entries = Object.entries(clean_body);
        if(request_entries.length !== field_length){
            res.status(400).json({error:"FormatError: Entire Fields Missing"});
        }
        for(let [key,value] of request_entries){
            if(!REQUIRED_OPTIONAL_FIELDS.hasOwnProperty(key)){
                res.status(400).json({error:"Object Error: Missing Required Keys"});
            }
            else if(typeof(value)!== REQUIRED_OPTIONAL_FIELDS[key][0]){
                res.status(400).json({error:"TypeError: Missing Required Data Type Format"});
            }
    
            //if empty and required error
            if(value==="" && REQUIRED_OPTIONAL_FIELDS[key][1] === "required"){
                res.status(400).json({error:"FormatError: Required Fields Must Be Filled"})
            }
        }
        next();
    } catch(error){
        console.log(error);
    }
};

const read_all_contacts_validator=(req,res,next)=>{
    try{
        //some form of authorization check for admin user
        authentication_form_access("Read");
        //limit checks for reading users
        next();
    } catch(error){
        console.log(`Error: ${error}`);
    }
    
};  

const update_one_contact_validator=(req,res,next)=>{
    try{
        authentication_form_access("Update");
        sanitizer(req,req.body,false);
        //sanitize
        next();
    } catch(error){
        console.log(`Error: ${error}`);
    }
}
const delete_one_contact_validator=(req,res,next)=>{
    try{
        authentication_form_access("Delete");
        sanitizer(req,req.body,false);
        next();
    } catch(error){
        console.log(`Error: ${error}`);
    }
}
module.exports={
    form_validator,
    read_all_contacts_validator,
    update_one_contact_validator,
    delete_one_contact_validator
};