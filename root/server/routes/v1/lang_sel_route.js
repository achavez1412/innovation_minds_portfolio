const express = require("express");
const lang_router = express.Router();

//require the controllers to which the middleware should use next
const lang_controller = require("../../controllers/lang_sel_controller");
//require middlewares for which routes point to 
const lang_middleware = require("../../middleware/language_middleware");

//query param & middleware validator & go to controller to handle data of language selection under the GET request
lang_router.get("/language", lang_middleware.lang_validator, lang_controller.get_lang_option);

module.exports = lang_router;