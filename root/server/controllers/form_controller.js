const form = require("../models/form");
const read_contacts_service = require("../services/form_service");

//short hand structure compared to the other controllers

exports.submit_form = async (req, res) =>{
    try{
        const {first_name,last_name,email_address,short_message} = req.body;
        const form_data = new form({first_name,last_name,email_address,short_message});
        await form_data.save();

        res.status(200).json({
            success:true,
            message:"Successfully Sent and Saved to Database"
        });
    } catch(error){
        res.status(500).json({
            success:false,
            error:error.message
        });
    }
};

exports.read_all_contacts = async (req,res) =>{
    //permission checks for accessing contact info
    try{
        //var more mem chanfe to const
        var success,data_response = await read_contacts_service.read_all_contacts();
        if(!success){
            res.status(500).json({
                sucess:false,
                data:{},
                message:"Unsuccessful Read, An Error Has Occurred"
            });
        }
        else{
            res.status(200).json({
                success:true,
                data:{data_response},
                message:"Successful Read From Database"
            });
        }
    } catch(error){
        res.status(500).json({
            success:false,
            error: error.message
        });
    }
};

exports.update_one_contact = async (req,res)=>{
    try{
        //ensure proper parameters to body
        const {id_name,field,data} = req.body;
        const {success,data_response} = await read_contacts_service.update_one_contact(id_name,field,data);
        if(!success){
            res.status(500).json({
                success:false,
                data:{},
                message:"Request Was Not Successful"
            });
        }
        else{
            //check out data_response format to avoid {{}}
            res.status(200).json({
                success:true,
                data:data_response,
                message:"Successful Transaction"
            });
        }
    } catch(error){
        res.status(500).json({
            success:false,
            error:error.message
        });
    }
};

exports.delete_one_contact = async (req,res) =>{
    try{
        //ensure proper parameters to body
        var {id_name,field,data} = req.body;
        var success,data_response = await read_contacts_service.delete_one_contact(id_name,field,data);
        if(!success){
            res.status(500).json({
                success:false,
                data:{},
                message:"Request Was Not Successful"
            });
        }
        else{
            res.status(200).json({
                success:true,
                data:{data_response},
                message:"Successful Transaction"
            });
        }
    } catch(error){
        res.status(500).json({
            success:false,
            error:error.message
        });
    }
};