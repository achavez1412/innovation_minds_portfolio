//require the service that will actually handle the access and manipulation
const submision_service = require("../services/submission_service");

const post_submission_fields = (req,res)=>{
    //try/catch
    try{
        const successful_transaction = submision_service.post_data(req.body);
        if(successful_transaction){
            res.json({
                success: true,
            });
        } else{
            res.json({
                success:false,
            })
        }
    } catch(error){
        console.log(error);
        res.json({
            success:false,
            data:{},
            error:error.message
        });
    }
};

module.exports ={
    post_submission_fields,
};