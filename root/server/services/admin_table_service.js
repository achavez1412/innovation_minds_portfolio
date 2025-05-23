const form = require("../models/form");

async function load_records(page_length, start){
    try{
        // const data_response = await form.find({},{_id:0,first_name:1,last_name:1,email_address:1,short_message:1});
        let data_response = await form.aggregate([
            {
                $facet:{
                    data:[
                        {$skip: start},
                        {$limit:page_length},
                        {$project:{_id:0,first_name:1,last_name:1,email_address:1,short_message:1}}
                    ],
                    total:[
                        {$count:"total"}
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

async function search_records(search_val,start,page_length){
    try{
        // console.log(`This is query params: ${query_params} \nand its search value${query_params['search[value]']}`);
        // const search_val = query_params['search[value]'];
        // const start = query_params.start;
        // const page_length= query_params.length;
        let data_response = await form.aggregate([
            {
                $facet:{
                    data:[
                        {$match:
                            {$or:[
                                {first_name:{$regex:search_val, $options:"i"}},
                                {last_name:{$regex:search_val, $options:"i"}},
                                {email_address:{$regex:search_val, $options:"i"}}
                            ]}
                        },
                        {$skip:start},
                        {$limit:page_length},
                        {$project:{_id:0,first_name:1,last_name:1,email_address:1,short_message:1}}
                    ],
                    total:[
                        {$match:
                            {$or:[
                                {first_name:{$regex:search_val, $options:"i"}},
                                {last_name:{$regex:search_val, $options:"i"}},
                                {email_address:{$regex:search_val, $options:"i"}}
                            ]}
                        },
                        {$count:"total"}
                    ]
                }
            }
        ]);
        const success = true;
        data_response = data_response[0];
        return {success,data_response};
    } catch(error){
        console.log(error);
        return {success:false, data_response:{}};
    }
}
module.exports={
    load_records,
    search_records
}
