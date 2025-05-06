//takes in main parameters of ajax calls; assumes the success and error are simple console.logs
// const api_maker=(url_val,type_val="GET",data=null,dataType="")=>{};
//=== GLOBAL ===
const timeout_time = 100;
const contact_view_limit = 50;

//assumes generic success and fail solutions
//assumes that promise is used in making of ajax
function ajax_maker(resolve, reject, url="/",type="GET",data={},dataType="json",contentType=""){
    return $.ajax({
        url: url,
        type: type,
        data:data,
        dataType:dataType,
        contentType: contentType==="" ? "application/x-www-form-urlencoded; charset=UTF-8" : contentType,
        success:function(response){
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
};
//=== LANGUAGE ===
const get_all_language_option=(language_option)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            ajax_maker(resolve,reject,"api/routes/v1/language","GET",{key:language_option},"json","");
        },timeout_time); 
    });    
};

//=== FORM ===
//TODO:define api for submission ; consider async due to simulated load when posting
const post_all_submission_form=(submission_data)=>{
    return new Promise((resolve, reject)=>{
        ajax_maker(resolve,reject,"api/routes/v1/submission","POST",JSON.stringify(submission_data),"json","application/json");
    });
};

const read_all_contacts_submission_form=(contact_view_limit)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            ajax_maker(resolve,reject,"api/routes/v1/contacts","GET",{key:contact_view_limit},"json","");
        },timeout_time); 
    });    
};

const delete_contact_submission_form=(id_target)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            ajax_maker(resolve,reject,"api/routes/v1/contacts","DELETE",{key:id_target},"json","");
        },timeout_time);
    });
};
