const form = require("../models/form");

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