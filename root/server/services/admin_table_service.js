const form = require("../models/form");

async function load_records(page_length, start){
    try{
        // const data_response = await form.find({},{_id:0,first_name:1,last_name:1,email_address:1,short_message:1});
        let data_response = await form.aggregate([
            {
                $facet:{
                    data:[
                        {$skip: parseInt(start)},
                        // {$limit:parseInt(page_length)},
                        {$project:{_id:0,first_name:1,last_name:1,email_address:1,short_message:1}}
                    ],
                    total:[
                        {$count:"total"}
                    ],
                    filtered_total:[
                        // {$skip: parseInt(start)},
                        // {$limit:parseInt(page_length)},
                        // {$project:{_id:0,first_name:1,last_name:1,email_address:1,short_message:1}},
                        {$count:"filtered_total"}
                    ]
                }
            }
        ]);
        const success = true;
        data_response = data_response[0];
        //console.log(data_response);
        // console.log("Values here from service GET: ", data_response);
        return {success,data_response};
    } catch(error){
        console.log(error);
        return {success: false, data_response: {}};
    }
}

module.exports={
    load_records
}
