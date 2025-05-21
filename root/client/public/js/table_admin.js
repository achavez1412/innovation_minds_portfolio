

$(document).ready(()=>{
    //.dataTable()=== jquery obj,  .DataTable()===API Instance
    $("#contact_table").DataTable({
        // processing:true,
        serverSide:true,
        ajax:{
            url:"api/routes/v1/load",
            type:"GET",
            dataSrc: function (json) {
                console.log(json); // Log full response for debugging
                return json?.data?.data || [];
            },
            dataType:"json"
        },
        columns:[
            {data:"first_name"},
            {data:"last_name"},
            {data:"email_address"}
        ]
    });
});