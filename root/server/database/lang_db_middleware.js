const DB = require("./lang_db.json");

//retrieves all entries listed along the language option
//might have return the object or the array of all selected tags
const get_all_entries= (language_selection)=>{
    const raw_all_language_entries = DB[language_selection];
    return raw_all_language_entries;
};

module.exports={
    get_all_entries,
}