//require and set up express for web server
const path = require("path");
const express = require("express");
const app = express();

const port_main = 3000;

//serve access to public files to render page
///Users/alfredochavez/Desktop/innovationminds/innovation_minds_production/innovation_minds_portfolio/root/client/public/html/main.html  <== delete after working
app.use(express.static(path.join(__dirname,"../client","public")));

//initialize the directory path for main.html
app.get('/', (req, res)=>{
    //send static file 
    res.sendFile(path.join(__dirname,"../client","public","html","main.html"));
});

//port status codes check


//listen on a specific port, which starts the server
app.listen(port_main,()=>{
    console.log('Server starting to run on http://localhost:',port_main);
});
