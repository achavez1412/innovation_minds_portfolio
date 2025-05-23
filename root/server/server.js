//global variables and other .env that should be placed onto .env file
const port_main = 3000;
const path = require("path");
const express = require("express");
const connect_DB = require("./connectDB.js");
const app = express();
//TODO: import enum file
const enum_dropdown = require("../config/enum.js");

connect_DB();

app.use(express.urlencoded({extended:true})); //ensuring requests coming into datatables are qs(querystring) objects
app.use(express.json()); //ensuring json parsing middleware is enabled 

//==== MEASURES ====
//consider any usage cases throughout pipeline that might void security headers
//sets header for all responses coming from the browser
app.use((req,res,next)=>{
    //browser blocked from MIME sniffing:: (XSS)
    res.setHeader('X-Content-Type-Options','nosniff');
    //CSP
    
    next();
});


//==== REGISTERING ====
//require routers and controllers
const v1_lang_router = require("../server/routes/v1/lang_sel_route");
// const v1_submission_form_router = require("../server/routes/v1/submission_form_route");
const v1_mongoose_form_router = require("../server/routes/v1/form_route");

const v1_admin_table_router = require("./routes/v1/admin_table_route.js");


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
// app.use("/api/routes/v1/",v1_submission_form_router);
app.use("/api/routes/v1/", v1_mongoose_form_router);
app.use("/api/routes/v1/", v1_admin_table_router);



//initialize route towards app main default '/'
//render jade views
app.get('/',(req,res)=>{
    //check render parameters to import files into as obj key:val locals->objlocal var
    res.render("main",{
        LANGUAGES:enum_dropdown.LANGUAGES, 
        THEME_MODE:enum_dropdown.THEME_MODE, 
        ID_TAG_ENUM:enum_dropdown.ID_TAG_ENUM,
        CLASS_TAG_ENUM:enum_dropdown.CLASS_TAG_ENUM,
        THEME_NAME_TAG_ENUM:enum_dropdown.THEME_NAME_TAG_ENUM,
        DATE_OPTIONS_ENUM:enum_dropdown.DATE_OPTIONS_ENUM,
        TIME_OPTIONS_ENUM:enum_dropdown.TIME_OPTIONS_ENUM,
        SUBMISSION_FIELDS_ENUM:enum_dropdown.SUBMISSION_FIELDS_ENUM
    });
});

// app.get('/',(req,res)=>{
//     //check render parameters to import files into as obj key:val locals->objlocal var
//     res.render("admin_page",{
//         LANGUAGES:enum_dropdown.LANGUAGES, 
//         THEME_MODE:enum_dropdown.THEME_MODE, 
//         ID_TAG_ENUM:enum_dropdown.ID_TAG_ENUM,
//         CLASS_TAG_ENUM:enum_dropdown.CLASS_TAG_ENUM,
//         THEME_NAME_TAG_ENUM:enum_dropdown.THEME_NAME_TAG_ENUM,
//         DATE_OPTIONS_ENUM:enum_dropdown.DATE_OPTIONS_ENUM,
//         TIME_OPTIONS_ENUM:enum_dropdown.TIME_OPTIONS_ENUM,
//         SUBMISSION_FIELDS_ENUM:enum_dropdown.SUBMISSION_FIELDS_ENUM
//     });
// });

app.get('/admin_login',(req,res)=>{
    res.render("admin_login",{
        LANGUAGES:enum_dropdown.LANGUAGES, 
        THEME_MODE:enum_dropdown.THEME_MODE, 
        ID_TAG_ENUM:enum_dropdown.ID_TAG_ENUM,
        CLASS_TAG_ENUM:enum_dropdown.CLASS_TAG_ENUM,
        THEME_NAME_TAG_ENUM:enum_dropdown.THEME_NAME_TAG_ENUM,
        DATE_OPTIONS_ENUM:enum_dropdown.DATE_OPTIONS_ENUM,
        TIME_OPTIONS_ENUM:enum_dropdown.TIME_OPTIONS_ENUM,
        SUBMISSION_FIELDS_ENUM:enum_dropdown.SUBMISSION_FIELDS_ENUM,
    });
});

app.get('/admin',(req,res)=>{
    res.render("admin_page",{
        LANGUAGES:enum_dropdown.LANGUAGES, 
        THEME_MODE:enum_dropdown.THEME_MODE, 
        ID_TAG_ENUM:enum_dropdown.ID_TAG_ENUM,
        CLASS_TAG_ENUM:enum_dropdown.CLASS_TAG_ENUM,
        THEME_NAME_TAG_ENUM:enum_dropdown.THEME_NAME_TAG_ENUM,
        DATE_OPTIONS_ENUM:enum_dropdown.DATE_OPTIONS_ENUM,
        TIME_OPTIONS_ENUM:enum_dropdown.TIME_OPTIONS_ENUM,
        SUBMISSION_FIELDS_ENUM:enum_dropdown.SUBMISSION_FIELDS_ENUM,
        AJAX_CONSTRUCTION_FIELDS:enum_dropdown.AJAX_CONSTRUCTION_FIELDS
    });
});

//port status codes check


//listen on a specific port, which starts the server
app.listen(port_main,()=>{
    console.log("Server starting to run on http://localhost:",port_main);
});
