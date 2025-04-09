const express = require("express");
const lang_router = express.Router();

//require the controllers to which the routes should point to for logic control
const lang_controller = require("../../controllers/lang_sel_controller");

// lang_router.route("/").get((req,res)=>{
//     res.send("data from lang_router is being sent");
// });

//go to controller to handle data of language selection
//query parameter
console.log("I am getting called in router land.")
lang_router.get("/language", lang_controller.get_lang_option);

module.exports = lang_router;