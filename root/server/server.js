//global variables and other .env that should be placed onto .env file
const port_main = 3000;
const path = require("path");
const express = require("express");
const app = express();

//ensuring json parsing middleware is enabled
app.use(express.json());

//==== REGISTERING ====
//require routers and controllers
const v1_lang_router = require("../server/routes/v1/lang_sel_route");
const v1_submission_form_router = require("../server/routes/v1/submission_form_route");

//serve access to view templates using jade template engine
app.set("view engine","jade");

//set the file path for the jade templates source; ie under direct access to roots
app.set("views",path.join(__dirname,"views"));

//serve access to public files to render page <-- if using html, else access to public directory
app.use(express.static(path.join(__dirname,"../client","public")));

//potentially middleware, separate at some point
app.use('/jquery', express.static(path.join(__dirname,"../client","node_modules","jquery","dist")));

//==== MOUNTING ====
//mount routers to main app
app.use("/api/routes/v1/", v1_lang_router);
app.use("/api/routes/v1/",v1_submission_form_router);


//initialize route towards app main default '/'
//render jade views
app.get('/',(req,res)=>{
    res.render("main");
});

//port status codes check


//listen on a specific port, which starts the server
app.listen(port_main,()=>{
    console.log("Server starting to run on http://localhost:",port_main);
});
