function ajax_constructor(AJAX_CONSTRUCTION_FIELDS,index=0){
    
    return {
                url:AJAX_CONSTRUCTION_FIELDS[index].url,
                type:AJAX_CONSTRUCTION_FIELDS[index].type,
                dataSrc: function (json) {
                    console.log(json); // Log full response for debugging
                    return json?.data?.data || [];
                },
                dataType:AJAX_CONSTRUCTION_FIELDS[index].dataType
            }
}

$(document).ready(()=>{
    //.dataTable()=== jquery obj,  .DataTable()===API Instance
    const AJAX_CONSTRUCTION_FIELDS = JSON.parse($("#ajax_options_enum").val());
    console.log("fired intializer");
    const dataTable =
        $("#contact_table").DataTable({
            pageLength:5,
            layout:{                    //supported 2.x.x datatables
                topStart:{
                    pageLength:{
                        menu:[5,10,25]
                    }
                }
            },
            language:{
                entries:{
                    _:"Contacts",
                    1:"Contact"
                },
                search:"Search: _INPUT_",
                searchPlaceholder:"Search",
                info: "Showing _START_ to _END_ of _TOTAL_ Total _ENTRIES_",
                infoFiltered:'',
                infoEmpty: "No _ENTRIES_ Found"
            },
            // processing:true,
            serverSide:true,
            paging:true,
            ajax:{
                url:AJAX_CONSTRUCTION_FIELDS[1].url,
                type:AJAX_CONSTRUCTION_FIELDS[1].type,
                dataSrc: function (json) {
                    console.log(json); // Log full response for debugging
                    return json?.data?.data || [];
                },
                dataType:AJAX_CONSTRUCTION_FIELDS[1].dataType
            },
            columns:[
                {data:"first_name"},
                {data:"last_name"},
                {data:"email_address"}
            ]
        });

    dataTable.on("init", function(){
        console.log("DT been init");
        $("#contact_table_filter input").on("input.dt", function(){
            console.log("input has been triggered");
            alert("fsf");
        });
    });

    //accordion
    $("#contact_table tbody").on("click", "tr", function(){
        const target_row = dataTable.row(this);

        if(target_row.child.isShown()){
            //shown, want to close
            row.child.hide();
            $(this).removeClass("shown");
            alert(target_row.child);
        }else{
            //close prev
            //not shown, want to show
            const prev_opened_row = dataTable.row($("tr.shown")[0]);
            const html_content = ``;

            prev_opened_row.child.hide();
            $("tr.shown").removeClass("shown");

            target_row.child(html_content).show();
            $(this).addClass("shown");
        }
    });
});