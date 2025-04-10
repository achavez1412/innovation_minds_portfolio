//get the data from the lang option
const language_connector = require("../database/lang_db.js");

const get_lang_data = (language_option)=>{
    console.log("you have made it all the way over here with language_option: ",language_option);
    const all_lang_entries = language_connector.get_all_entries(language_option);
    return all_lang_entries;
};

module.exports ={
    get_lang_data,
};