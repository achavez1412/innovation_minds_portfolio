//require the service that will actually handle the access and manipulation
const submision_service = require("../services/submission_service");

const post_submission_fields=(req,res)=>{
    //try/catch
    try{
        const successful_transaction = submision_service.post_data(req.body);
        console.log(`SOURCE:Controller --- DATA Reached to Controller with Value: ${req.body}`)
        if(successful_transaction){
            res.json({
                success: true,
                message: "SOURCE:Controller --- Data Post is Successful"
            });
        } else{
            res.json({
                success:false,
                message: "SOURCE:Controller --- Data Post has Failed"
            })
        }
    } catch(error){
        console.log(error);
        res.json({
            success:false,
            error:error.message
        });
    }
};

module.exports ={
    post_submission_fields,
};