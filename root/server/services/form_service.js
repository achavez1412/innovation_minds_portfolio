const form = require("../models/form");

//!!!assumes body has the adqeruate fields!!!

//creates new contact
const create_one_contact= async(body)=>{
    try{
        const {first_name,last_name,email_address,short_message} = body;
        console.log("This are the fields:", first_name, last_name, email_address,short_message);
        const form_data = new form({first_name,last_name,email_address,short_message});
        await form_data.save(); //difference to the $set, upsert:true option
        return true;
    } catch(error){
        console.log(error);
        return false;
    }
};

//all  contacts
const read_all_contacts= async ()=>{
    try{
        const data_response = await form.find({},{_id:0,first_name:1,last_name:1,email_address:1,short_message:1});
        const success= true;
        console.log("Values here from service GET: ", success, data_response);
        return {success, data_response};
    } catch(error){
        console.log(error);
        return {success: false, data_response: {}};
    }
};

//update the information of a form that has been submitted; 
//strictly overwrites and does not handle collisions, as unique entries would have been made
const update_one_contact= async (id_name,body)=>{
    try{
        //checks
        const filter_query = {email_address:id_name};
        let data_to_update={};
        for(let elem in body){
            if(body[elem] != "" && id_name !== body[elem]){
                data_to_update[elem] = body[elem];
            }
        }
        console.log("Things to update",data_to_update);
        const content_value = {$set:data_to_update};
        await form.updateOne(filter_query,content_value);
        return true;
    }catch(error){
        console.log(error);
        return false;
    }
}

//currently query is determined by email given that values are unique
const delete_one_contact= async (id_name) => {
    try{
        //potential check for more robust logic
        const filter_query = {email_address:id_name};
        await form.deleteOne(filter_query);
        return true;
    } catch(error){
        console.log(error);
        return false;
    }
}
module.exports = {
    create_one_contact,
    read_all_contacts,
    update_one_contact,
    delete_one_contact
};