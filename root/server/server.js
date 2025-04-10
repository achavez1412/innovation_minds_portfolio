//global variables and other .env that should be placed onto .env file
const port_main = 3000;
//require and set up express for web server
const path = require("path");
const express = require("express");
const app = express();

//require routers and controllers
const v1_lang_router = require("../server/routes/v1/lang_sel_route");

//serve access to view templates using jade template engine
app.set("view engine","jade");
//set the file path for the jade templates source; ie under direct access to roots
///Users/alfredochavez/Desktop/innovationminds/innovation_minds_production/innovation_minds_portfolio/root/server/server.js
app.set("views",path.join(__dirname,"views"));
// app.use(express.static(path.join(__dirname, './public')));

//serve access to public files to render page
///Users/alfredochavez/Desktop/innovationminds/innovation_minds_production/innovation_minds_portfolio/root/client/public/html/main.html  <== delete after working
app.use(express.static(path.join(__dirname,"../client","public")));

//mount routers to main app
app.use("/api/routes/v1/", v1_lang_router);

//potentially middleware, separate at some point
///Users/alfredochavez/Desktop/innovationminds/innovation_minds_production/innovation_minds_portfolio/root/client/node_modules
app.use('/jquery', express.static(path.join(__dirname,"../client","node_modules","jquery","dist")));

//initialize the directory path for main.html
// app.get('/', (req, res)=>{
//     //send static file 
//     res.sendFile(path.join(__dirname,"../client","public","html","main.html"));
// });

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
