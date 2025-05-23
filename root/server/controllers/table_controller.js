const admin_table_service = require("../services/admin_table_service");

const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

function construct_res_obj (res,success_bool,input_data,status_code_success,status_code_fail,message_success,message_fail){
    if(!success_bool){
        res.status(status_code_fail).json({
            success:false,
            data:{},
            message:message_fail
        });
    }
    else{
        const {data, total, filtered_total, draw} = input_data;
        res.status(status_code_success).json({
            success:true,
            "recordsFiltered": total,
            data:{data},
            message:message_success
        });
    }
}

function construct_error_obj(res, error, error_status_code, error_message, broadcast=true){
    console.log(broadcast ? error_message : "");
    res.status(error_status_code).json({
        success:false,
        error:error.message
    });
}

const load_records = async (req, res) =>{
    try{
        //might change with larger datasets to avoid loading all at once
        const page_len = parseInt(req.query.length);
        const page_start = parseInt(req.query.start);

        console.log(`We are starting at page: ${page_start}`);
        console.log(`With page len of: ${page_len}`);
        const {success,data_response} = await admin_table_service.load_records(page_len,page_start);
        // console.log(res.);
        for(let key in data_response){ //one layer depackage
            if(key !== "data"){
                let nested_obj = data_response[key];
                nested_obj = nested_obj[0];
                if(typeof(nested_obj) === "object" && nested_obj !== null){
                    for(let obj_key in nested_obj){
                        data_response[key] = nested_obj[obj_key];
                    }
                }
            }
        }
        console.log(data_response);
        construct_res_obj(res,success,data_response,200,500,"Successfully Retreived Record","Failed to Retreive Records");
    } catch(error){
        construct_error_obj(res,error,500,String(error.message),true);
    }
};

const search_records= async(req,res)=>{
    try{
        // req.query['search[value]'] = DOMPurify.sanitize(req.query['search[value]'] || "");
        // req.query.start = parseInt(req.query?.start) || 0;
        // req.query.length = parseInt(req.query?.length) || 0;
        const search_val = DOMPurify.sanitize(req.query['search[value]'] || "");
        const start = parseInt(req.query?.start) || 0;
        const page_length = parseInt(req.query?.length) || 0;
        const {success,data_response} = await admin_table_service.search_records(search_val,start,page_length);
        console.log(data_response);
        for(let key in data_response){ //one layer depackage
                if(key !== "data"){
                    let nested_obj = data_response[key];
                    nested_obj = nested_obj[0];
                    if(typeof(nested_obj) === "object" && nested_obj !== null){
                        for(let obj_key in nested_obj){
                            data_response[key] = nested_obj[obj_key];
                        }
                    }
                }
        }
        console.log(data_response);
        construct_res_obj(res,success,data_response,200,500,"Successfully Searched Record","Failed to Find Search Records Results");
    } catch(error){
        construct_error_obj(res,error,500,String(error.message),true);   
    }
};

module.exports = {
    load_records,
    search_records
}