//require the service that will actually handle the access and manipulation
const lang_service = require("../services/lang_service");

const get_lang_option = (req,res)=>{
    // res.send("will send the language option soon");
    const json_lang_data = lang_service.get_lang_data(req.query.key);
    for(let id_tag in json_lang_data){
        console.log("This is ", id_tag, " with info: ", json_lang_data[id_tag]);
    }
    console.log("this is the language chosen: ",req.query.key);
    console.log("all entries:",json_lang_data);
    res.send({status:"OK", data: json_lang_data});
};

module.exports ={
    get_lang_option,
};