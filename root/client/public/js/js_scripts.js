// var today = new Date();
// document.getElementById("time_zone").innerHTML=today;

//import the script from ajax_langauge
//import { get_language_option } from "./ajax_language.js";

//temp relative pathing, with imbedded json data
//TODO:implement external json to fetch once web server started
const json_temp = {
    "introduction_blueprint": {
        "en-us": "Welcome to Innovating Beyond the Blueprint!",
        "es-mx": "¡Bienvenidos a Innovando Más Allá del Diseño!",
        "zh-cn": "欢迎来到超越设计图的创新"
    },
    "introduction_self": {
        "en-us": "My name is Alfredo Chavez, and I am an aspiring Electrical Engineer and Software Developer driven by a deep appreciation for resourcefulness, determination, and integrity.",
        "es-mx": "Me llamo Alfredo Chávez y soy un aspirante de la Ingeniera Eléctrica y Computación, motivado por un aprecio fuerte del ingenio, la determinación y la integridad.",
        "zh-cn": "我叫程惟恩。我是一名有抱负的电气和计算机工程师和我高度重视独创性、决心和正直。"
    },
    "network_connect" : {
        "en-us": "If you're ever interested in connecting, I welcome and encourage the opportunity to exchange ideas and insights. I value meaningful conversation and the chance to learn even more from others, so feel free to reach out!",
        "es-mx": "Si alguna vez te interesa conectar, te doy la bienvenida y favorezco la oportunidad de intercambiar ideas y perspectivas. Valoro las conversaciones significativas y la oportunidad de aprender aún más de los demás, ¡así que no dudes en contactarme!",
        "zh-cn": "如果你有兴趣交流，我非常欢迎并鼓励这个机会来分享想法和见解。我珍惜有意义的对话，也期待向他人学习更多，随时欢迎联系！"
    }
}

// var screen_velocity = .8;
// function update(){
//     var pos= window.screenTop;
//     ".body_container".each(()=>{
//         var element = this;
//         var height = element.height - 20;
//         this.css("backgroundPosition", "50% "+Math.round(height-pos)*screen_velocity+"px");
//     });
// };



//figure out if window load is necessary everywhere, how to restrict
window.onload=()=>{
    let dark_mode=localStorage.getItem('dark_mode');
    const input_theme = document.getElementById("dark_light");
    const body_main=document.querySelector(".body_main");
    const lang_json = json_temp;
    let prev_val = null;

    const enableDarkMode=()=>{
        body_main.classList.remove("light_mode");
        body_main.classList.add("dark_mode");
        localStorage.setItem("dark_mode", "active");
        //document.getElementsByClassName("body_image").style.setProperty("background_image", "url('../html/night_shadow_range.png')");
        //console.log(document.getElementsByClassName("body_image").style.background_image, "COMPLETED");
    }

    const enableLightMode=()=>{
        // document.body.querySelector(".body_main").classList.remove("dark_mode");
        // document.body.querySelector(".body_main").classList.add("light_mode");
        body_main.classList.remove("dark_mode");
        body_main.classList.add("light_mode");
        localStorage.setItem("dark_mode", null);
    }

    //implement UI behavior changes with focusing
    //if there is a change with the dark/light mode, enable the respective theme
    input_theme.addEventListener("change", (event)=>{
        // document.getElementById("body_container").classList.toggle(prev_val);
        // document.getElementById("body_container").classList.toggle(event.target.value);
        //prev_val = event.target.value;
        dark_mode = localStorage.getItem("dark_mode");
        if(dark_mode !== "active"){
            enableDarkMode();
        }
        else if(dark_mode === "active"){
            enableLightMode();
        }
    });

    //if there is a change of language selected, iterate through all text elements to selected lang
    // document.getElementById("language_selector").addEventListener("change", (event)=>{
    //     let json_key = event.target.value;
    //     document.querySelectorAll(".translatable_text").forEach(element =>{
    //         let element_id = element.id;
    //         if(element_id === null || element_id === ''){
    //             return;
    //         }
    //         element.textContent = lang_json[element_id][json_key];
    //     });
    // });

    //enable whatever mode is marked
    if(dark_mode === "active"){
        input_theme.value = "dark_mode";
        enableDarkMode();
    } else{
        input_theme.value = "light_mode";
        enableLightMode();
    }
};

//check for alternatives for $(document).ready bc deprecated and ignored by JQ3.0.0
$(document).ready(()=>{
   //disable submission process default
   $("#submission_button").prop("disabled",true);

    //checks simple class and tag format
    const valid_format=(element_name)=>{
        //todo: improve RE
        const re_elem_str = /^[\#\.]*/;
        return re_elem_str.test(String(element_name));
    }

    //takes in element_name and a message to send via error form
    const set_form_msg=(element_name,message)=>{
        if(typeof(element_name) === "string" && typeof(message)==="string"){
            if(!valid_format(element_name)){
                return;
            }
            console.log("Inner HTML ERROR should be changed")
            $(element_name).html(message);
            console.log($(element_name).html());
            return;
        }
    }

    //compress into 1 func
    const name_checker=(name)=>{
        if(name===null){
            return false;
        }
        const regex_name_str = /[\p{L}]*/;
        //const regex_name_str = /[A-Za-z]*/;
        return regex_name_str.test(String(name));
    }

    const email_checker=(email)=>{
        if(email===null){
            return false;
        }
        console.log("email being checked");
        //const regex_str=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //const regex_str=/^[A-Za-z0-9\.\-_]*[@][A-Za-z]*[\.][a-z]{2,4}$/;
        const regex_str=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        console.log(regex_str.test(email), " | ", email);
        return regex_str.test(String(email));
    }

    //checks parameters(hard-coded)
    //TODO modularize to 
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

    //resets form(**ideally given a form id, reset all fields of form) rn only reset explicit fields
    const reset_form=(id)=>{
        $(id).removeClass("was-validated");
        $(id)[0].reset();
    }

    const submission_checker=()=>{
        let first_name = $("#first_name").val().trim();
        let last_name = $("#last_name").val().trim();
        let email = $("#email_address").val().trim();
        
        let array_iter = [first_name, last_name, email];
        
        for(let iter of array_iter){
            //if none null, trim
            if(iter == null || iter == ''){
                //set error
                console.log("fio");
            }
        }
        console.log("understood");
        alert("Your submission has been recorded!");
        reset_form("#submission");
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
    
    //get this keyword to work 
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
        submission_checker();
    });
    
});

/*$(document).ready(function () {
        $('#myForm').bootstrapValidator({
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                email: {
                    validators: {
                        notEmpty: { message: 'Email is required' },
                        emailAddress: { message: 'Invalid email' }
                    }
                },
                password: {
                    validators: {
                        notEmpty: { message: 'Password is required' },
                        stringLength: { min: 6, message: 'Minimum 6 characters' }
                    }
                }
            }
        });
    }); */
//window.onloadstart=()=>{
//     //smooth scrolling animation 
    // document.querySelectorAll("nav a").forEach(nav_elem => {
    //     nav_elem.addEventListener("click", function(elem){
    //         elem.preventDefault();
    //         const links = document.querySelector(this.getAttribute('href'));
    //         console.log(links);
    //         links.scrollIntoView({behavior:'smooth'});
    //     });
    // });
//};

//consider enabling xmlhttpsrequest to dynamically translate webpage