const form = require("../models/form");
//all  contacts
const read_all_contacts= async ()=>{
    try{
        var data = form.find();
        return true,data;
    } catch(error){
        console.log(error);
        return false,{};
    }
};

//id_name:string, field:array(string) data:array(string)
//map values

//field: [first,last,email,message]
//data: ["","","",""]
const update_one_contact= async (body_data)=>{
    try{
        if(field.length !== data.length|| data.length > 0 || data.length !==4){
            throw new Error("Required Parameters Missing or Incorrect");
        }
        //if all entries blank, 
        for(let i=0; i<data.length; i++){

        }
        var query = {$set:{}}
        form.updateOne();
    }catch(error){
        
    }
}

const delete_one_contact= async (field=[],data=[]) => {

}
module.exports = {
    read_all_contacts,
    update_one_contact
};