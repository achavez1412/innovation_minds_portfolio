function enableMode(src_obj_id="", enabled_name="", disabled_name="", dark_mode_id_name, activated=null){
    try{
        if(arguments.length !== 5){
            console.log("ArgumentError: Incorrect Number of Arguments");
            throw new Error("ArgumentError: Incorrect Number of Arguments");
        }
        for(let i=0; i<arguments.length; i++){
            if(i==0 && typeof(arguments[i] === "object")||(i==4 && arguments[i]=== null)){
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
        localStorage.setItem(dark_mode_id_name,activated);
    } catch(error){
        console.log(`We could not mode due to Error: ${error}`);
        return;
    }
}

$(document).ready(()=>{
    const ID_TAG_ENUM = JSON.parse($("#id_tag_enum").val());
    const CLASS_TAG_ENUM = JSON.parse($("#class_tag_enum").val());
    const THEME_NAME_TAG_ENUM = JSON.parse($("#theme_name_tag_enum").val());
    
    // localStorage.setItem(THEME_NAME_TAG_ENUM.dark_mode_id_name,"null");
    var dark_mode = localStorage.getItem(THEME_NAME_TAG_ENUM.dark_mode_id_name);
    const layout_body = $(CLASS_TAG_ENUM.template_layout_body_class);
    const input_theme = $(ID_TAG_ENUM.dark_light_mode_id);
    
    //works for set of two  0==false 1==true
    const theme_mode_activator=(flip_theme=false)=>{
        dark_mode = localStorage.getItem(THEME_NAME_TAG_ENUM.dark_mode_id_name);
        let is_light = (dark_mode === THEME_NAME_TAG_ENUM.values[1]);
        is_light = (flip_theme) ? (is_light+1)%2 : is_light;

        if(!is_light){
            input_theme.val(THEME_NAME_TAG_ENUM.dark_mode_id_name);
            enableMode(layout_body, THEME_NAME_TAG_ENUM.dark_mode_id_name, THEME_NAME_TAG_ENUM.light_mode_id_name, THEME_NAME_TAG_ENUM.dark_mode_id_name, "active");
        }
        else {
            input_theme.val(THEME_NAME_TAG_ENUM.light_mode_id_name);
            enableMode(layout_body, THEME_NAME_TAG_ENUM.light_mode_id_name, THEME_NAME_TAG_ENUM.dark_mode_id_name, THEME_NAME_TAG_ENUM.dark_mode_id_name, null);
        }
    };

    //activate whichever mode
    theme_mode_activator(false);

    $(ID_TAG_ENUM.dark_light_mode_id).on("change", ()=>{
        //flip whichever mode
        theme_mode_activator(true);
    });
});