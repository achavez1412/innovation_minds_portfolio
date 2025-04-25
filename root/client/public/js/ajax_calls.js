//takes in main parameters of ajax calls; assumes the success and error are simple console.logs
// const api_maker=(url_val,type_val="GET",data=null,dataType="")=>{};
//=== GLOBAL ===
const timeout_time = 100;
const contact_view_limit = 50;

//=== LANGUAGE ===
const get_all_language_option=(language_option)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            $.ajax({
                url:"api/routes/v1/language",
                type:"GET",
                data:{key:language_option},
                dataType:"json",
                success: function(response){
                    console.log(response);
                    resolve(response);
                },
                error: function(xhr, status, error){
                    console.log(xhr);
                    console.log(status);
                    console.log(error);
                    reject(error);
                }
            });
        },timeout_time); 
    });    
};

//=== FORM ===
//TODO:define api for submission ; consider async due to simulated load when posting
const read_all_contacts=()=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            $.ajax({
                url:"api/routes/v1/contacts",
                type:"GET",
                data:{key:contact_view_limit},
                dataType:"json",
                success: function(response){
                    console.log(response);
                    resolve(response);
                },
                error: function(xhr, status, error){
                    console.log(xhr);
                    console.log(status);
                    console.log(error);
                    reject(error);
                }
            });
        },timeout_time); 
    });    
};

const post_all_submission_form=(submission_data)=>{
    return new Promise((resolve, reject)=>{
        $.ajax({
            url:"api/routes/v1/submission",
            type:"POST",
            data:JSON.stringify(submission_data),
            dataType:"json",
            contentType: "application/json",
            success: function(response){
                console.log(response);
                resolve(response);
            },
            error: function(xhr, status, error){
                console.log(xhr);
                console.log(status);
                console.log(error);
                reject(error);
            }
        });
    });
};
