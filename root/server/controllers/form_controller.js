const { data } = require("jquery");
const form = require("../models/form");
const form_service = require("../services/form_service");



//short hand structure compared to the other controllers
function construct_res_obj (res,success_bool,data,status_code_success,status_code_fail,message_success,message_fail){
    if(!success_bool){
        res.status(status_code_fail).json({
            success:false,
            data:{},
            message:message_fail
        });
    }
    else{
        res.status(status_code_success).json({
            success:true,
            data:{data},
            message:message_success
        });
    }
}

function construct_error_obj(res, error, error_status_code, error_message, broadcast=true){
    console.log(broadcast ? error_message : "");
    res.status(error_status_code).json({
        success:false,
        error:error.message
    });
}

exports.submit_form = async (req, res) =>{
    try{
        //check for decisionmaking
        //no_exists ? create_new : update
        //cconst {first_name,last_name,email_address,short_message} = req.body;
        const success = await form_service.post_form(req.body.email_address,req.body);
        // const document_count_query = await form.countDocuments({$and:[{first_name:first_name},{last_name:last_name},{email_address:email_address}]});
        // const success = await ((document_count_query == 0) ? form_service.create_one_contact(req.body) : form_service.update_one_contact(req.body.email_address,req.body));
        construct_res_obj(res,success,{},200,500,"Successfully Sent and Saved to Database","Saving to Database Failed");
    } catch(error){
        construct_error_obj(res,error,500,String(error.message),true);
    }
};

exports.read_all_contacts = async (req,res) =>{
    //permission checks for accessing contact info
    try{
        //var more mem chanfe to const
        const {success,data_response} = await form_service.read_all_contacts();
        construct_res_obj(res,success,data_response,200,500,"Successful Read From Database","Unsuccessful Read, An Error Has Occurred");
    } catch(error){
        console.log(error.message);
        construct_error_obj(res,error,500,"",false);
    }
};

exports.update_one_contact = async (req,res)=>{
    try{
        //ensure proper parameters to body
        console.log("id and body to update", req.params.id, req.body);
        const success = await form_service.update_one_contact(req.params.id, req.body);
        construct_res_obj(res,success,{},200,500,"Successful Update Transaction","Update Was Not Successful");
    } catch(error){
        construct_error_obj(res,error,500,"",false);
    }
};

exports.delete_one_contact = async (req,res) =>{
    try{
        //ensure proper parameters to body
        const success = await form_service.delete_one_contact(req.params.id);
        construct_res_obj(res,success,{},200,500,"Successful Delete Transaction","Delete Was Not Successful");
    } catch(error){
        construct_error_obj(res,error,500,"",false);
    }
};