const mongoose = require("mongoose");

const form_schema = new mongoose.Schema({
    first_name: {
        type: String,
        required:true,
        unique: false,
        minLength:1,
        maxLength:50,
        trim:true
    },
    last_name: {
        type: String,
        required:true,
        unique:false,
        minLength:1,
        maxLength:100,
        trim:true
    },
    email_address: {
        type: String,
        required:true,
        unique:true,
        minLength:5,
        maxLength:100,
        trim:true
    },
    short_message: {
        type:String,
        required: false,
        unique: false,
        minLength:0,
        maxLength:1000
    }
},{timestamps:true});

module.exports = mongoose.model("contacts_db", form_schema);