const regex_name_str = /[\p{L}]*/;
const regex_email_str=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const main_body_class = ".body_main";
const error_message_class=".error_message";
const dark_light_mode_id = "#dark_light";
const submission_form_id = "#submission";
const submission_button_id = "#submission_button";
const dark_mode_id_name = "dark_mode";
const light_mode_id_name = "light_mode";

//TODO: provide comment for function description

//array of submission ids that are used to check validity
const submission_validator_array = ["#first_name", "#last_name", "#email_address"];

const time_options = {
    hour:"2-digit",
    minute:"2-digit",
    second:"2-digit",
    timeZoneName:"short",
    hour12:false,
}

const date_options = {
    weekday:"short",
    month:"long",
    day:"2-digit",
    year:"numeric"
}
const month_names = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const days_week_names = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];

function enableMode(src_obj_id="", enabled_name="", disabled_name="", activate=null){
    try{
        if(arguments.length !== 4){
            console.log("ArgumentError: Incorrect Number of Arguments");
            throw new Error("ArgumentError: Incorrect Number of Arguments");
        }
        for(let i=0; i<arguments.length; i++){
            if(i==0 && typeof(arguments[i] === "object")||(i==3 && arguments[i]=== null)){
                continue;
            }
            else{
                if(typeof(arguments[i])!== "string" || arguments[i] === ""){
                    console.log(`ArgumentError: Invalid Argument ${arguments[i]}`);
                    throw new Error("ArgumentError: Invalid Argument");
                }
            }
        }

        $(src_obj_id).removeClass(disabled_name);
        $(src_obj_id).addClass(enabled_name);
        localStorage.setItem(dark_mode_id_name,activate);
    } catch(error){
        console.log(`We could not mode due to Error: ${error}`);
        return;
    }
}

function is_date_object(input_obj){
    return input_obj instanceof Date;
}

function set_time(date_time_obj){
    //hopefully can work with both hour formats
    if(is_date_object(date_time_obj)){
        $("#time").html(date_time_obj.toLocaleTimeString($("#language_selector").val(),time_options));
    }
    return;
}

function set_date(date_time_obj){
    if(is_date_object(date_time_obj)){
        // $("#date").html(days_week_names[date_time_obj.getDay()] + " " + month_names[date_time_obj.getMonth()] + " " + date_time_obj.getDate() + ", " + date_time_obj.getFullYear());
        $("#date").html(date_time_obj.toLocaleDateString($("#language_selector").val(),date_options));
    }
}

function create_date_time(){
    var date_time_obj = new Date();
    // set_time(date_time_obj);
    set_date(date_time_obj);
    set_time(date_time_obj);
}
//returns bool for whether input is valid
function name_email_checker(input_test,type=''){
    if(input_test === null || typeof(input_test) !== "string" || type===''){
        return false;
    }
    let temp_regex_type;
    if(type==="name"){
        temp_regex_type=regex_name_str;
    } else if(type==="email"){
        temp_regex_type=regex_email_str;
    }else{
        return false;
    }
    console.log(`Returning Check of Type: ${type} and ${input_test} with Value: ${temp_regex_type.test(input_test)}`);
    return temp_regex_type.test(String(input_test));
}

//checks simple class and tag format
function valid_format(element_name){
    //todo: improve RE
    const re_elem_str = /^[\#\.]*/;
    return re_elem_str.test(String(element_name));
}

function name_checker(name){
    return name_email_checker(name,"name");
}

function email_checker(email){
    return name_email_checker(email,"email");
}

//takes in element_name and a message to send via error form
function set_form_msg(element_name,message){
    try{
        //TODO:try thinking about wrapping into function to encapsulate logic check
        if(arguments.length !== 2){
            console.log("ArgumentError: Incorrect Number of Arguments");
            throw new Error("ArgumentError: Incorrect Number of Arguments");
        }
        for(let i=0; i<arguments.length; i++){
            if(typeof(arguments[i])!== "string" || arguments[i] === ""){
                if(!valid_format(arguments[i])){
                    console.log(`ArgumentError: Invalid Argument ${arguments[i]}`);
                    throw new Error("ArgumentError: Invalid Argument");
                }
            }
        }

        $(element_name).html(message);
        console.log($(element_name).html());
        return;
    } catch(error){
        console.log(`We could not mode due to Error: ${error}`);
        return;
    }
}

//resets form(**ideally given a form id, reset all fields of form) rn only reset explicit fields
//assumes id is proper and contains validation present
function reset_submission_form(id){
    $(id).removeClass("was-validated");
    $(id)[0].reset();
    $(submission_button_id).prop("disabled",true);
    $(error_message_class).each(function(){
        $("#"+String(this.id)).html("");
    });
}

function submission_checker(submission_tag){
    console.log("understood", submission_tag);
    alert("Your submission has been recorded!");
    reset_submission_form(submission_tag);
}
//look into load rather than ready
//check for alternatives for $(document).ready bc deprecated and ignored by JQ3.0.0
$(document).ready(()=>{
    var dark_mode = localStorage.getItem(dark_mode_id_name);
    const input_theme = $(dark_light_mode_id);
    const body_main = $(main_body_class);
    
    //disable submission process button default
    $("#submission_button").prop("disabled",true);
    if(dark_mode === "active"){
        input_theme.val(dark_mode_id_name);
        enableMode(body_main,dark_mode_id_name,light_mode_id_name,"active");
    } else{
        input_theme.val(light_mode_id_name);
        enableMode(body_main,light_mode_id_name,dark_mode_id_name,null);
    }

    setInterval(function(){
        create_date_time();
    },1000);

    //checks parameters(hard-coded) //TODO modularize to 
    const valid_elem_all=()=>{
        let first_name = $("#first_name")[0].checkValidity();
        let last_name = $("#last_name")[0].checkValidity();
        let email = $("#email_address")[0].checkValidity();
        console.log("bool val (first, last, email) | (", first_name, " , ", last_name, " , ",email, ")");
        if(first_name && last_name && email){
            $("#submission_button").prop("disabled",false);
            console.log("called and Checked");
        }else{
            $("#submission_button").prop("disabled",true);
            console.log("only callled");
        }
    }

    const elem_validator=(elem,error_tag,msg_tag,msg_fail,msg_success,is_email="false")=>{
        //do sanity checks about format of elem

        //implement better format
        $("#submission").addClass("was-validated");
        let target_element = $(elem).val();
        let format_bool;

        if(target_element === '' || target_element === null){
            format_bool = false;
        }
        else if(is_email){
            format_bool = email_checker(target_element);
        }else{
            format_bool = name_checker(target_element);
        }

        if(!format_bool){
            $(elem)[0].setCustomValidity("Invalid");
            $(elem).addClass("form-control");
            $(error_tag).addClass("invalid-feedback");
            set_form_msg(msg_tag,msg_fail);
        }
        else{
            $(elem)[0].setCustomValidity("");
            $(error_tag).addClass("valid-feedback");
            $(elem).addClass("was-validated");
            set_form_msg(msg_tag,msg_success);
        }
        valid_elem_all();
    }

    //====event trigger====
    $("#dark_light").on("change", ()=>{
        dark_mode = localStorage.getItem("dark_mode");
        if(dark_mode !== "active"){
            enableMode(body_main,dark_mode_id_name,light_mode_id_name,"active");
        }
        else if(dark_mode === "active"){
            enableMode(body_main,light_mode_id_name,dark_mode_id_name,null);
        }
    });

    $("#language_selector").on("change", async ()=>{
        //error handling for key checking
        try{
            var language_selection = $("#language_selector").val();
            //hard-coded supported language options,with intention of making it stored on backend
            let supported_languages=["en-us","es-mx","zh-cn"];
            if(language_selection === "" || language_selection === null || !supported_languages.includes(language_selection)){
                throw new Error("ValueError: Current Selection Is Not Supported");
            }
        } catch(error){
            console.log(`We could not process the language change due to Error: ${error}`);
            return;
        }

        
        //erro handling from ajx call
        //future: if 1 timeout, try again then handle exception
        var language_object = {};  
        let successful_transaction = false;
        // let cycle_limit = 4;
        // for(let cycles = 0; (cycles < cycle_limit && !successful_transaction); cycles++){
        try{
            language_object = await get_all_language_option(language_selection);
            if(language_object.status != response.ok){
                throw new Error("Response Error");
            }
            successful_transaction = true;
            //break;
        } catch(error){
            console.log("Response Error: Unexpected Transaction, Trying Again: ",error);
            //alert user for failure
            successful_transaction=false;
            
        }
        //}

        console.log("This is the whole object: ", language_object.data);
        
        $(".translatable_text").each(function(){
            let element_id = this.id;
            if(element_id === null || element_id === ''){
                return;
            }else{
                console.log(`my key element_id is: ${element_id}`);
                console.log("my key text is: ", language_object.data[element_id]);
                // $('#' + String(element_id)).html(language_object.data[element_id]);
                $(`#${String(element_id)}`).html(language_object.data[element_id]);
                // element_id.textContent = String(language_object.data[element_id]);
            }
        });
    });

    $("#first_name").on("focus input",()=>{
        elem_validator("#first_name","#first_name_error", "#first_name_error", "Invalid Input", "Valid Input",false);
    });
     
    $("#last_name").on("focus input",()=>{
        elem_validator("#last_name", "#last_name_error","#last_name_error", "Invalid Input", "Valid Input", false);
    });

    $("#email_address").on("focus input",()=>{
        elem_validator("#email_address", "#email_error","#email_error", "Please Submit a Valid Email Address", "Valid Email Address", true);
    });

    //event listener if button is submitted (event has to be listened through the form, not elements itself)
    $("#submission").on("submit",(event)=>{
        event.preventDefault();
        if(!valid_elem_all()){
            event.stopPropagation();
        }
        submission_checker(submission_form_id);
    });
    
});

//consider enabling xmlhttpsrequest to dynamically translate webpage

// var screen_velocity = .8;
// function update(){
//     var pos= window.screenTop;
//     ".body_container".each(()=>{
//         var element = this;
//         var height = element.height - 20;
//         this.css("backgroundPosition", "50% "+Math.round(height-pos)*screen_velocity+"px");
//     });
// };