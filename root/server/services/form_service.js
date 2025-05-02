const form = require("../models/form");

//!!!assumes body has the adqeruate fields!!!

//creates new contact
const create_one_contact= async(body)=>{
    try{
        const {first_name,last_name,email_address,short_message} = body;
        console.log("This are the fields:", first_name, last_name, email_address,short_message);
        const form_data = new form({first_name,last_name,email_address,short_message});
        await form_data.save(); //difference to the $set, upsert:true option
        return true, {};
    } catch(error){
        console.log(error.message);
        return false, {};
    }
};

//all  contacts
const read_all_contacts= async ()=>{
    try{
        let data = form.find();
        return true,data;
    } catch(error){
        console.log(error);
        return false,{};
    }
};

//update the information of a form that has been submitted; 
//strictly overwrites and does not handle collisions, as unique entries would have been made
const update_one_contact= async (body)=>{
    try{
        //checks
        
        //query depending which field needs to be changed

        //user name: W last:Q email 1234
        //W Q 123
        //W Q 1234
        //al email 1234
        const filter_query = {$or:[
            {email_address:body.email_address},
            {$and:[
                {first_name:body.first_name},
                {last_name:body.last_name}
            ]}
        ]};
        let data_to_update={};
        for(let elem in body){
            if(body[elem] != ""){
                data_to_update.elem = body[elem];
            }
        }
        const content_value = {$set:data_to_update};
        form.updateOne(filter_query,content_value);
        return true,{};
    }catch(error){
        console.log(error);
        return false,{};
    }
}

//currently query is determined by email given that values are unique
const delete_one_contact= async (body) => {
    try{
        const filter_query = {email_address:body.email_address};
        form.deleteOne(filter_query);
        return true,{};
    } catch(error){
        console.log(error);
        return false, {};
    }
}
module.exports = {
    create_one_contact,
    read_all_contacts,
    update_one_contact,
    delete_one_contact
};