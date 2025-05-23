const express = require("express");
const table_router = express.Router();

const table_controller = require("../../controllers/table_controller");
const table_middleware = require("../../middleware/table_middleware");

//table
//load- loads in x number of records to display on the table
//get - gets records that match the query search
//delete - delete the chosen record
//update - update the chosen record

// table_router.get("/load",table_middleware.load_validator, table_controller.load_records);
table_router.get("/load:search",table_middleware.search_validator, table_controller.search_records);

module.exports=table_router;