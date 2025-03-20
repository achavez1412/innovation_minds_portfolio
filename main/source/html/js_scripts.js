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
    const input_theme = document.getElementById("dark-light");
    const body_container=document.body.querySelector(".body_container");

    const enableDarkMode=()=>{
        body_container.classList.remove("light_mode");
        body_container.classList.add("dark_mode");
        localStorage.setItem("dark_mode", "active");
        document.getElementsByClassName("body_image").style.setProperty("background_image", "url('../html/night_shadow_range.png')");
        console.log(document.getElementsByClassName("body_image").style.background_image, "COMPLETED");
    }

    const enableLightMode=()=>{
        document.body.querySelector(".body_container").classList.remove("dark_mode");
        document.body.querySelector(".body_container").classList.add("light_mode");
        localStorage.setItem("dark_mode", null);
    }

    if(dark_mode === "active"){
        input_theme.value = "dark_mode";
        enableDarkMode();
    } else{
        input_theme.value = "light_mode";
        enableLightMode();
    }

    const lang_json = json_temp;
    let prev_val = null;

    //listen to see if the button for dark/light mode was focused on before committing to a change
    // input_theme.addEventListener("focus", (event)=>{
    //     prev_val = event.target.value;
    // })

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
    //window.addEventListener("scroll",update);

};

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