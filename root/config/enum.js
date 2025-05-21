//general enum file until neeeded separate for functionality and granularity


//consider changing to object structure for potential consistency with other patterns
const LANGUAGES = Object.freeze([
    {"NAME": "English", "VALUE": "en-us"},
    {"NAME": "Spanish", "VALUE": "es-mx"},
    {"NAME": "Mandarin Chinese", "VALUE": "zh-cn"},
]);

const THEME_MODE = Object.freeze([
    {'NAME': 'Light Mode', 'VALUE': 'light_mode'},
    {'NAME': 'Dark Mode', 'VALUE': 'dark_mode'},
]);


//js_scipts

const ID_TAG_ENUM = Object.freeze({
    dark_light_mode_id: "#dark_light",
    language_selector_mode_id: "#language_selector",
    time_id:"#time",
    date_id:"#date",
    submission_form_id: "#submission",
    submission_button_id:"submission_button",
    project_page_id: "#project_link",
    home_page_id:"#home_link",
    contact_page_id: "#contact_link",
    contact_button_id:"#connect_button"
});

const CLASS_TAG_ENUM = Object.freeze({
    main_body_class:".body_main",
    template_layout_body_class:".body_layout_template",
    error_message_class:".error_message"
});

const THEME_NAME_TAG_ENUM = Object.freeze({
    dark_mode_id_name:"dark_mode",
    light_mode_id_name:"light_mode",
    values:["activate","null"]
});

const TIME_OPTIONS_ENUM = Object.freeze({
    hour:"2-digit",
    minute:"2-digit",
    second:"2-digit",
    timeZoneName:"short",
    hour12:false,
});

const DATE_OPTIONS_ENUM = Object.freeze({
    weekday:"short",
    month:"long",
    day:"2-digit",
    year:"numeric"
});

const SUBMISSION_FIELDS_ENUM = Object.freeze(["first_name", "last_name", "email_address", "short_message"]);

const REQUIRED_OPTIONAL_FIELDS = Object.freeze({
    first_name:["string","required"],
    last_name:["string","required"],
    email_address:["string","required"],
    short_message:["string","optional"]
});


module.exports ={
    LANGUAGES,
    THEME_MODE,
    ID_TAG_ENUM,
    CLASS_TAG_ENUM,
    THEME_NAME_TAG_ENUM,
    TIME_OPTIONS_ENUM,
    DATE_OPTIONS_ENUM,
    SUBMISSION_FIELDS_ENUM,
    REQUIRED_OPTIONAL_FIELDS
};