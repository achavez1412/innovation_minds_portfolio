var today = new Date();
document.getElementById("time_zone").innerHTML=today;

// document.getElementById("dark-light").addEventListener("change", function(event){
//     let target = document.getElementById(this.value);
//     let prev = document.querySelector(".form");
//     if(prev !== null){
//         prev.display = "none";
//     }
    
//     if(target !== null){
//         target.display = "block";
//     }
    
// });

document.getElementById("dark-light").addEventListener("change", (event)=>{
    let selection = document.querySelector("dark-light");
    document.getElementById("body_container").classList.toggle(selection);
});