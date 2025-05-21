const admin_table_service = require("../services/admin_table_service");

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
            "draw": draw,
            "recordsTotal": total,
            "recordsFiltered": filtered_total,
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
        const page_len = req.query.length;
        const page_start = req.query.start;

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
        
        const single_data = data_response.data;
        const sliced_data = single_data.slice(page_start, page_start+page_len);
        console.log(`This is the sliced data: ${sliced_data}`);
        data_response.data = sliced_data;
        data_response.draw = parseInt(req.query.draw);
        console.log(data_response);
        construct_res_obj(res,success,data_response,200,500,"Successfully Retreived Record","Failed to Retreive Records");
    } catch(error){
        construct_error_obj(res,error,500,String(error.message),true);
    }
};

module.exports = {
    load_records
}