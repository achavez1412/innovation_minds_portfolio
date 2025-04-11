const lang_validator=(req,res,next)=>{
    //TODO:TRY/CATCH
    if(!req.query.key){
        return res.status(400).json({message: "Key Required"});
    } else if(typeof req.query.key !== "string"){
        return res.status(400).json({message: "Cannot Process"});
    }
    next();
};

module.exports={
    lang_validator,
}