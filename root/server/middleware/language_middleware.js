const lang_validator=(req,res,next)=>{
    try{
        //TODO:check for empty query
        if(!req.query.key){
            return res.status(400).json({message: "Key Required"});
        } else if(typeof req.query.key !== "string"){
            return res.status(400).json({message: "Cannot Process"});
        }
        next();
    } catch(error){
        console.log(error);
    }
};

//TODO: validator for submission,, fields exist minimum
module.exports={
    lang_validator,
}