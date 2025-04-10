const express = require("express");
const lang_router = express.Router();

//require the controllers to which the middleware should use next
const lang_controller = require("../../controllers/lang_sel_controller");
//require middlewares for which routes point to 
const lang_middleware = require("../../middleware/language_middleware");

console.log("I am getting called in router land.")

//go to middleware that will handle process flow .use() treats
lang_router.use("/language",lang_middleware.lang_validator);
//query param & go to controller to handle data of language selection under the GET request
//called router handler
lang_router.get("/language", lang_controller.get_lang_option);

module.exports = lang_router;
//hello world example
// lang_router.route("/").get((req,res)=>{
//     res.send("data from lang_router is being sent");
// });