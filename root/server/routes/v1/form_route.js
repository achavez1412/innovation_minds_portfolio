const express = require("express");
const form_router = express.Router();

const form_controller = require("../../controllers/form_controller");
const form_middleware = require("../../middleware/form_middleware");

form_router.post("/submission",form_middleware.form_validator,form_controller.submit_form);

module.exports = form_router;