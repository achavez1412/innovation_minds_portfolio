const get_all_language_option=(language_option)=>{
    let timeout_time = 100;
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