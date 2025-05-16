$(document).ready(()=>{
    $("#contact_table").DataTable({
        processing:true,
        columns:[
            {data:"First Name"},
            {data:"Last Name"},
            {data:"Email Address"},
            {data:"Short Message"}
        ]
    });
});