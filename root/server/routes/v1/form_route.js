const express = require("express");
const form_router = express.Router();

const form_controller = require("../../controllers/form_controller");
const form_middleware = require("../../middleware/form_middleware");


//CRUD OPERATIONS {CREATE, READ, UPDATE, DELETE}

form_router.post("/submission",form_middleware.form_validator,form_controller.submit_form); //CREATE
form_router.get("/contacts/",form_middleware.read_all_contacts_validator,form_controller.read_all_contacts); //READ
form_router.put("/contacts/:id", form_middleware.update_one_contact_validator,form_controller.update_one_contact); //UPDATE
form_router.delete("/contacts/:id",form_middleware.delete_one_contact_validator,form_controller.delete_one_contact); //DELETE

module.exports = form_router;