const express = require("express");
const submit_router = express.Router();

//require the controllers to which the middleware should use next
const submit_controller = require("../../controllers/submission_controller");
//require middlewares for which routes point to 
const submit_middleware = require("../../middleware/submission_middleware");

//request? query or? will validate fields that have been sent before sending to controller to perform logic 
submit_router.post("/submission", submit_middleware.submission_validator, submit_controller.post_submission_fields);

module.exports = submit_router;