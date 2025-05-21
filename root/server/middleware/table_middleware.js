const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

// function sanitizer(req=false,body_to_sanitize,return_clean=false){
//     //check for proper body?
//     const clean_body = DOMPurify.sanitize(body_to_sanitize);
//     if(req instanceof Request){
//         req.query = (req) ? clean_body : req.query;
//     }
//     return (return_clean) ? clean_body : true;
// }

const load_validator =(req,res,next)=>{
    try{
        // console.log(req.query);
        // if(!req.query){
        //     res.status(400).json({error:"Object Error: Request Query Required"});
        // }
        // const clean_body = sanitizer(req,req.query,true);
        // //more checks qwith cleanbody
        //sanitize the fact that even though start is a string, it can be made into int
        req.query.start = parseInt(req.query.start);
        req.query.length = parseInt(req.query.length);
        // console.log(req);
        next();
    } catch(e){
        console.log(`Error: ${e.message}`);
    }
};

module.exports={
    load_validator
};