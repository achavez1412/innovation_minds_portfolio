// var today = new Date();
// document.getElementById("time_zone").innerHTML=today;

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
        "zh-cn": ""
    }
}

//figure out if window load is necessary everywhere, how to restrict
window.onload=()=>{
    const input_theme = document.getElementById("dark-light");
    const lang_json = json_temp;
    let prev_val = null;
    input_theme.addEventListener("focus", (event)=>{
        prev_val = event.target.value;
    })

    input_theme.addEventListener("change", (event)=>{
        document.getElementById("body_container").classList.toggle(prev_val);
        document.getElementById("body_container").classList.toggle(event.target.value);
        prev_val = event.target.value;
    });

    document.getElementById("language-selector").addEventListener("change", (event)=>{
        let json_key = event.target.value;
        document.querySelectorAll(".translatable_text").forEach(element =>{
            let element_id = element.id;
            if(element_id === null || element_id === ''){
                return;
            }
            element.textContent = lang_json[element_id][json_key];
        });
    });

};

//consider enabling xmlhttpsrequest to dynamically translate webpage
